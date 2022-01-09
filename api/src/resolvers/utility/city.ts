import { Arg, Int, Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import { City } from "../../entities/utility/City";

// @ObjectType()
// class SectionResponse {
//   @Field(() => [FieldError], { nullable: true })
//   errors?: FieldError[];

//   @Field(() => Section, { nullable: true })
//   section?: Section;
// }

@Resolver(City)
export class CityResolver {
  @Query(() => [City])
  async cities(): Promise<City[]> {
    return City.find();
  }

  @Query(() => City)
  async getCityFromName(
    @Arg("cityName") cityName: string,
    @Arg("countryId", () => Int) countryId: number
  ): Promise<City> {
    const qb = await getConnection()
      .getRepository(City)
      .createQueryBuilder("c")
      .where('"name" = :cityName', {
        cityName,
      })
      .andWhere('"country_id" = :countryId', {
        countryId,
      })
      .getOneOrFail();

    return qb;
  }

  @Query(() => [City])
  async getCitiesFromState(
    @Arg("stateId", () => Int) stateId: number
  ): Promise<City[]> {
    const qb = await getConnection()
      .getRepository(City)
      .createQueryBuilder("c")
      .where('"state_id" = :stateId', {
        stateId,
      })
      .orderBy('"name"', "ASC")
      .getMany();

    return qb;
  }
}
