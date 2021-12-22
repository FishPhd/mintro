import {
  Box,
  Text,
  Button,
  Flex,
  Heading,
  Spacer,
  Avatar,
  Stack,
  HStack,
} from "@chakra-ui/react";
import React from "react";
import { UserCard } from "./UserCard";

export function FoundersList() {
  return (
    <>
      <Box mx="auto" as="section">
        <Heading
          textAlign="center"
          pb={10}
          fontSize={{ base: "5xl", md: "7xl" }}
          // bgClip="text"
          // bgGradient="linear(to-tr, mintro.200, mintro.400)"
        >
          Meet the Founders
        </Heading>
        <HStack
          maxW={{ base: "xl", md: "2xl" }}
          mx="auto"
          spacing={{ base: "4", md: "auto" }}
          px={{ base: "6", md: "8" }}
          direction={{ base: "column", lg: "row" }}
        >
          <UserCard
            name={"Aaron"}
            img={"/AaronFounderPic.jpeg"}
            username={"aaron"}
          />
          <UserCard
            name="Sam"
            img={
              "https://webapp-profile-images.s3.amazonaws.com/20211023-3wnkc-dsc08986-jpg"
            }
            username="sam"
          />
        </HStack>
      </Box>
    </>
  );
}
