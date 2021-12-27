import { useApolloClient } from "@apollo/client";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  IconProps,
  Img,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useColorModeValue,
  ModalOverlay,
  Spacer,
  Text,
  Textarea,
  Tooltip,
  useDisclosure,
  useToast,
  VStack,
  Stack,
  Avatar,
} from "@chakra-ui/react";
import { ErrorMessage, Form, Formik } from "formik";
import NextLink from "next/link";
import { useRouter } from "next/router";
// import { isServer } from "../../utils/isServer";
import React from "react";
import { BiBug } from "react-icons/bi";
import {
  useLogoutMutation,
  useMeQuery,
  useSubmitFeedbackMutation,
} from "../../generated/graphql";
import MintroLogo from "../svg/MintroLogo";
import { RiGroup2Fill, RiUserFill } from "react-icons/ri";

const BugButton = (
  <Flex
    alignItems="center"
    bgGradient="linear(to-tr, red.200, red.300)"
    rounded="full"
    // boxSize={11}
    h="9"
    w="9"
  >
    <Icon color="dark.500" margin="auto" as={BiBug} />
  </Flex>
);

interface NavBarProps {
  transparent?: boolean;
}

export const NavBar: React.FC<NavBarProps> = ({ transparent }) => {
  const [logout, { loading: logoutFetching }] = useLogoutMutation();
  const [submitFeedback] = useSubmitFeedbackMutation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const apolloClient = useApolloClient();

  const { data: me, loading } = useMeQuery();
  var profile_photo = me?.me?.profileImageUrl?.replace("mintro-webapp-images.s3.amazonaws.com/", "ik.imagekit.io/wzbi68mgpi3/");
  profile_photo += "?tr=w-50,h-50";
  let userPane = null;
  const toast = useToast();

  if (loading) {
  } else if (!me?.me) {
    userPane = (
      <>
        <NextLink href="/login">
          <Button
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
          <MenuButton role="group">
            <VStack spacing={-1}>
              <Avatar
                boxSize={9}
                mb={2}
                bg="gray.300"
                size="xl"
                src={profile_photo ? profile_photo : undefined}
              />

              <Text
                fontSize="xs"
                pl={1}
                fontWeight={600}
                color={"dark.500"}
                _groupHover={{ color: "dark.300" }}
              >
                You
                <ChevronDownIcon />
              </Text>
            </VStack>
          </MenuButton>

          <MenuList py={0} minW="-moz-min-content">
            {/* <NextLink href={"/m/[user]"} as={"/m/" + me?.me.username}>
              <MenuItem
                display={{ base: "inline", sm: "none", md: "inline" }}
                _hover={{ bg: "mintro.25" }}
              >
                My Mintro
              </MenuItem>
            </NextLink>
            <NextLink href={"/groups"} as={"/groups"}>
              <MenuItem _hover={{ bg: "mintro.25" }}>Groups</MenuItem>
            </NextLink> */}
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
              <MintroLogo width="40" height="40" />
            </Link>
          </NextLink>

          <HStack
            pl={{ base: "4", md: "8" }}
            as={"nav"}
            spacing={4}
            // display={{ md: "flex" }}
            direction="column"
          >
            {me?.me && (
              <>
                <NextLink href={"/m/[user]"} as={"/m/" + me?.me.username}>
                  <Link
                    color={
                      router.asPath == "/m/" + me?.me.username
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
                          router.asPath == "/m/" + me?.me.username
                            ? "mintro.300"
                            : "dark.400"
                        }
                        boxSize="5"
                        alignSelf={"center"}
                        as={RiUserFill}
                      />
                      <Text pl={0}>{"My Mintro"}</Text>
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
                      <Text pl={0}>{"Groups"}</Text>
                    </Stack>
                  </Link>
                </NextLink>
              </>
            )}
          </HStack>

          <Spacer />
          <HStack>{userPane}</HStack>
          <Tooltip
            label="Report Bug"
            colorScheme="red"
            placement="bottom"
            aria-label="Report Bug"
          >
            <IconButton
              alignSelf={me?.me ? "self-start" : undefined}
              pt={me?.me ? 1.5 : undefined}
              _hover={{ opacity: "75%" }}
              variant="unstyled"
              aria-label="Report Bug"
              onClick={onOpen}
              icon={BugButton}
            />
          </Tooltip>
        </HStack>
      </Flex>
      <Formik
        initialValues={{ feedback: "" }}
        onSubmit={async (values, { setErrors, resetForm }) => {
          const { data: feedbackData } = await submitFeedback({
            variables: {
              feedback: values.feedback,
            },
          });
          if (feedbackData?.submitFeedback.errors) {
            setErrors({ feedback: "Please enter some feedback!" });
          } else {
            onClose();
            toast({
              title: "Thank you!",
              status: "success",
              duration: 3000,
              isClosable: true,
            });
            resetForm();
          }
        }}
      >
        {({ setFieldValue, submitForm, values, errors }) => (
          <Form>
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Feedback</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Text pb={2}>Bug or Feedback:</Text>
                  <Textarea
                    id="feedback"
                    name="feedback"
                    type="feedback"
                    onChange={async (e) => {
                      setFieldValue("feedback", e.target.value);
                    }}
                  />

                  <ErrorMessage name="feedback">
                    {(msg) => (
                      <Text pt={2} color="red.200">
                        {msg}
                      </Text>
                    )}
                  </ErrorMessage>
                </ModalBody>
                <ModalFooter>
                  <Button
                    type="submit"
                    onClick={submitForm}
                    variant="mintro"
                    mr={3}
                  >
                    Submit
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default NavBar;
