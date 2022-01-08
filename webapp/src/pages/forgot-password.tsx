import {
  Box,
  Button,
  Heading,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import NextLink from "next/link";
import React, { useState } from "react";
import * as Yup from "yup";
import { InputField } from "../components/forms/InputField";
import Card from "../components/general/Card";
import NavBar from "../components/page/NavBar";
import { usingApollo } from "../utils/withApollo";

const forgotPasswordValidation = Yup.object().shape({
  identifier: Yup.string().required(
    "You need to provide an account identifier!"
  ),
});

export const ForgotPassword: React.FC = ({}) => {
  const [complete, setComplete] = useState(false);

  return (
    <>
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
              initialValues={{ identifier: "" }}
              validationSchema={forgotPasswordValidation}
              onSubmit={async (values, { validateForm }) => {
                // await forgotPassword({ variables: { email: values.email } });
                const supportEmail = "sam@mintro.page";
                const ccEmail = "aaron@mintro.page";
                const subject = "I Forgot My Mintro Password!";
                const body = `My identifier is:  '${values.identifier}'`;
                validateForm();
                window.open(
                  `mailto:${supportEmail}?cc=${ccEmail}&subject=${
                    encodeURIComponent(subject) || ""
                  }&body=${encodeURIComponent(body) || ""}`
                );

                setComplete(true);
              }}
            >
              {({ isSubmitting }) =>
                complete ? (
                  <Box>
                    <Heading pb={5}>Success!</Heading>
                    Thank you for reaching out! If you have an account your
                    password will be reset shortly! (We are still setting up our
                    email server so thank you for your patience!)
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
                        colorScheme="mintro"
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
