import { User } from "../entities/profile/User";
import { DbContext } from "../types/types";
import {
  Arg,
  Ctx,
  Mutation,
  Field,
  Resolver,
  ObjectType,
  Query,
  UseMiddleware,
} from "type-graphql";
import argon2 from "argon2";
import { FORGET_PASSWORD_PREFIX, USER_COOKIE } from "../constants";
import { UserRegistrationInput } from "../entities/profile/UserRegistrationInput";
import { UserProfileSetupInput } from "../entities/profile/UserProfileSetupInput";

// import { validateRegistration } from "../utils/validateRegistration";
import { sendEmail } from "../utils/sendEmail";
import { v4 } from "uuid";
import { getConnection, getManager } from "typeorm";
import { isAuth } from "../middleware/isAuth";
import { validate } from "class-validator";
import { FieldError } from "../utils/fieldError";
import { forgotPasswordHtml } from "../utils/html/resetPassword";

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver(User)
export class UserResolver {
  // @FieldResolver(() => String)
  // email(@Root() user: User, @Ctx() { req }: DbContext) {
  //   if (req.session.userId === user.id) {
  //     return user.email;
  //   }
  //   return "";
  // }

  @Mutation(() => UserResponse)
  async changePassword(
    @Arg("token") token: string,
    @Arg("newPassword") newPassword: string,
    @Ctx() { redis, req }: DbContext
  ): Promise<UserResponse> {
    if (newPassword.length <= 2) {
      return {
        errors: [
          {
            field: "newPassword",
            message: ["Length must be greater than 2"],
          },
        ],
      };
    }
    const key = FORGET_PASSWORD_PREFIX + token;
    const userId = await redis.get(key);

    if (!userId) {
      return {
        errors: [{ field: "token", message: ["Token expired!"] }],
      };
    }

    const UserIdNum = parseInt(userId);
    const user = await User.findOne(UserIdNum);

    if (!user) {
      return {
        errors: [{ field: "token", message: ["User no longer exists!"] }],
      };
    }

    await User.update(
      { id: UserIdNum },
      { password: await argon2.hash(newPassword) }
    );
    await redis.del(key);

    // login user after password is changed
    req.session.userId = user.id;
    return { user };
  }

  @Mutation(() => UserResponse)
  async addProfileImage(
    @Arg("imageUrl") imageUrl: string,
    @Ctx() { req }: DbContext
  ): Promise<UserResponse> {
    let user;
    try {
      user = await getConnection()
        .createQueryBuilder()
        .update(User, { profileImageUrl: imageUrl })
        .where("id = :id", { id: req.session.userId })
        .returning("*")
        .updateEntity(true)
        .execute()
        .then((response) => {
          return response.raw[0];
        });
    } catch (err) {
      // console.log(err);
      return { errors: err };
    }
    user = await User.findOne(req.session.userId);
    return { user };
  }

  @Mutation(() => Boolean)
  async forgotPassword(
    @Arg("identifier") identifier: string,
    @Ctx() { redis }: DbContext
  ) {
    const user = await User.findOne({
      where: [
        { email: identifier },
        { phoneNumber: identifier },
        { username: identifier },
      ],
    });
    if (!user) {
      // Email not found
      return true;
    }

    const token = v4();
    await redis.set(
      FORGET_PASSWORD_PREFIX + token,
      user.id,
      "ex",
      1000 * 60 * 60 * 24 * 3 // 3 days ttl
    );
    console.log("Token created!");
    await sendEmail(user.email as string, await forgotPasswordHtml(token));

    return true;
  }

  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: DbContext): Promise<User | undefined> {
    if (!req.session.userId) {
      return undefined;
    }
    return User.findOne(req.session.userId);
  }

  @Query(() => User, { nullable: true })
  async getUser(
    @Arg("username", () => String) username: string
  ): Promise<User | undefined> {
    return User.findOne({ username: username });
  }

  @Query(() => [User])
  async users(): Promise<User[]> {
    return User.find({
      order: {
        createdAt: "DESC",
      },
    });
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("input") input: UserRegistrationInput,
    @Ctx() { req }: DbContext
  ): Promise<UserResponse> {
    const hashedPassword = await argon2.hash(input.password);
    // const validationErrors = validateRegistration(input);

    let user = await User.create({
      username: input.username.toLowerCase(),
      password: hashedPassword,
      email: input.email,
      phoneNumber: input.phoneNumber,
    });
    const errors = await validate(user);

    // if (validationErrors) {
    //   return { errors: validationErrors };
    // }

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
    } else {
      try {
        await getManager().save(user);
      } catch (err) {
        var errorType = /\(([^()]*)\)/g.exec(err.detail)?.pop();
        if (errorType === undefined) {
          errorType = "";
        }
        errorType = errorType.replace(/_([a-z])/g, function (_, w) {
          return w.toUpperCase();
        });

        var messageString = errorType
          .replace(/_/g, " ")
          .replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());

        // console.log(errorType);
        if (err.code === "23505") {
          // duplicate id error
          return {
            errors: [
              {
                field: errorType,
                message: [`${messageString} already taken`],
              },
            ],
          };
        }
      }
    }

    req.session.userId = user?.id;

    return { user };
  }

  @Mutation(() => UserResponse, { nullable: true })
  @UseMiddleware(isAuth)
  async setupProfile(
    @Arg("input") input: UserProfileSetupInput,
    @Ctx() { req }: DbContext
  ): Promise<UserResponse> {
    let user;
    try {
      user = await getConnection()
        .createQueryBuilder()
        .update(User, {
          firstName:
            input.firstName[0].toUpperCase() +
            input.firstName.slice(1).toLowerCase(),
          lastName:
            input.lastName[0].toUpperCase() +
            input.lastName.slice(1).toLowerCase(),
          nickname: input.nickname || null,
          namePronunciation: input.namePronunciation || null,
          tagline: input.tagline,
          homeTown: input.homeTown[0].toUpperCase() + input.homeTown.slice(1),
          pronouns: input.pronouns,
          city: input.city,
          state: input.state,
          country: input.country,
          birthday: input.birthday,
          profileSetup: true,
        })
        .where("id = :id", { id: req.session.userId })
        .returning("*")
        .updateEntity(true)
        .execute()
        .then((response) => {
          return response.raw[0];
        });
    } catch (err) {
      return { errors: err };
    }
    user = await User.findOne(req.session.userId);
    return { user };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("usernameOrEmail") usernameOrEmail: string,
    @Arg("password") password: string,
    @Ctx() { req }: DbContext
  ): Promise<UserResponse> {
    const user = await User.findOne(
      usernameOrEmail.includes("@")
        ? {
            where: { email: usernameOrEmail.toLowerCase() },
          }
        : { where: { username: usernameOrEmail.toLowerCase() } }
    );

    if (!user) {
      return {
        errors: [
          {
            field: "usernameOrEmail",
            message: ["That user does not exist!"],
          },
        ],
      };
    }
    const validPassword = await argon2.verify(user.password, password);

    if (!validPassword) {
      return {
        errors: [
          {
            field: "password",
            message: ["Incorrect password"],
          },
        ],
      };
    }
    req.session.userId = user.id; // Log user in
    return { user };
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: DbContext) {
    return new Promise((resolve) =>
      req.session.destroy((err) => {
        if (err) {
          resolve(false);
          return;
        }
        res.clearCookie(USER_COOKIE);

        resolve(true);
      })
    );
  }
}
