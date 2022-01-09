import {
  Box,
  Button,
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
import * as Yup from "yup";
import { InputField } from "../components/forms/InputField";
import Card from "../components/general/Card";
import { NavBar } from "../components/page/NavBar";
import {
  MeDocument,
  MeQuery,
  RegisterMutation,
  useRegisterMutation,
} from "../graphql/generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { usingApollo } from "../utils/withApollo";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const RegisterSchema = Yup.object().shape({
  username: Yup.string().required("Required"),
  email: Yup.string().required("Required").email(),
  phoneNumber: Yup.string()
    .required("Required")
    .matches(phoneRegExp, "Phone number is not valid"),
  password: Yup.string().required("Required"),

  // passwordConfirm: Yup.string()
  //   .oneOf([Yup.ref("password")], "Password does not match")
  //   .required("Required"),
});

export const Register: React.FC = () => {
  const router = useRouter();
  const [register] = useRegisterMutation();
  return (
    <>
      <Head>
        <title>Register | Mintro</title>
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
            Join Mintro!
          </Heading>
          <Text pt={2} mb="8" align="center" maxW="md" fontWeight="medium">
            <Text as="span">Have an account?</Text>
            <NextLink href="login">
              <Link ml={2} color="mintro.400">
                Login
              </Link>
            </NextLink>
          </Text>

          <Card>
            <Formik
              initialValues={{
                username: "",
                password: "",
                phoneNumber: "",
                email: "",
              }}
              validateOnChange={false}
              validateOnBlur={false}
              validationSchema={RegisterSchema}
              onSubmit={async (values, { setErrors, validateForm }) => {
                values.username = values.username.toLowerCase();
                values.email = values.email.toLowerCase();
                validateForm();
                const { data: response } = (await register({
                  variables: {
                    input: values,
                  },
                  update: (cache, { data }) => {
                    cache.writeQuery<MeQuery>({
                      query: MeDocument,
                      data: {
                        __typename: "Query",
                        me: data?.register.user,
                      },
                    });
                  },
                })) as {
                  data: RegisterMutation;
                };

                if (response.register.errors) {
                  setErrors(toErrorMap(response.register.errors));
                } else if (response?.register.user) {
                  router.push("/m/" + response.register.user.username);
                }
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Stack spacing="2" mb={5}>
                    <Input
                      as={InputField}
                      focusBorderColor="mintro.400"
                      name="username"
                      label="Username"
                      errorBorderColor="red.200"
                      placeholder="username"
                    ></Input>
                    <Input
                      as={InputField}
                      name="email"
                      type="email"
                      label="Email"
                      focusBorderColor="mintro.400"
                      errorBorderColor="red.200"
                      placeholder="email"
                    ></Input>
                    <Input
                      as={InputField}
                      name="phoneNumber"
                      type="phone"
                      label="Phone Number"
                      focusBorderColor="mintro.400"
                      errorBorderColor="red.200"
                      placeholder="phone number"
                    ></Input>

                    <Input
                      as={InputField}
                      name="password"
                      label="Password"
                      type="password"
                      placeholder="password"
                      focusBorderColor="mintro.400"
                      errorBorderColor="red.200"
                    ></Input>
                  </Stack>
                  <Button
                    type="submit"
                    variant="mintro"
                    color="white"
                    isLoading={isSubmitting}
                    isFullWidth
                  >
                    Register
                  </Button>
                </Form>
              )}
            </Formik>
          </Card>
        </Box>
      </Box>
    </>
  );
};

export default usingApollo({ ssr: false })(Register);
