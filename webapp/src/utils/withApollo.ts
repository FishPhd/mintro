// import { ApolloClient, InMemoryCache } from "@apollo/client";
// import { NextPageContext } from "next";
// import { withApollo } from "next-apollo";

// const client = (ctx: NextPageContext) =>
//   new ApolloClient({
// uri: process.env.NEXT_PUBLIC_API_URL as string,
// credentials: "include" as RequestCredentials,
// headers: {
//   cookie:
//     (typeof window === "undefined"
//       ? ctx?.req?.headers.cookie
//       : undefined) || "",
// },
// cache: new InMemoryCache(),
//   });

// export const usingApollo = withApollo(client);

import {
  ApolloClient,
  HttpLink,
  // HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
// import { concatPagination } from "@apollo/client/utilities";
import merge from "deepmerge";
import { IncomingHttpHeaders } from "http";
import isEqual from "lodash/isEqual";
import { AppProps } from "next/app";
import { useMemo } from "react";

export const APOLLO_STATE_PROP_NAME = "__APOLLO_STATE__";

let apolloClient: ApolloClient<NormalizedCacheObject>;

function createApolloClient(headers: IncomingHttpHeaders | null = null) {
  console.log(process.env.NEXT_PUBLIC_API_URL);
  const enhancedFetch = (url: RequestInfo, init: RequestInit) =>
    fetch(url, {
      ...init,
      headers: {
        ...init.headers,
        Cookie: headers?.cookie ?? "",
      },
    }).then((response) => response);

  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_API_URL as string, // Server URL (must be absolute)
      credentials: "include" as RequestCredentials, // Additional fetch() options like `credentials` or `headers`
      fetch: enhancedFetch, // context ? enchancedFetch : fetch,
    }),
    // headers: {
    //   cookie:
    //     (typeof window === "undefined"
    //       ? vs
    //       : undefined) || "",
    // },
    cache: new InMemoryCache(), //.restore(initialState),
  });
}

interface IInitializeApollo {
  headers?: IncomingHttpHeaders | null;
  initialState?: InitialState | null;
}

type InitialState = NormalizedCacheObject | undefined;

export function initializeApollo(
  // context: NextPageContext | undefined,
  // initialState = null
  { headers, initialState }: IInitializeApollo = {
    headers: null,
    initialState: null,
  }
) {
  const _apolloClient = apolloClient ?? createApolloClient(headers);

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s))
        ),
      ],
    });

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function addApolloState(
  client: ApolloClient<NormalizedCacheObject>,
  pageProps: AppProps["pageProps"]
) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return pageProps;
}

export function useApollo(
  pageProps: AppProps["pageProps"]
  // context: NextPageContext | undefined
) {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const store = useMemo(() => initializeApollo(state), [state]);
  return store;
}
