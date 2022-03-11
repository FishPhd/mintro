import { Section } from "../entities/section/Section";
import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { DbContext } from "../types/types";
import { isAuth } from "../middleware/isAuth";
import { getConnection } from "typeorm";
import { LexoRank } from "lexorank";
import { FieldError } from "../utils/fieldError";
import { User } from "../entities/profile/User";
import { SectionType } from "../entities/section/SectionType";
import { SectionItem } from "../entities/section/SectionItem";

@ObjectType()
class SectionResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Section, { nullable: true })
  section?: Section;
}

@ObjectType()
class PaginatedSections {
  @Field(() => [Section])
  sections: Section[];
  @Field()
  isEnd: boolean;
}

@Resolver(Section)
export class SectionResolver {
  // @FieldResolver(() => String)
  // textSnippet(@Root() root: Section) {
  //   return root.type.slice(0, 50);
  // }

  @FieldResolver(() => User)
  creator(@Root() section: Section, @Ctx() { userLoader }: DbContext) {
    return userLoader.load(section.creatorId);
  }

  @Query(() => PaginatedSections)
  async sections(
    @Arg("postCount", () => Int) postCount: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null
  ): Promise<PaginatedSections> {
    const limit = Math.min(50, postCount);
    const replacements: any[] = [limit + 1];

    if (cursor) {
      replacements.push(new Date(parseInt(cursor)));
    }

    // TODO fix this
    const sections = await getConnection().query(
      `
    select s.*
    from sections s
    ${cursor ? `where s."created_at" < $2` : ""}
    order by s."created_at" DESC
    limit $1
    `,
      replacements
    );

    return {
      sections: sections.slice(0, limit),
      isEnd: sections.length !== limit + 1,
    };
  }

  @Query(() => PaginatedSections)
  async getSectionsByUser(
    @Arg("postCount", () => Int) postCount: number,
    @Arg("userId", () => Int) userId: number
  ): Promise<PaginatedSections> {
    const limit = Math.min(10, postCount);
    let sections = await getConnection()
      .getRepository(Section)
      .find({
        relations: ["type", "items"],
        where: { creatorId: userId },
        order: { rank: "DESC" },
        take: limit,
      });
    return {
      sections: sections.slice(0, limit),
      isEnd: sections.length !== limit + 1,
    };
  }

  @Query(() => Section, { nullable: true })
  async getSection(
    @Arg("sectionId", () => Int) sectionId: number
  ): Promise<Section | undefined> {
    return Section.findOne(sectionId);
  }

  @Mutation(() => Section)
  @UseMiddleware(isAuth)
  async updateRank(
    @Arg("ranks", () => [String]) ranks: string,
    @Arg("id", () => Int) id: number,
    @Arg("movingUp", () => Boolean) movingUp: boolean,
    @Ctx() { req }: DbContext
  ): Promise<Section> {
    let lexoRank;
    if (ranks.length == 2) {
      let rankStart = LexoRank.parse(ranks[0]);
      let rankEnd = LexoRank.parse(ranks[1]);

      lexoRank = rankStart.between(rankEnd);
    } else {
      lexoRank = movingUp
        ? LexoRank.parse(ranks[0]).between(LexoRank.max())
        : LexoRank.parse(ranks[0]).between(LexoRank.min());
    }

    const result = await getConnection()
      .createQueryBuilder()
      .update(Section)
      .set({ rank: lexoRank.toString(), updatedAt: () => '"updated_at"' })
      .where('id = :id and "creator_id" = :creator_id', {
        id,
        creator_id: req.session.userId,
      })
      .returning("*")
      .execute();
    return result.raw[0];
  }

  @Mutation(() => SectionResponse)
  @UseMiddleware(isAuth)
  async createSection(
    @Arg("typeId", () => Int) typeId: number,
    @Arg("items", () => [String]) items: [string],
    @Ctx() { req }: DbContext
  ): Promise<SectionResponse> {
    let lexoRank;
    var emptyArray = items.join("") ? false : true;
    /* TODO Verify size of items (limit) and ensure that this user
     does not have duplicate section types */

    if (emptyArray) {
      return {
        errors: [
          {
            field: "items",
            message: ["Must have at least 1 item!"],
          },
        ],
      };
    }

    const result = await getConnection()
      .getRepository(Section)
      .createQueryBuilder("s")
      .where('"creator_id" = :user_id', {
        user_id: req.session.userId,
      })
      .orderBy('"rank"', "DESC")
      .getMany();

    if (result.length >= 10) {
      return {
        errors: [
          {
            field: "section",
            message: ["You are too interesting! (Max of 10 sections)"],
          },
        ],
      };
    }

    // Get Matching type
    const type = await getConnection()
      .getRepository(SectionType)
      .createQueryBuilder("s")
      .where('"id" = :type_id', {
        type_id: typeId,
      })
      .getOne();

    // Parse most recent post and generate rank
    if (result[0]) {
      lexoRank = LexoRank.parse(result[0].rank).between(LexoRank.max());
    } else {
      lexoRank = LexoRank.middle();
    }

    const sectionItems = [];
    for (let i = 0; i < items.length; i++) {
      const newItem = SectionItem.create({
        content: items[i],
        sectionId: type?.id,
      });
      sectionItems.push(newItem);
    }

    const section = await Section.create({
      typeId,
      type,
      items: sectionItems,
      creatorId: req.session.userId,
      rank: lexoRank.toString(),
    }).save();
    return { section };
  }

  @Mutation(() => Section, { nullable: true })
  @UseMiddleware(isAuth)
  async updateSection(
    @Arg("id", () => Int) id: number,
    @Arg("items", () => [String]) items: [string],
    @Ctx() { req }: DbContext
  ): Promise<Section | undefined> {
    const sectionItems = [];
    for (let i = 0; i < items.length; i++) {
      console.log("here");
      const newItem = SectionItem.create({
        sectionId: id,
        content: items[i],
      });
      sectionItems.push(newItem);

      console.log(id);
      await getConnection()
        .createQueryBuilder()
        .relation(Section, "items")
        .of(id)
        .add(newItem);
    }

    if (sectionItems == []) {
      return;
    }
    console.log(sectionItems);

    let sectionUpdate = await getConnection().getRepository(Section).save({
      id,
      creator_id: req.session.userId,
      items: sectionItems,
    });

    if (sectionUpdate == undefined) {
      // TODO add error
      console.log("Section could not be updated!");
      return undefined;
    }

    return Section.findOne({
      relations: ["type", "items"],
      where: { id },
    });
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteSection(
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: DbContext
  ): Promise<boolean> {
    await getConnection()
      .createQueryBuilder()
      .softDelete()
      .from(Section)
      .where({ id, creatorId: req.session.userId })
      .execute();
    return true;
  }
}
