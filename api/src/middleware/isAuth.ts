import { MiddlewareFn } from "type-graphql/dist/interfaces/Middleware";
import { DbContext } from "../types/types";

export const isAuth: MiddlewareFn<DbContext> = ({ context }, next) => {
  if (!context.req.session.userId) {
    throw new Error("Can't create post, not logged in!");
  }

  return next();
};
