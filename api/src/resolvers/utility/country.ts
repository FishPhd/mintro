import { Arg, Int, Query, Resolver } from "type-graphql";
import { Country } from "../../entities/utility/Country";

// @ObjectType()
// class SectionResponse {
//   @Field(() => [FieldError], { nullable: true })
//   errors?: FieldError[];

//   @Field(() => Section, { nullable: true })
//   section?: Section;
// }

@Resolver(Country)
export class CountryResolver {
  @Query(() => [Country])
  async countries(): Promise<Country[]> {
    return Country.find();
  }

  @Query(() => Country)
  async getCountry(
    @Arg("countryId", () => Int) countryId: number
  ): Promise<Country | undefined> {
    return Country.findOne({ id: countryId });
  }
}
