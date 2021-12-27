import {
  Box,
  Button,
  Text,
  Flex,
  Heading,
  Icon,
  IconButton,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { IoChevronForwardSharp } from "react-icons/io5";
export function Hero() {
  return (
    <>
      <Box as="section" pt="24" pb="5" mb={"10%"} overflow="hidden">
        <Box
          maxW={{ base: "xl", md: "7xl" }}
          mx="auto"
          px={{ base: "6", md: "8" }}
        >
          <Flex
            align="flex-start"
            direction={{ base: "column", lg: "row" }}
            justify="space-between"
            mb="10%"
          >
            <Box flex="1" maxW={{ lg: "4xl" }} pt="6">
              {/* <Heading fontSize={{ base: "3xl", md: "6xl" }}>
                Introductions...
              </Heading> */}
              <Heading
                fontSize={{ base: "5xl", md: "8xl" }}
                bgClip="text"
                bgGradient="linear(to-tr, mintro.200, mintro.400)"
                pb={2}
                userSelect={"none"}
              >
                Introductions...
                <br />
                Better
              </Heading>

              <NextLink href="/register">
                <IconButton
                  flex="1"
                  color="dark.500"
                  variant="mintro"
                  aria-label="Create your Mintro!"
                  rounded="full"
                  p={5}
                  href={"register"}
                  icon={
                    <Text fontWeight="800">
                      Lets get started!{" "}
                      <Icon
                        boxSize="5"
                        mb={0.95}
                        color="dark.500"
                        as={IoChevronForwardSharp}
                      />
                    </Text>
                  }
                >
                  Create your mintro
                </IconButton>
              </NextLink>
            </Box>
          </Flex>
        </Box>
      </Box>
    </>
  );
}
