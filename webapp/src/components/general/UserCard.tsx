import {
  Box,
  Text,
  Button,
  Flex,
  Avatar,
  HStack,
  Spacer,
} from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";

interface UserCardProps {
  name: String;
  img: String;
  username: String;
  tagline?: String;
}

export function UserCard(props: UserCardProps) {
  const { name, img, username, tagline } = props;
  let src = img as string;

  var user_photo = src.replace("mintro-webapp-images.s3.amazonaws.com/", "ik.imagekit.io/wzbi68mgpi3/");
  user_photo += "?tr=w-250,h-250";
  return (
    <>
      <Flex
        direction="column"
        alignItems="center"
        rounded="md"
        position="relative"
        py={8}
        px={5}
        bg={"gray.50"}
        h="100%"
        w="3xs"
        shadow={{ md: "base" }}
      >
        <Box
          position="absolute"
          inset="0"
          height="20"
          bg="mintro.300"
          roundedTop="inherit"
        />
        <Avatar size="xl" src={user_photo} />
        <Text pt={2} fontSize="2xl" fontWeight="700">
          {name}
        </Text>
        <Text pb={2} color="gray.500" fontStyle="italic">
          {tagline}
        </Text>
        <Spacer />
        <NextLink href={`/m/${username}`}>
          <Button variant="mintro" rounded="full">
            View Mintro
          </Button>
        </NextLink>
      </Flex>
    </>
  );
}
