import { Arg, Int, Query, Resolver } from "type-graphql";
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
    return Country.findOneByOrFail({ name: countryName });
  }

  @Query(() => Country)
  async getCountry(
    @Arg("countryId", () => Int) countryId: number
  ): Promise<Country | null> {
    return Country.findOneBy({ id: countryId });
  }
}
