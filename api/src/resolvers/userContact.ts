import { validate } from "class-validator";
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
import { getConnection, getManager } from "typeorm";
import { UserContact } from "../entities/profile/UserContact";
import { ContactType } from "../entities/utility/ContactType";
import { isAuth } from "../middleware/isAuth";
import { DbContext } from "../types/types";
import { FieldError } from "../utils/fieldError";

@ObjectType()
class UserContactResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => UserContact, { nullable: true })
  userContact?: UserContact;
}

// interface InitialValueDict {
//   [index: string]: { id: number; input: string };
// }

// @ObjectType()
// class UserContactInputs {
//   @Field()
//   inputs: InitialValueDict;
// }

@Resolver(UserContact)
export class UserContactResolver {
  @Query(() => [UserContact])
  async userContacts(
    @Arg("userId", () => Int) userId: number
  ): Promise<UserContact[]> {
    let userContacts = await UserContact.find({
      where: { userId },
      relations: ["contactType"],
    });
    return userContacts;
  }

  @Mutation(() => UserContactResponse)
  @UseMiddleware(isAuth)
  async addContact(
    @Arg("typeId", () => Int) typeId: number,
    @Arg("input") input: string,
    @Ctx() { req }: DbContext
  ): Promise<UserContactResponse> {
    if (typeId == -1) {
      // Reset cache
      return { errors: undefined };
    }

    let contactExists = await UserContact.findOne({
      where: { userId: req.session.userId, contactTypeId: typeId },
      withDeleted: true,
    });

    let userContact = await UserContact.create({
      userId: req.session.userId,
      contactTypeId: typeId,
      input,
    });

    const errors = await validate(userContact);

    if (errors.length > 0) {
      let contactType = await ContactType.findOneOrFail({
        id: typeId,
      });

      let message = "";
      if (errors[0]?.constraints) {
        message = Object.values(errors[0]?.constraints)[0];
        message = message[0].toUpperCase() + message.slice(1);
      }
      return {
        errors: [
          {
            field: contactType.name,
            message: [message],
          },
        ],
      };
    }

    if (contactExists) {
      if (input == "") {
        contactExists.deletedAt = new Date();
      } else if (contactExists.deletedAt) {
        contactExists.recover();
      }
      contactExists.input = input;
      userContact = await getManager().save(contactExists);
      return { userContact };
    }

    await getConnection()
      .createQueryBuilder()
      .relation(ContactType, "userContacts")
      .of(typeId)
      .add(userContact);

    userContact = await getManager().save(userContact);
    return { userContact };
  }
}
