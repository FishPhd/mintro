import { Field, InputType } from "type-graphql";

@InputType()
export class SignedResponse {
  @Field(() => String, { nullable: true })
  firstName: String;

  @Field(() => String, { nullable: true })
  lastName: String;
}
