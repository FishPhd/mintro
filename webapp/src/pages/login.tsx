import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../components/forms/InputField";
import Card from "../components/general/Card";
import { NavBar } from "../components/page/NavBar";
import {
  LoginMutation,
  MeDocument,
  MeQuery,
  useLoginMutation,
} from "../graphql/generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { usingApollo } from "../utils/withApollo";

export const Login: React.FC = ({}) => {
  const router = useRouter();
  const [login] = useLoginMutation();
  return (
    <>
      <Head>
        <title>Login | Mintro</title>
      </Head>
      <NavBar />
      <Box
        bg={useColorModeValue("gray.50", "inherit")}
        minH="100vh"
        py="12"
        px={{ base: "4", lg: "8" }}
      >
        <Box maxW="md" mx="auto">
          <Heading textAlign="center" size="xl" fontWeight="extrabold">
            Good to see you!
          </Heading>
          <Text mt="4" mb="8" align="center" maxW="md" fontWeight="medium">
            <Text as="span">Don&apos;t have a Mintro?</Text>
            <NextLink href="register">
              <Link ml={2} color="mintro.400">
                Register
              </Link>
            </NextLink>
          </Text>

          <Card>
            <Formik
              initialValues={{ usernameOrEmail: "", password: "" }}
              onSubmit={async (values, { setErrors }) => {
                //TODO: Update to server side
                values.usernameOrEmail = values.usernameOrEmail.toLowerCase();
                const { data: response } = (await login({
                  variables: values,
                  update: (cache, { data }) => {
                    cache.writeQuery<MeQuery>({
                      query: MeDocument,
                      data: {
                        __typename: "Query",
                        me: data?.login.user,
                      },
                    });
                    cache.evict({ fieldName: "getSectionsByUser" });
                  },
                })) as {
                  data: LoginMutation;
                };
                if (response.login.errors) {
                  setErrors(toErrorMap(response.login.errors));
                } else if (response.login.user) {
                  if (typeof router.query.redirect === "string") {
                    router.push(router.query.redirect);
                  } else {
                    router.push("/m/" + response.login.user.username);
                  }
                }
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Stack spacing="4">
                    <Input
                      as={InputField}
                      focusBorderColor="mintro.400"
                      name="usernameOrEmail"
                      placeholder="username"
                      label="Username/Email"
                    ></Input>
                    <Input
                      as={InputField}
                      focusBorderColor="mintro.400"
                      name="password"
                      label="Password"
                      placeholder="password"
                      type="password"
                    ></Input>
                    <Flex>
                      <NextLink href="/forgot-password">
                        <Link ml="auto" color="mintro.400">
                          Forgot Password?
                        </Link>
                      </NextLink>
                    </Flex>
                    <Button
                      type="submit"
                      color="white"
                      variant="mintro"
                      isLoading={isSubmitting}
                      size="lg"
                    >
                      Login
                    </Button>
                  </Stack>
                </Form>
              )}
            </Formik>
          </Card>
        </Box>
      </Box>
    </>
  );
};

export default usingApollo({ ssr: false })(Login);
