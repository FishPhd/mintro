import { Arg, Ctx, Field, Mutation, ObjectType, Resolver } from "type-graphql";
import { Feedback } from "../../entities/utility/Feedback";
import { DbContext } from "../../types/types";
import { FieldError } from "../../utils/fieldError";

@ObjectType()
class FeedbackResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Feedback, { nullable: true })
  feedback?: Feedback;
}

@Resolver()
export class FeedbackResolver {
  @Mutation(() => FeedbackResponse)
  async submitFeedback(
    @Arg("feedback", () => String) feedback: string,
    @Ctx() { req }: DbContext
  ): Promise<FeedbackResponse> {
    if (feedback == "") {
      return {
        errors: [
          {
            field: "feedback",
            message: ["Please insert feedback into the form!"],
          },
        ],
      };
    }
    const feedback_response = await Feedback.create({
      userId: req.session.userId ? req.session.userId : undefined,
      feedback,
    }).save();

    return { feedback: feedback_response };
  }
}
