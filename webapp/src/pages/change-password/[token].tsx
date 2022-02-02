import {
  Box,
  Button,
  Heading,
  HStack,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { InputField } from "../../components/forms/InputField";
import Card from "../../components/general/Card";
import NavBar from "../../components/page/NavBar";
import {
  MeDocument,
  MeQuery,
  useChangePasswordMutation,
} from "../../graphql/generated/graphql";
import { toErrorMap } from "../../utils/toErrorMap";
import { usingApollo } from "../../utils/withApollo";

//TODO: Turn this into a proper "Change password" section that allows for users to change password when a user KNOWS their current password
export const ChangePassword: React.FC = () => {
  const [changePassword] = useChangePasswordMutation();
  const router = useRouter();
  const [tokenError, setTokenError] = useState<string[]>();
  return (
    <>
      <Head>
        <title>Change Password | Mintro</title>
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
            Forgot your password?
          </Heading>
          <Text pt={2} mb="8" align="center" maxW="md" fontWeight="medium">
            <Text as="span">Don&apos;t have an account?</Text>
            <NextLink href="register">
              <Link ml={2} color="mintro.500">
                Register
              </Link>
            </NextLink>
          </Text>

          <Card>
            <Formik
              initialValues={{ newPassword: "" }}
              onSubmit={async (values, { setErrors }) => {
                const { data } = await changePassword({
                  variables: {
                    newPassword: values.newPassword,
                    token:
                      typeof router.query.token === "string"
                        ? router.query.token
                        : "",
                  },
                  update: (cache, { data }) => {
                    cache.writeQuery<MeQuery>({
                      query: MeDocument,
                      data: {
                        __typename: "Query",
                        me: data?.changePassword.user,
                      },
                    });
                  },
                });
                if (data?.changePassword.errors) {
                  const errorMap = toErrorMap(data.changePassword.errors);
                  if ("token" in errorMap) {
                    setTokenError(errorMap.token);
                  }
                  setErrors(errorMap);
                } else if (data?.changePassword.user) {
                  router.push("/");
                }
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Stack spacing="4">
                    <InputField
                      name="newPassword"
                      placeholder="Password"
                      label="New Password"
                      type="password"
                    />
                    {tokenError ? (
                      <HStack>
                        <Box>
                          <Text color={"red.500"}>{tokenError}</Text>
                          <NextLink href="/forgot-password">
                            <Link color={"mintro.400"}>
                              Still need to reset password?
                            </Link>
                          </NextLink>
                        </Box>
                      </HStack>
                    ) : null}
                    <Button
                      type="submit"
                      variant="mintro"
                      isLoading={isSubmitting}
                      size="lg"
                      fontSize="md"
                    >
                      Change Password
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

export default usingApollo({ ssr: false })(ChangePassword);
