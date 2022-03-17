import {
  Arg,
  Ctx,
  Field,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { Group } from "../entities/groups/Group";
import argon2 from "argon2";
import { Member } from "../entities/groups/Member";
import { isAuth } from "../middleware/isAuth";
import { DbContext } from "../types/types";
import { createQueryBuilder, getManager, getRepository } from "typeorm";
import { getConnection } from "typeorm";
import { User } from "../entities/profile/User";
import { validate } from "class-validator";
import { FieldError } from "../utils/fieldError";

@ObjectType()
class GroupResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Group, { nullable: true })
  group?: Group;
}

@Resolver(Group)
export class GroupResolver {
  @Mutation(() => GroupResponse)
  @UseMiddleware(isAuth)
  async createGroup(
    @Arg("name", () => String) name: string,
    @Arg("description", () => String) description: string,
    @Arg("url", () => String) url: string,
    @Arg("imageUrl", { nullable: true }) imageUrl: string,
    @Arg("password", { nullable: true }) password: string,
    @Ctx() { req }: DbContext
  ): Promise<GroupResponse> {
    let userId = req.session.userId;

    let group = await Group.create({
      name: name,
      creatorId: userId,
      description,
      url: url,
      groupImageUrl: imageUrl,
      password: password ? await argon2.hash(password) : undefined,
    });
    const errors = await validate(group);

    if (errors.length > 0) {
      let message = "";
      if (errors[0]?.constraints) {
        message = Object.values(errors[0]?.constraints)[0];
        message = message[0].toUpperCase() + message.slice(1);
      }
      console.log(errors);
      return {
        errors: [
          {
            field: errors[0].property,
            message: [message],
          },
        ],
      };
    } else {
      try {
        await getManager().save(group);
      } catch (err) {
        var errorType = /\(([^()]*)\)/g.exec(err.detail)?.pop();
        if (errorType === undefined) {
          errorType = "";
        }
        errorType = errorType.replace(/_([a-z])/g, function (_, w) {
          return w.toUpperCase();
        });

        var messageString = errorType
          .replace(/_/g, " ")
          .replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());

        if (err.code === "23505") {
          // duplicate id error
          console.log(errors);
          return {
            errors: [
              {
                field: errorType,
                message: [`${messageString} already taken`],
              },
            ],
          };
        }
      }
    }

    await getConnection()
      .createQueryBuilder()
      .relation(User, "groups")
      .of(userId)
      .add(group);

    await Member.create({
      groupId: group.id,
      userId: userId,
      admin: true,
    }).save();

    return { group };
  }

  @Query(() => GroupResponse)
  async validateGroupPassword(
    @Arg("groupId", () => Int) id: number,
    @Arg("password") password: string
  ): Promise<GroupResponse> {
    const group = await Group.findOne(id);
    if (!group) {
      return {
        errors: [
          {
            field: "password",
            message: ["That group does not exist!"],
          },
        ],
      };
    }

    const validPassword = await argon2.verify(group.password, password);
    if (!validPassword) {
      return {
        errors: [
          {
            field: "password",
            message: ["Incorrect password"],
          },
        ],
      };
    }

    return { group };
  }

  @Query(() => Boolean)
  async groupHasPassword(
    @Arg("groupId", () => Int) groupId: number
  ): Promise<Boolean> {
    let group = await Group.findOne({ id: groupId });

    if (group?.password) {
      return true;
    }

    return false;
  }

  @Mutation(() => GroupResponse)
  @UseMiddleware(isAuth)
  async editGroup(
    @Arg("groupId", () => Int) groupId: number,
    @Arg("name", () => String) name: string,
    @Arg("description", () => String) description: string,
    @Arg("url", () => String) url: string,
    @Arg("imageUrl", { nullable: true }) imageUrl: string,
    @Arg("password", { nullable: true }) password: string,
    @Arg("passwordUpdated") passwordUpdated: boolean
  ): Promise<GroupResponse> {
    let group: Group | undefined;

    try {
      if (passwordUpdated) {
        // If user entered a new password for edit then updated
        group = await getConnection()
          .createQueryBuilder()
          .update(Group, {
            name,
            description,
            url: url,
            groupImageUrl: imageUrl,
            password: password == "" ? undefined : await argon2.hash(password),
          })
          .where("id = :id", { id: groupId })
          .returning("*")
          .updateEntity(true)
          .execute()
          .then((response) => {
            return response.raw[0];
          });
        console.log("query done");
      } // Otherwise ignore password
      else {
        group = await getConnection()
          .createQueryBuilder()
          .update(Group, {
            name,
            description,
            url: url,
            groupImageUrl: imageUrl,
          })
          .where("id = :id", { id: groupId })
          .returning("*")
          .updateEntity(true)
          .execute()
          .then((response) => {
            return response.raw[0];
          });
      }
    } catch (err) {
      return { errors: err };
    }
    let errors = await validate(group!);

    if (errors.length > 0) {
      let message = "";
      if (errors[0]?.constraints) {
        message = Object.values(errors[0]?.constraints)[0];
        message = message[0].toUpperCase() + message.slice(1);
      }
      console.log(errors);
      return {
        errors: [
          {
            field: errors[0].property,
            message: [message],
          },
        ],
      };
    } else {
      try {
        await getManager().save(group);
      } catch (err) {
        var errorType = /\(([^()]*)\)/g.exec(err.detail)?.pop();
        if (errorType === undefined) {
          errorType = "";
        }
        errorType = errorType.replace(/_([a-z])/g, function (_, w) {
          return w.toUpperCase();
        });

        var messageString = errorType
          .replace(/_/g, " ")
          .replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());

        if (err.code === "23505") {
          // duplicate id error
          console.log(errors);
          return {
            errors: [
              {
                field: errorType,
                message: [`${messageString} already taken`],
              },
            ],
          };
        }
      }
    }
    // Get group again to retrieve updated entity
    group = await Group.findOne({ id: group?.id });
    return { group };
  }

  @Mutation(() => GroupResponse)
  @UseMiddleware(isAuth)
  async joinGroup(
    @Arg("groupId", () => Int) groupId: number,
    @Arg("password", () => String, { nullable: true }) password: string,
    @Ctx() { req }: DbContext
  ): Promise<GroupResponse> {
    let group = await Group.findOne({ id: groupId });
    if (group != undefined) {
      if (group.password && !password) {
        return {
          errors: [
            {
              field: "password",
              message: [`No Password provided for private group!`],
            },
          ],
        };
      } else if (group.password && password) {
        let response = await this.validateGroupPassword(groupId, password);
        if (!response.group) {
          return {
            errors: [
              {
                field: "password",
                message: [`Incorrect Password`],
              },
            ],
          };
        }
      }

      await getConnection().transaction(async (transactionalEntityManager) => {
        if (group?.memberCount) {
          await transactionalEntityManager.update(
            Group,
            { id: groupId },
            { memberCount: group?.memberCount + 1 }
          );
        }

        let existingMember = await transactionalEntityManager.find(Member, {
          groupId: groupId,
          userId: req.session.userId,
        });

        if (existingMember.length != 0) {
          await transactionalEntityManager.restore(Member, {
            groupId: groupId,
            userId: req.session.userId,
          });
        } else {
          await transactionalEntityManager
            .create(Member, {
              groupId,
              userId: req.session.userId,
            })
            .save();
        }
      });
    }
    return { group };
  }

  @Mutation(() => GroupResponse)
  @UseMiddleware(isAuth)
  async leaveGroup(
    @Arg("groupId", () => Int) groupId: number,
    @Ctx() { req }: DbContext
  ): Promise<GroupResponse> {
    let group = await Group.findOne({ id: groupId });
    if (group != undefined) {
      await getConnection().transaction(async (transactionalEntityManager) => {
        if (group?.memberCount) {
          await transactionalEntityManager.update(
            Group,
            { id: groupId },
            { memberCount: group?.memberCount - 1 }
          );
        }

        await transactionalEntityManager.softDelete(Member, {
          groupId: groupId,
          userId: req.session.userId,
        });
      });
      await getConnection()
        .createQueryBuilder()
        .relation(User, "groups")
        .of(req.session.userId)
        .remove(group);
    }

    return { group };
  }

  @Query(() => [Group], { nullable: true })
  async getUsersGroups(
    @Ctx() { req }: DbContext
  ): Promise<Group[] | undefined> {
    const groups = await getRepository(Group)
      .createQueryBuilder("group")
      .leftJoinAndSelect("group.members", "member")
      .where("user_id = :id", { id: req.session.userId })
      .getMany();

    return groups;
  }

  @Query(() => Group, { nullable: true })
  async getGroupByName(
    @Arg("name", () => String) name: string
  ): Promise<Group | undefined> {
    const group = await Group.findOne({ name });
    // console.log(group);
    return group;
  }

  @Query(() => Group, { nullable: true })
  async getGroupByUrl(
    @Arg("url", () => String) url: string
  ): Promise<Group | undefined> {
    const group = await Group.findOne({ url });
    // console.log(group);
    return group;
  }

  @Query(() => Group, { nullable: true })
  async getGroupById(
    @Arg("groupId", () => Int) groupId: number
  ): Promise<Group | undefined> {
    const group = await Group.findOne({ id: groupId });
    // console.log(group);
    return group;
  }

  @Query(() => [User], { nullable: true })
  async getGroupMembers(
    @Arg("groupId", () => Int) groupId: number
  ): Promise<User[] | undefined> {
    const members = await createQueryBuilder(User, "user")
      .leftJoinAndSelect("user.groups", "members")
      .leftJoinAndSelect("members.group", "groups")
      .where("groups.id = :groupId", { groupId })
      .orderBy('user.firstName', 'ASC')
      .addOrderBy('user.lastName', 'ASC') 
      .getMany();
    return members;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteGroup(
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: DbContext
  ): Promise<boolean> {
    await getConnection()
      .createQueryBuilder()
      .softDelete()
      .from(Group)
      .where({ id, creatorId: req.session.userId })
      .execute();
    return true;
  }
}
