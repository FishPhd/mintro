import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import Head from "next/head";
import Script from "next/script";
import React from "react";
import { mintroMode, mintroTheme } from "../themes/theme";

function MintroWebApp({ Component, pageProps }: any) {
  return (
    <ChakraProvider theme={mintroTheme}>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#f1fff6" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Mintro is the home to YOUR introduction. Make a Mintro, be yourself, share with others!"
        />
        <meta name="og:image" property="og:image" content="/ogImage.jpg" />
        <meta
          name="og:title"
          property="og:title"
          content="Mintro - Make your Intro"
        />
        <meta property="og:type" content="website" />
        <meta
          name="og:description"
          property="og:description"
          content="Mintro is the home to YOUR introduction. Make a Mintro, be yourself, share with others!"
        />
        <meta property="og:site_name" content="Mintro" />
        {/* dont hardcode this TODO (use router) */}
        <meta property="og:url" content="mintro.page" />
      </Head>
      <Script
        id="GA-TAG1"
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />
      <Script strategy="lazyOnload" id="GA-TAG2">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');
          `}
      </Script>
      {/* TODO see if thsi googlefonts api is causing issues with load time */}
      <ColorModeScript initialColorMode={mintroMode.initialColorMode} />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MintroWebApp;
