import { Query, Resolver } from "type-graphql";
import { ContactType } from "../../entities/utility/ContactType";

@Resolver(ContactType)
export class ContactTypeResolver {
  @Query(() => [ContactType])
  async contactTypes(): Promise<ContactType[]> {
    return ContactType.find({
      order: {
        id: "ASC",
      },
    });
  }
}
