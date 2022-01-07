import { Arg, Int, Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import { Country } from "../../entities/utility/Country";

@Resolver(Country)
export class CountryResolver {
  @Query(() => [Country])
  async countries(): Promise<Country[]> {
    return Country.find();
  }

  @Query(() => Country)
  async getCountryFromName(
    @Arg("countryName") countryName: string
  ): Promise<Country> {
    const qb = await getConnection()
      .getRepository(Country)
      .createQueryBuilder("c")
      .where('"name" = :countryName', {
        countryName,
      })
      .getOneOrFail();

    return qb;
  }

  @Query(() => Country)
  async getCountry(
    @Arg("countryId", () => Int) countryId: number
  ): Promise<Country | undefined> {
    return Country.findOne({ id: countryId });
  }
}
