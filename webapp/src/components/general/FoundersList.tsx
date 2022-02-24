import { Box, Heading, Stack } from "@chakra-ui/react";
import React from "react";
import { UserCard } from "./UserCard";

export function FoundersList() {
  return (
    <>
      <Box mx="auto" as="section">
        <Heading
          textAlign="center"
          pb={{ base: "10%", md: "2%" }}
          fontSize={{ base: "4xl", md: "7xl" }}
          // bgClip="text"
          // bgGradient="linear(to-tr, mintro.200, mintro.400)"
        >
          Meet the Founders
        </Heading>
        <Stack
          // maxW={{ base: "100%", md: "xl" }}
          maxW={{ base: "fit-content", md: "md" }}
          mx={"auto"}
          spacing={{ base: "6", md: "auto" }}
          direction="row"
        >
          <UserCard
            firstName={"Aaron"}
            img={"/AaronFounderPic_300x300.webp"}
            username={"aaron"}
            tagline={"CEO"}
          />
          <UserCard
            firstName="Sam"
            img={
              "https://ik.imagekit.io/wzbi68mgpi3/profiles/20220205-s404v-dsc00177-2-jpg"
            }
            tagline={"CTO"}
            username="sam"
          />
        </Stack>
      </Box>
    </>
  );
}
