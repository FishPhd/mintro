import {
  Box,
  IconButton,
  useColorModeValue,
  Text,
  Icon,
  Flex,
  Spacer,
  Stack,
  Heading,
  Button,
  Avatar,
  Link,
  HStack,
  useDisclosure,
} from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { NavBar } from "../components/page/NavBar";
import {
  Group,
  useGetUsersGroupsQuery,
  useLoginMutation,
} from "../generated/graphql";
import { usingApollo } from "../utils/withApollo";
import NextLink from "next/link";
import { RiAddFill } from "react-icons/ri";
import { groupCollapsed } from "console";
import Card from "../components/general/Card";
import { GroupSetup } from "../components/groups/GroupSetup";

export const Groups: React.FC<{}> = ({}) => {
  // const router = useRouter();
  const { data: userGroups, loading: loadingUserGroups } =
    useGetUsersGroupsQuery();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Head>
        <title>Mintro - Groups</title>
      </Head>
      <NavBar />
      <GroupSetup isOpen={isOpen} onClose={onClose} />
      <Box
        bg={useColorModeValue("gray.50", "inherit")}
        minH="100vh"
        py="12"
        px={{ base: "4", lg: "8" }}
      >
        <Box as="section">
          <Box maxW="2xl" mx="auto">
            <Flex>
              <Spacer />
              <Button
                size="md"
                color="dark.500"
                variant="mintro"
                aria-label="Create a Mintro Group"
                rounded="full"
                p={4}
                href={"register"}
                onClick={onOpen}
              >
                Create Group
              </Button>
            </Flex>
            <Stack py={5} spacing="4">
              {userGroups?.getUsersGroups?.map(
                (group: Group, index: number) => (
                  <NextLink key={`group_${group.url}`} href={`g/${group.url}`}>
                    <Link _hover={{ opacity: "75%", color: "mintro.300" }}>
                      <Card p={5}>
                        <HStack>
                          <Avatar
                            size="lg"
                            src={
                              group.groupImageUrl
                                ? group.groupImageUrl
                                : undefined
                            }
                          />
                          <Stack spacing={0}>
                            <Heading>{group.name}</Heading>
                            <Text pl={1} fontStyle="italic" color="dark.200">
                              {group.memberCount} Members
                            </Text>
                          </Stack>
                        </HStack>
                      </Card>
                    </Link>
                  </NextLink>
                )
              )}
            </Stack>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default usingApollo({ ssr: false })(Groups);
