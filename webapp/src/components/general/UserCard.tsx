import { Avatar, Box, Button, Flex, Spacer, Text } from "@chakra-ui/react";
import { isMobile } from "is-mobile";
import NextLink from "next/link";
import React from "react";

interface UserCardProps {
  firstName: string;
  lastName?: string;
  img: string;
  username: string;
  tagline?: string;
}

export function UserCard(props: UserCardProps) {
  const { firstName, lastName, img, username, tagline } = props;
  const src = img as string;

  const user_photo = src + "?tr=w-250,h-250";
  return (
    <>
      <Flex
        direction="column"
        alignItems="center"
        rounded="md"
        position="relative"
        py={8}
        px={5}
        h="100%"
        bg={"gray.50"}
        maxW={{ base: "xs", md: "xl" }}
        shadow={{ md: "base" }}
      >
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          height="20"
          bg="mintro.200"
          roundedTop="inherit"
        />
        <Avatar
          alt={"Member Picture"}
          size={isMobile() ? "lg" : "xl"}
          width={"125px"}
          height={"125px"}
          src={user_photo}
        />
        <Text pt={2} fontSize="2xl" fontWeight="700">
          {firstName} {lastName}
        </Text>
        <Text mt="-2" pb={2} color="mintro.500" fontStyle="italic">
          {tagline}
        </Text>
        <Spacer />
        <NextLink href={`/m/${username}`}>
          <Button
            variant="mintro"
            rounded="full"
            fontSize={{ base: "13", md: "unset" }}
          >
            View Mintro
          </Button>
        </NextLink>
      </Flex>
    </>
  );
}
