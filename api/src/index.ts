import { ApolloServer } from "apollo-server-express";
import connectRedis from "connect-redis";
import cors from "cors";
import "dotenv-safe/config";
import express from "express";
import session from "express-session";
import Redis from "ioredis";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { USER_COOKIE, __prod__ } from "./constants";
import { FeedbackResolver } from "./resolvers/utility/feedback";
import { SectionResolver } from "./resolvers/section";
import { SectionTypeResolver } from "./resolvers/sectionType";
import { UserResolver } from "./resolvers/user";
import { CityResolver } from "./resolvers/utility/city";
import { CountryResolver } from "./resolvers/utility/country";
import { ImageUploadResolver } from "./resolvers/utility/imageUpload";
import { StateResolver } from "./resolvers/utility/state";
import { createUserLoader } from "./utils/createUserLoader";
import { GroupResolver } from "./resolvers/group";
import { ContactTypeResolver } from "./resolvers/utility/contactType";
import { UserContactResolver } from "./resolvers/userContact";
import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

export const defaultSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  logging: false,
  entities: ["dist/entities/**/*.js"],
  migrations: ["dist/migrations/*.js"],
  namingStrategy: new SnakeNamingStrategy(),
  synchronize: false,
  migrationsRun: true,
});

const main = async () => {
  defaultSource.initialize();

  const app = express();

  const RedisStore = connectRedis(session);
  const redis = new Redis(process.env.REDIS_URL);
  app.set("trust proxy", 1);
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    })
  );

  app.use(
    session({
      name: USER_COOKIE,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        sameSite: "lax",
        secure: __prod__,
        domain: __prod__ ? ".mintro.page" : undefined,
      },
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET,
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        SectionResolver,
        UserResolver,
        GroupResolver,
        CountryResolver,
        StateResolver,
        CityResolver,
        ImageUploadResolver,
        SectionTypeResolver,
        FeedbackResolver,
        ContactTypeResolver,
        UserContactResolver,
      ],
      validate: false,
    }),
    context: ({ req, res }) => ({
      req,
      res,
      redis,
      userLoader: createUserLoader(),
    }),
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(process.env.PORT, () => {
    console.log(`server started on ${process.env.CORS_ORIGIN}`);
  });
};

main().catch((err) => {
  console.error(err);
});
