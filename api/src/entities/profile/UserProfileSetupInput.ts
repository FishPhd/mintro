import { Field, InputType } from "type-graphql";

@InputType()
export class UserProfileSetupInput {
  @Field(() => String, { nullable: true })
  firstName: String;

  @Field(() => String, { nullable: true })
  lastName: String;

  @Field(() => String, { nullable: true })
  nickname: String;

  @Field(() => String, { nullable: true })
  namePronunciation: String;

  @Field(() => Date, { nullable: true })
  birthday: Date;

  @Field(() => String, { nullable: true })
  tagline: String;

  @Field(() => String, { nullable: true })
  homeTown: String;

  @Field(() => String, { nullable: true })
  pronouns: String;

  @Field(() => String, { nullable: true })
  city: String;

  @Field(() => String, { nullable: true })
  state: String;

  @Field(() => String, { nullable: true })
  country: String;
}
