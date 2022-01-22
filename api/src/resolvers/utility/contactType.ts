import { Arg, Int, Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import { ContactType } from "../../entities/utility/ContactType";

// @ObjectType()
// class SectionResponse {
//   @Field(() => [FieldError], { nullable: true })
//   errors?: FieldError[];

//   @Field(() => Section, { nullable: true })
//   section?: Section;
// }

@Resolver(ContactType)
export class ContactTypeResolver {
  @Query(() => [ContactType])
  async contactTypes(): Promise<ContactType[]> {
    return ContactType.find();
  }
}
