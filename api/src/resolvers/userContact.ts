import { validate } from "class-validator";
import {
  Arg,
  Ctx,
  Field,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { getConnection, getManager } from "typeorm";
import { UserContact } from "../entities/profile/UserContact";
import { ContactType } from "../entities/utility/ContactType";
import { isAuth } from "../middleware/isAuth";
import { DbContext } from "../types/types";
import { FieldError } from "../utils/fieldError";

@ObjectType()
class UserContactResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => UserContact, { nullable: true })
  userContact?: UserContact;
}

@Resolver(UserContact)
export class UserContactResolver {
  @Query(() => [UserContact])
  async userContacts(
    @Arg("userId", () => Int) userId: number
  ): Promise<UserContact[]> {
    let userContacts = await UserContact.find({
      where: { userId },
      relations: ["contactType"],
    });
    console.log(userContacts);
    return userContacts;
  }

  @Mutation(() => UserContactResponse)
  @UseMiddleware(isAuth)
  async addContact(
    @Arg("typeId", () => Int) typeId: number,
    @Arg("input") input: string,
    @Ctx() { req }: DbContext
  ): Promise<UserContactResponse> {
    console.log(req.session.userId);
    let contactExists = await UserContact.findOne({
      userId: req.session.userId,
      contactTypeId: typeId,
    });

    let userContact = await UserContact.create({
      userId: req.session.userId,
      contactTypeId: typeId,
      input,
    });

    console.log(userContact);
    const errors = await validate(userContact);

    if (errors.length > 0) {
      // throw new Error(`Validation failed!`);
      let message = "";
      if (errors[0]?.constraints) {
        message = Object.values(errors[0]?.constraints)[0];
        message = message[0].toUpperCase() + message.slice(1);
      }
      return {
        errors: [
          {
            field: errors[0].property,
            message: [message],
          },
        ],
      };
    }
    if (contactExists) {
      contactExists.input = input;

      // return { userContact };
    }

    if (contactExists) {
      userContact = await getManager().save(contactExists);
      return { userContact };
    }

    await getConnection()
      .createQueryBuilder()
      .relation(ContactType, "userContacts")
      .of(typeId)
      .add(userContact);

    userContact = await getManager().save(userContact);
    return { userContact };
  }
}
