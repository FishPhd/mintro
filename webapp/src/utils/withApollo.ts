import { ApolloClient, InMemoryCache } from "@apollo/client";
import { NextPageContext } from "next";
import { withApollo } from "next-apollo";

const client = (ctx: NextPageContext) =>
  new ApolloClient({
    uri: process.env.NEXT_PUBLIC_API_URL as string,
    credentials: "include" as RequestCredentials,
    headers: {
      cookie:
        (typeof window === "undefined"
          ? ctx?.req?.headers.cookie
          : undefined) || "",
    },
    cache: new InMemoryCache(),
  });

export const usingApollo = withApollo(client);
