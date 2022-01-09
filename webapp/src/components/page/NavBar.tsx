import { useApolloClient } from "@apollo/client";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Text,
  useDisclosure,
  Stack,
  Avatar,
  VStack,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useLogoutMutation, useMeQuery, User } from "../../graphql/generated/graphql";
import MintroLogo from "../svg/MintroLogo";
import { RiGroup2Fill, RiUserFill } from "react-icons/ri";
import { FeedbackForm } from "../forms/FeedbackForm";
import { BugReportButton } from "../buttons/BugReportButton";

interface NavBarProps {
  transparent?: boolean;
  me: User | undefined;
}

export const NavBar: React.FC<NavBarProps> = ({ transparent, me }) => {
  const [logout] = useLogoutMutation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const apolloClient = useApolloClient();

  // const { data: { me: me } = {}, loading } = useMeQuery();
  let profile_photo = me?.profileImageUrl?.replace(
    "mintro-webapp-images.s3.amazonaws.com/",
    "ik.imagekit.io/wzbi68mgpi3/"
  );
  profile_photo += "?tr=w-50,h-50";

  let userPane = null;

  // if (loading) {
  // } else
  if (!me) {
    userPane = (
      <>
        <NextLink href="/login">
          <Button
            aria-label="login"
            rounded="full"
            as={"a"}
            fontWeight={400}
            variant={"solid"}
            href={"login"}
          >
            Log In
          </Button>
        </NextLink>
        <NextLink href="/register">
          <Button
            aria-label="register"
            rounded="full"
            as={"a"}
            fontWeight={600}
            variant="mintro"
            href={"register"}
          >
            Sign Up
          </Button>
        </NextLink>
      </>
    );
  } else {
    userPane = (
      <>
        <Menu autoSelect={false} placement="bottom">
          <MenuButton aria-label="Profile Button" role="group">
            <VStack spacing={-1}>
              <Avatar
                alt={"Current User Profile Image"}
                boxSize={9}
                mb={2}
                bg="gray.300"
                size="xl"
                src={profile_photo ? profile_photo : undefined}
              />

              <Flex alignItems={"center"}>
                <Text
                  fontSize={{ base: "xs", md: "s" }}
                  pl={1}
                  fontWeight={600}
                  color={"dark.500"}
                  _groupHover={{ color: "dark.300" }}
                >
                  You
                </Text>
                <ChevronDownIcon boxSize={{ base: 4, md: 5 }} />
              </Flex>
            </VStack>
          </MenuButton>

          <MenuList py={0} minW="-moz-min-content">
            <MenuItem
              _hover={{ bg: "red.50" }}
              onClick={async () => {
                await logout();
                await apolloClient.resetStore();
              }}
              color="red"
            >
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      </>
    );
  }

  return (
    <Box
      position="sticky"
      shadow={transparent ? undefined : "sm"}
      // shadow="sm"
      // bg={transparent ? undefined : "white"}
      bg="white"
      top="0"
      zIndex={1}
    >
      <Flex
        maxW={1200}
        m="auto"
        minH={"70px"}
        px={{ base: 4 }}
        borderBottom={transparent ? undefined : "1"}
      >
        <HStack dir="row" flex={{ base: 1 }}>
          <NextLink href="/" as="/">
            <Link _hover={{ opacity: "75%" }}>
              <Box>
                <MintroLogo width="45" height="45" />
              </Box>
            </Link>
          </NextLink>

          <HStack
            pl={{ base: "4", md: "8" }}
            as={"nav"}
            spacing={4}
            direction="column"
          >
            {me && (
              <>
                <NextLink href={"/m/[user]"} as={"/m/" + me?.username}>
                  <Link
                    color={
                      router.asPath == "/m/" + me?.username
                        ? "mintro.300"
                        : "dark.400"
                    }
                    fontWeight="600"
                    _hover={{ opacity: "75%" }}
                  >
                    <Stack
                      direction={{ base: "column", md: "row" }}
                      spacing={0}
                    >
                      <Icon
                        mr={1}
                        color={
                          router.asPath == "/m/" + me?.username
                            ? "mintro.300"
                            : "dark.400"
                        }
                        boxSize="5"
                        alignSelf={"center"}
                        as={RiUserFill}
                      />
                      <Text fontSize={{ base: "xs", md: "md" }} pl={0}>
                        {"Mintro"}
                      </Text>
                    </Stack>
                  </Link>
                </NextLink>
                <NextLink href="/groups" as="/groups">
                  <Link
                    color={
                      router.asPath == "/groups" ? "mintro.300" : "dark.400"
                    }
                    fontWeight="600"
                    _hover={{ opacity: "75%" }}
                  >
                    <Stack
                      direction={{ base: "column", md: "row" }}
                      spacing={0}
                      pb={{ base: "1", md: "0" }}
                    >
                      <Icon
                        color={
                          router.asPath == "/groups" ? "mintro.300" : "dark.400"
                        }
                        mr={1}
                        alignSelf="center"
                        boxSize="6"
                        as={RiGroup2Fill}
                      />
                      <Text fontSize={{ base: "xs", md: "md" }} pl={0}>
                        {"Groups"}
                      </Text>
                    </Stack>
                  </Link>
                </NextLink>
              </>
            )}
          </HStack>

          <Spacer />
          <HStack>{userPane}</HStack>
          <BugReportButton onOpen={onOpen} me={!!me} />
        </HStack>
      </Flex>
      <FeedbackForm isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default NavBar;
