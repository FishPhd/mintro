import {
  Box,
  Button,
  Flex,
  FormLabel,
  Icon,
  IconButton,
  Input,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { BiChevronLeft } from "react-icons/bi";
import * as Yup from "yup";
import {
  useCountriesQuery,
  useGetCitiesFromStateQuery,
  useGetStatesFromCountryQuery,
  User,
  useSetupProfileMutation,
} from "../../generated/graphql";
import { toErrorMap } from "../../utils/toErrorMap";
import { InputField } from "../forms/InputField";
import { SelectField } from "../forms/SelectField";
import { UploadForm } from "../forms/UploadForm";

interface UserProfileSetupProps {
  user?: User;
  isOpen: boolean;
  onClose: () => void;
}

const pronouns = [
  "he/him/his",
  "she/her/hers",
  "per/per/pers",
  "they/them/their",
  "xe/xem/xyrs",
];

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const SetupProfileSchemaPage1 = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  nickname: Yup.string().min(2, "Too Short!").max(50, "Too Long!"),
  namePronunciation: Yup.string().min(2, "Too Short!").max(50, "Too Long!"),
  pronouns: Yup.string()
    .required(
      "Please select a pronoun, if you feel that you are missing please reach out to 'hello@mintro.page'"
    )
    .oneOf(pronouns),
  country: Yup.string().required("Please select a Country!"),
  state: Yup.string().required("Please select a State"),
  city: Yup.string().required("Please select a City"),
});

const SetupProfileSchemaPage2 = Yup.object().shape({
  tagline: Yup.string().required(
    "Come on you are amazing, now give yourself an amazing tagline!"
  ),
  homeTown: Yup.string().required(
    "People want to know where you are from, maybe you will meet some long lost friends!"
  ),
});

// Do this on the server end
export function upperCase(string: String) {
  return string[0].toUpperCase() + string.slice(1);
}

export function titleCase(string: String) {
  return string[0].toUpperCase() + string.slice(1).toLowerCase();
}

const initialValues = {
  firstName: "",
  lastName: "",
  nickname: "",
  namePronunciation: "",
  tagline: "",
  homeTown: "",
  pronouns: "",
  city: "Seattle",
  state: "Washington",
  country: "United States",
  birthday: new Date().toISOString(),
};

export const UserProfileSetup: React.FC<UserProfileSetupProps> = ({
  user,
  isOpen,
  onClose,
}) => {
  let userBirthday = user?.birthday
    ? new Date(user?.birthday.toString())
    : undefined;
  const [birthdayMonth, setBirthdayMonth] = useState(
    userBirthday ? userBirthday.getUTCMonth() : 0
  );
  const [birthdayYear, setbirthdayYear] = useState(
    userBirthday && userBirthday.getUTCFullYear()
  );
  const [birthdayDay, setbirthdayDay] = useState(
    userBirthday && userBirthday.getUTCDate()
  );

  let userValues = user
    ? {
        firstName: user.firstName,
        lastName: user.lastName,
        nickname: user.nickname ? user.nickname : "",
        namePronunciation: user.namePronunciation ? user.namePronunciation : "",
        tagline: user.tagline,
        homeTown: user.homeTown,
        pronouns: user.pronouns,
        city: user.city,
        state: user.state,
        country: user.country,
        birthday: user.birthday,
      }
    : initialValues;

  const [hideCities, setHideCities] = useState(false);
  const [formPage, setFormPage] = useState(1);
  const [setupProfile] = useSetupProfileMutation();
  const { data: countryData } = useCountriesQuery();

  let {
    data: stateData,
    refetch: refetchStates,
    loading: loadingStates,
  } = useGetStatesFromCountryQuery({
    variables: {
      countryId: 233, // USA code
    },
  });

  let {
    data: cityData,
    refetch: refetchCities,
    loading: loadingCities,
  } = useGetCitiesFromStateQuery({
    variables: {
      stateId: 1462, // Washington code
    },
  });

  const countries = countryData?.countries;
  let states = stateData?.getStatesFromCountry;
  let cities = cityData?.getCitiesFromState;

  return (
    <Box px={20}>
      <Modal
        closeOnEsc={user ? true : false}
        closeOnOverlayClick={user ? true : false}
        isOpen={isOpen}
        onClose={async () => {
          setFormPage(1);
          onClose();
        }}
        size="2xl"
        motionPreset="slideInBottom"
        isCentered={true}
      >
        <ModalOverlay />
        <ModalContent>
          {formPage > 1 && (
            <IconButton
              variant="unstyled"
              aria-label="Search database"
              color="dark.500"
              _hover={{ color: "mintro.400" }}
              onClick={async () => {
                setFormPage(formPage - 1);
              }}
              icon={
                <>
                  <Stack pl={5} pt={5} direction={"row"} spacing={0}>
                    <Icon as={BiChevronLeft} />
                    <Text fontSize={"xs"}>Back</Text>
                  </Stack>
                </>
              }
            />
          )}
          <ModalHeader
            textAlign="center"
            p={formPage > 1 ? 0 : undefined}
            fontSize="3xl"
          >
            {formPage == 1
              ? user
                ? "Edit your profile!"
                : "Get Started with Mintro!"
              : user
              ? "Edit your profile!"
              : "Let others get to know you!"}
          </ModalHeader>
          <Box px={5}>
            <Formik
              validationSchema={
                formPage == 1
                  ? SetupProfileSchemaPage1
                  : SetupProfileSchemaPage2
              }
              validateOnBlur={false}
              validateOnChange={false}
              initialValues={user ? userValues : initialValues}
              onSubmit={async (values, { setErrors, validateForm }) => {
                const birthday = new Date(
                  birthdayYear as number,
                  birthdayMonth as number,
                  birthdayDay as number
                );
                values.birthday = birthday.toISOString();
                validateForm();
                const { data: setupData } = await setupProfile({
                  variables: {
                    input: values,
                  },
                  update: (cache) => {
                    cache.evict({ fieldName: "setupProfile" });
                    cache.evict({ fieldName: "getUser" });
                  },
                });
                if (setupData?.setupProfile?.errors) {
                  setErrors(toErrorMap(setupData.setupProfile.errors));
                }

                onClose();
              }}
            >
              {({ isSubmitting, setFieldValue, values, validateForm }) => (
                <Form>
                  <Stack spacing="6">
                    {formPage == 1 ? (
                      <>
                        <Box>
                          <Text pb={2} fontWeight="semibold">
                            Profile Image
                          </Text>
                          <UploadForm folder="profiles" />
                        </Box>

                        <Flex>
                          <Input
                            as={InputField}
                            focusBorderColor="mintro.400"
                            name="firstName"
                            label="First Name"
                            w="95%"
                          />
                          <Input
                            as={InputField}
                            name="lastName"
                            label="Last Name"
                            focusBorderColor="mintro.400"
                            w="95%"
                          />
                        </Flex>
                        <Flex>
                          <Input
                            as={InputField}
                            name="nickname"
                            label="I go by..."
                            focusBorderColor="mintro.400"
                            helperText="optional"
                            w="95%"
                          ></Input>

                          <Input
                            as={InputField}
                            name="namePronunciation"
                            label="My name is pronounced..."
                            focusBorderColor="mintro.400"
                            helperText="optional"
                            w="95%"
                          ></Input>
                        </Flex>
                        <Select
                          label="Pronouns"
                          name="pronouns"
                          as={SelectField}
                          placeholder="Select pronouns..."
                          focusBorderColor="mintro.400"
                          icon={<></>}
                          onChange={async (e) => {
                            await setFieldValue("pronouns", e.target.value);
                          }}
                        >
                          {pronouns.map((pronoun, index) => (
                            <option key={index} value={pronoun}>
                              {pronoun}
                            </option>
                          ))}
                        </Select>
                        <Flex>
                          <Select
                            label="Country"
                            name="country"
                            as={SelectField}
                            focusBorderColor="mintro.400"
                            icon={<></>}
                            mx="1"
                            onChange={async (e) => {
                              let country = countries?.find(
                                (item) => item.name == e.target.value
                              );
                              await setFieldValue("country", country?.name);
                              await refetchStates({
                                countryId: country?.id,
                              });

                              await setFieldValue("state", "");
                              await setFieldValue("city", "");
                              setHideCities(true);
                            }}
                          >
                            {countries?.map((country, index: number) => (
                              <option key={country.id} value={country.name}>
                                {country.emoji + " " + country.name}
                              </option>
                            ))}
                          </Select>

                          {states?.length != 0 && (
                            <Select
                              as={SelectField}
                              name="state"
                              label="State"
                              mx="1"
                              placeholder="Select state..."
                              focusBorderColor="mintro.400"
                              isLoading={loadingStates}
                              // autoComplete="none"
                              icon={<></>}
                              onChange={async (e) => {
                                if (e.target.value) {
                                  let state = states?.find(
                                    (item) => item.name == e.target.value
                                  );
                                  await setFieldValue("state", state?.name);
                                  await refetchCities({
                                    stateId: state?.id,
                                  });
                                  setHideCities(false);
                                } else {
                                  await setFieldValue("state", undefined);
                                  setHideCities(true);
                                }
                              }}
                            >
                              {states?.map((state, index: number) => (
                                <option key={state.id} value={state.name}>
                                  {state.name}
                                </option>
                              ))}
                            </Select>
                          )}

                          {!hideCities && (
                            <Select
                              as={SelectField}
                              name="city"
                              label="City"
                              mx="1"
                              w="75%"
                              focusBorderColor="mintro.400"
                              isLoading={loadingCities}
                              placeholder="Select city..."
                              icon={<></>}
                              // autoComplete="none"
                              onChange={async (e) => {
                                if (e.target.value) {
                                  let city = cities?.find(
                                    (item) => item.name == e.target.value
                                  );
                                  // let cityId = parseInt(e.target.value);
                                  await setFieldValue("city", city?.name);
                                } else {
                                  await setFieldValue("city", undefined);
                                }
                              }}
                            >
                              {cities?.map((city, index: number) => (
                                <option key={city.id} value={city.name}>
                                  {city.name}
                                </option>
                              ))}
                            </Select>
                          )}
                        </Flex>
                      </>
                    ) : (
                      <>
                        <Input
                          as={InputField}
                          name="tagline"
                          label="Tagline"
                          focusBorderColor="mintro.400"
                          helperText="Your mantra, a brief quote, your job... up to you!"
                          w="95%"
                        ></Input>
                        <Input
                          as={InputField}
                          name="homeTown"
                          label="Home Town"
                          focusBorderColor="mintro.400"
                          helperText="Name of city where you are from!"
                          w="95%"
                        ></Input>
                        <Box>
                          <FormLabel mb={0}>Birthday</FormLabel>
                          <Text mb={2} color="gray.500" fontSize="sm">
                            Age is not shared!
                          </Text>
                          <Flex>
                            <Select
                              // as={SelectField}
                              name="birthdayMonth"
                              type="number"
                              defaultValue={birthdayMonth}
                              min={1}
                              max={12}
                              required
                              mx="1"
                              w="75%"
                              onChange={async (e) => {
                                if (e.target.value) {
                                  setBirthdayMonth(parseInt(e.target.value));
                                }
                              }}
                            >
                              {months.map((month, index) => {
                                return (
                                  <option
                                    key={month}
                                    disabled={!month}
                                    value={index}
                                    hidden={!month}
                                  >
                                    {month}
                                  </option>
                                );
                              })}
                            </Select>
                            <Input
                              px={2}
                              placeholder="Day"
                              name="birthdayDay"
                              type="number"
                              min={1}
                              max={31}
                              required
                              mx="1"
                              w="75%"
                              defaultValue={
                                birthdayDay === 0 ? "" : birthdayDay
                              }
                              onChange={async (e) => {
                                if (e.target.value) {
                                  setbirthdayDay(parseInt(e.target.value));
                                }
                              }}
                            />
                            <Input
                              placeholder="Year"
                              name="birthdayYear"
                              min={1900}
                              required
                              mx="1"
                              w="75%"
                              max={new Date().getFullYear()}
                              defaultValue={
                                birthdayYear === 0 ? "" : birthdayYear
                              }
                              type="number"
                              onChange={async (e) => {
                                if (e.target.value) {
                                  setbirthdayYear(parseInt(e.target.value));
                                }
                              }}
                            />
                          </Flex>
                        </Box>
                      </>
                    )}
                  </Stack>
                  <ModalFooter>
                    {formPage < 2 ? (
                      <Button
                        mt={4}
                        type="button"
                        variant="mintro"
                        key="next_page"
                        isFullWidth={true}
                        colorScheme="mintro"
                        onClick={async () => {
                          console.log("here");
                          const errors = await validateForm();
                          // If no validation errors on first page
                          if (Object.keys(errors).length === 0) {
                            setFormPage(formPage + 1);
                          }
                        }}
                      >
                        Next
                      </Button>
                    ) : (
                      <Button
                        mt={4}
                        type="submit"
                        key="submit"
                        colorScheme="mintro"
                        isLoading={isSubmitting}
                        isFullWidth={true}
                        fontSize="md"
                        variant="mintro"
                      >
                        Save
                      </Button>
                    )}
                  </ModalFooter>
                </Form>
              )}
            </Formik>
          </Box>
        </ModalContent>
      </Modal>
    </Box>
  );
};
