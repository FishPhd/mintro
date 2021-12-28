import { Box, Heading, Link, Stack, Text } from "@chakra-ui/react";
import React from "react";
import MintroLogo from "../svg/MintroLogo";
import NextLink from "next/link";

export function Footer() {
  return (
    <>
      <Box
        as="section"
        pt={{base: "20%", md:"10%"}}
        pb="20"
        overflow="hidden"
        // bgGradient="linear(to-t, mintro.100, white)"
        bgGradient="linear(white 65%,  mintro.50 100%)"
      >
        <Box mx="auto" maxW={{ base: "sm", md: "4xl" }}>
          <Stack alignItems="center">
            <NextLink href="/" as="/">
              <Box _hover={{ opacity: "75%" }} as={Link}>
                <MintroLogo width="40" height="40" />
              </Box>
            </NextLink>
            <Heading
              bgClip="text"
              textAlign="center"
              pt={5}
              bgGradient="linear(to-tr, mintro.200, mintro.400)"
            >
              Authenticity Curiosity Connection
            </Heading>
            <Link
              pt={10}
              textDecoration="none"
              color="dark.300"
              href="mailto:hello@mintro.page"
              _hover={{ color: "dark.200" }}
            >
              hello@mintro.page
            </Link>
            <Link
              textDecoration="none"
              pt="10"
              color="dark.200"
              href="https://www.ipsos.com/en-us/news-polls/us-loneliness-index-report"
              _hover={{ color: "dark.100" }}
            >
              Ipsos Public Affairs, May 2018
              <sup
                style={{
                  fontSize: 12,
                  verticalAlign: "text-top",
                  top: "5px",
                }}
              >
                1
              </sup>
            </Link>
          </Stack>
        </Box>
      </Box>
    </>
  );
}
