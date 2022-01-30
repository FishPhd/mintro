import {
  Arg,
  Ctx,
  Int,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { UserContact } from "../entities/profile/UserContact";
import { isAuth } from "../middleware/isAuth";
import { DbContext } from "../types/types";

@Resolver(UserContact)
export class UserContactResolver {
  @Query(() => [UserContact])
  async userContact(
    @Arg("userId", () => Int) userId: number
  ): Promise<UserContact[]> {
    return UserContact.find({ userId });
  }

  @Mutation(() => UserContact)
  @UseMiddleware(isAuth)
  async addContact(
    @Arg("typeId", () => Int) typeId: number,
    @Arg("input") input: string,
    @Ctx() { req }: DbContext
  ): Promise<UserContact> {
    console.log(req.session.userId);
    let contactType = await UserContact.create({
      userId: req.session.userId,
      contactTypeId: typeId,
      input,
    }).save();
    console.log(contactType);
    // let contactType = await getManager().save(user);

    return contactType;
  }
}
