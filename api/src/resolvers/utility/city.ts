import { Arg, Int, Query, Resolver } from "type-graphql";
import { City } from "../../entities/utility/City";

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
    return City.findOneByOrFail({ name: cityName, countryId });
  }

  @Query(() => [City])
  async getCitiesFromState(
    @Arg("stateId", () => Int) stateId: number
  ): Promise<City[]> {
    return City.find({ order: { name: "ASC" }, where: { stateId } });
  }
}
