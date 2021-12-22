import { Arg, Field, Mutation, ObjectType, Resolver } from "type-graphql";
import aws from "aws-sdk";

const s3Bucket = process.env.S3_BUCKET_IMAGES;

@ObjectType()
class S3Response {
  @Field(() => String, { nullable: true })
  signedRequest: String;

  @Field(() => String, { nullable: true })
  url: String;
}

@Resolver()
export class ImageUploadResolver {
  @Mutation(() => S3Response)
  async getS3SignedUrl(
    @Arg("filename", () => String) filename: string,
    @Arg("folder", () => String) folder: string,
    @Arg("filetype") filetype: string
  ): Promise<S3Response> {
    const s3 = new aws.S3({
      signatureVersion: "v4",
      region: "us-west-2",
    });

    const key = folder + "/" + filename;
    const s3Params = {
      Bucket: s3Bucket,
      Key: key,
      Expires: 60,
      ContentType: filetype,
      ACL: "public-read",
    };

    const signedRequest = await s3.getSignedUrl("putObject", s3Params);
    const url = `https://${s3Bucket}.s3.amazonaws.com/${key}`;
    return {
      signedRequest,
      url,
    };
  }
}
