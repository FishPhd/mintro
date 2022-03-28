import { Arg, Int, Query, Resolver } from "type-graphql";
import { State } from "../../entities/utility/State";

@Resolver(State)
export class StateResolver {
  @Query(() => [State])
  async states(): Promise<State[]> {
    return State.find();
  }

  @Query(() => State)
  async getStateFromName(
    @Arg("stateName") stateName: string,
    @Arg("countryId", () => Int) countryId: number
  ): Promise<State> {
    return State.findOneByOrFail({ name: stateName, countryId });
  }

  @Query(() => [State])
  async getStatesFromCountry(
    @Arg("countryId", () => Int) countryId: number
  ): Promise<State[]> {
    return State.find({ order: { name: "ASC" }, where: { countryId } });
  }
}
