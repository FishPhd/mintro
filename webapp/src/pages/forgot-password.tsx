import {
  Box,
  Button,
  Heading,
  Link,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import Head from "next/head";
import NextLink from "next/link";
import React, { useState } from "react";
import * as Yup from "yup";
import { InputField } from "../components/forms/InputField";
import Card from "../components/general/Card";
import NavBar from "../components/page/NavBar";
import { useForgotPasswordMutation } from "../graphql/generated/graphql";
import { usingApollo } from "../utils/withApollo";

const forgotPasswordValidation = Yup.object().shape({
  identifier: Yup.string().required(
    "You need to provide an account identifier!"
  ),
});

export const ForgotPassword: React.FC = ({}) => {
  const [complete, setComplete] = useState(false);
  const [forgotPassword] = useForgotPasswordMutation();
  const toast = useToast();
  return (
    <>
      <Head>
        <title>Forgot Password | Mintro</title>
      </Head>
      <NavBar />

      <Box
        bg={useColorModeValue("gray.50", "inherit")}
        minH="100vh"
        py="12"
        px={{ base: "4", lg: "8" }}
      >
        <Box maxW={"lg"} mx="auto">
          <Heading textAlign="center" size="xl" fontWeight="extrabold">
            Forgot your password?
          </Heading>
          <Text pt={2} mb="8" align="center" fontWeight="medium">
            <Text as="span">Don&apos;t have an account?</Text>
            <NextLink href="register">
              <Link ml={2} color="mintro.500">
                Register
              </Link>
            </NextLink>
          </Text>

          <Card>
            <Formik
              initialValues={{ identifier: "" }}
              validationSchema={forgotPasswordValidation}
              onSubmit={async (values) => {
                await forgotPassword({
                  variables: { identifier: values.identifier },
                });
                toast({
                  title: "Password reset Received!",
                  description: "You should receive an email shortly",
                  status: "success",
                  duration: 9000,
                  isClosable: true,
                });
                setComplete(true);
              }}
            >
              {({ isSubmitting }) =>
                complete ? (
                  <Box>
                    <Heading pb={5}>Success!</Heading>
                    If we find an account linked to your information you will
                    get an email from us! Check your spam!
                  </Box>
                ) : (
                  <Form>
                    <Stack spacing="4">
                      <InputField
                        name="identifier"
                        placeholder="Email, Username or Phone Number"
                        label="Account Information"
                      ></InputField>
                      <Button
                        type="submit"
                        variant={"mintro"}
                        isLoading={isSubmitting}
                        size="lg"
                        fontSize="md"
                      >
                        Forgot my password
                      </Button>
                    </Stack>
                  </Form>
                )
              }
            </Formik>
          </Card>
        </Box>
      </Box>
    </>
  );
};

export default usingApollo({ ssr: false })(ForgotPassword);
