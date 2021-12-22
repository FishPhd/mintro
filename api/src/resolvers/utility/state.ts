import { Arg, Int, Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import { State } from "../../entities/utility/State";

// @ObjectType()
// class SectionResponse {
//   @Field(() => [FieldError], { nullable: true })
//   errors?: FieldError[];

//   @Field(() => Section, { nullable: true })
//   section?: Section;
// }

@Resolver(State)
export class StateResolver {
  @Query(() => [State])
  async states(): Promise<State[]> {
    return State.find();
  }

  @Query(() => [State])
  async getStatesFromCountry(
    @Arg("countryId", () => Int) countryId: number
  ): Promise<State[]> {
    const qb = await getConnection()
      .getRepository(State)
      .createQueryBuilder("s")
      .where('"country_id" = :countryId', {
        countryId,
      })
      .orderBy('"name"', "ASC")
      .getMany();

    return qb;
  }
}
