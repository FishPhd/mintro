import {
  Box,
  Button,
  Flex,
  Icon,
  IconProps,
  Input,
  Link,
  Spacer,
  Stack,
  Text,
  useToast,
  Wrap,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { Form, Formik } from "formik";
import { AnimatePresence, motion } from "framer-motion";
import * as Icons from "react-icons/fa";
import { IconType } from "react-icons/lib";
import {
  ContactType,
  useAddContactMutation,
  useContactTypesQuery,
  User,
  UserContact,
  useUserContactsQuery,
} from "../../graphql/generated/graphql";
import { InputField } from "../forms/InputField";
import Card from "../general/Card";
import { useState } from "react";

interface InitialValueDict {
  [index: string]: { id: number; input: string };
}

const contactValidationType = {
  Phone: "number",
  Email: "email",
  WhatsApp: "number",
};

/* Your icon name from database data can now be passed as prop */
const DynamicFaIcon: React.FC<IconProps> = ({ name, ...props }) => {
  if (!name) {
    // Return a default one
    return <Icon {...props} as={Icons.FaBeer} />;
  }

  const iconType = {};
  const IconComponent: IconType = Icons[name as keyof typeof iconType];
  if (!IconComponent) {
    // Return a default one
    return <Icon {...props} as={Icons.FaBeer} />;
  }

  return <Icon {...props} as={IconComponent} />;
};

interface ContactCardProps {
  user?: User;
  isMyProfile: boolean;
}

export const ContactCard: React.FC<ContactCardProps> = ({
  user,
  isMyProfile,
}) => {
  const initialValues = {} as InitialValueDict;
  const toast = useToast();
  const [addContact] = useAddContactMutation();
  const [touched, setTouched] = useState<number[]>([]);
  const [showSaveButton, setshowSaveButton] = useState(false);

  const { data: { contactTypes: contactTypes } = {} } = useContactTypesQuery();
  const { data: { userContacts: userContactsData } = {} } =
    useUserContactsQuery({
      variables: { userId: user ? user.id : -1 },
    });

  const userContacts = userContactsData?.filter(
    (uc: UserContact) => !uc.contactType.socialMedia
  );

  const userSocials = userContactsData?.filter(
    (uc: UserContact) => uc.contactType.socialMedia
  );

  for (const type of contactTypes || []) {
    const userInput = userContactsData?.find(
      (i) => i.contactTypeId == type.id
    )?.input;
    initialValues[type.name] = { id: type.id, input: userInput || "" };
  }

  return (
    <AnimatePresence presenceAffectsLayout>
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.75 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.75 }}
      >
        <Card>
          {!isMyProfile ? (
            <Box>
              {userContacts?.length == 0 && userSocials?.length == 0 && (
                <Text
                  fontWeight="800"
                  color="dark.500"
                  textAlign={"center"}
                  fontSize={{ base: "2xl", md: "2xl", lg: "3xl" }}
                >
                  User has no contact info!
                </Text>
              )}
              {userContacts?.length != 0 && (
                <Text
                  fontWeight="800"
                  color="dark.500"
                  fontSize={{ base: "4xl", md: "4xl", lg: "5xl" }}
                >
                  Contact
                </Text>
              )}
              <Wrap justify="center" maxW={"2xl"}>
                {userContacts?.map((uc, index) => (
                  <>
                    <NextLink
                      passHref
                      href={
                        uc?.contactType.url && uc.contactType.url && uc.input
                          ? uc?.contactType.url +
                            uc.contactType?.profileUrlTemplate +
                            uc.input
                          : uc.contactType.url
                          ? uc.contactType.url && uc.input
                          : ""
                      }
                    >
                      <Link _hover={{ opacity: "75%" }}>
                        <Button
                          key={`userContact.${index}`}
                          size="md"
                          variant="ghost"
                          _hover={{ opacity: "60%" }}
                          leftIcon={
                            <>
                              <svg width="0" height="0">
                                <linearGradient
                                  id="instagram"
                                  x1="100%"
                                  y1="100%"
                                >
                                  <stop stopColor="#7a6ded" offset="0%" />
                                  <stop stopColor="#591885" offset="100%" />
                                </linearGradient>
                              </svg>
                              <DynamicFaIcon
                                boxSize={"7"}
                                color={
                                  uc.contactType.color1
                                    ? uc.contactType.color1
                                    : undefined
                                }
                                name={uc.contactType.icon}
                              />
                            </>
                          }
                        >
                          <Text
                            color={"black"}
                            fontWeight="extrabold"
                            fontSize={"md"}
                          >
                            {uc.input}
                          </Text>
                        </Button>
                      </Link>
                    </NextLink>
                  </>
                ))}
              </Wrap>
              {userSocials?.length != 0 && (
                <Text
                  pt={2}
                  fontWeight="800"
                  color="dark.500"
                  fontSize={{ base: "4xl", md: "2xl", lg: "5xl" }}
                >
                  Socials
                </Text>
              )}
              <Wrap justify="center" maxW={"2xl"}>
                {userSocials?.map((us, index) => (
                  <>
                    <NextLink
                      passHref
                      href={
                        us?.contactType.url && us.contactType.url && us.input
                          ? us?.contactType.url +
                            us.contactType?.profileUrlTemplate +
                            us.input
                          : ""
                      }
                    >
                      <Link _hover={{ opacity: "75%" }}>
                        <Button
                          key={`userSocial.${index}`}
                          size="md"
                          variant="ghost"
                          _hover={{ opacity: "60%" }}
                          leftIcon={
                            <>
                              <DynamicFaIcon
                                boxSize={"8"}
                                color={
                                  us.contactType.color1
                                    ? us.contactType.color1
                                    : undefined
                                }
                                strokeWidth={
                                  us.contactType.name == "Snapchat"
                                    ? "10px"
                                    : undefined
                                }
                                stroke="black"
                                name={us.contactType.icon}
                              />
                            </>
                          }
                        >
                          <Text
                            color={"black"}
                            fontWeight="extrabold"
                            fontSize={"sm"}
                          >
                            {us.input}
                          </Text>
                        </Button>
                      </Link>
                    </NextLink>
                  </>
                ))}
              </Wrap>
            </Box>
          ) : (
            <Formik
              enableReinitialize={true}
              initialValues={initialValues}
              onSubmit={async (values, { setFieldError }) => {
                for (const value in values || []) {
                  if (touched.includes(values[value].id)) {
                    const { data: response } = await addContact({
                      variables: {
                        typeId: values[value].id,
                        input: values[value].input,
                      },
                    });

                    if (response?.addContact.errors) {
                      const errorMsgArr = response?.addContact.errors[0];
                      const errorMsg = errorMsgArr.message
                        ? errorMsgArr.message[0]
                        : "";
                      setFieldError(errorMsgArr.field, errorMsg);
                      return;
                    }
                  }
                }
                await addContact({
                  variables: {
                    typeId: -1,
                    input: "",
                  },
                  update: (cache) => {
                    cache.evict({ fieldName: "userContacts" });
                  },
                });
                setTouched([]);
                setshowSaveButton(false);
                toast({
                  title: "Updated!",
                  status: "success",
                  duration: 2000,
                  isClosable: true,
                });
              }}
            >
              {({ values, setFieldValue, isSubmitting }) => (
                <Form>
                  <Text
                    fontWeight="800"
                    color="dark.500"
                    fontSize={{ base: "4xl", md: "4xl", lg: "5xl" }}
                  >
                    Contact
                  </Text>
                  <Stack maxW="sm" mx={"auto"}>
                    {contactTypes &&
                      contactTypes.length > 0 &&
                      contactTypes
                        ?.filter((ct: ContactType) => !ct.socialMedia)
                        .map((contactType, index) => (
                          <Stack
                            alignItems={"center"}
                            direction={"row"}
                            spacing={2}
                            key={index}
                          >
                            <DynamicFaIcon
                              mr={2}
                              boxSize={"5"}
                              color={
                                contactType.color1
                                  ? contactType.color1
                                  : undefined
                              }
                              name={contactType.icon}
                            />
                            {contactType.prefix != "" && (
                              <Text color="dark.500" pl={2} fontWeight={"bold"}>
                                {contactType.prefix}
                              </Text>
                            )}
                            <Input
                              as={InputField}
                              focusBorderColor="mintro.300"
                              name={`${contactType.name}`}
                              value={values[contactType.name]?.input || ""}
                              variant="outline"
                              bg="white"
                              type={
                                contactValidationType[
                                  contactType.name as keyof typeof contactValidationType
                                ] || ""
                              }
                              placeholder={contactType.placeholder}
                              errorBorderColor="red.200"
                              onChange={async (e) => {
                                setshowSaveButton(true);
                                setTouched((touched) => [
                                  ...touched,
                                  contactType.id,
                                ]);
                                setFieldValue(contactType.name, {
                                  id: contactType.id,
                                  input: e.target.value,
                                });
                              }}
                            />
                          </Stack>
                        ))}
                  </Stack>
                  <Text
                    fontWeight="800"
                    color="dark.500"
                    fontSize={{ base: "4xl", md: "4xl", lg: "5xl" }}
                    pt={5}
                  >
                    Social
                  </Text>
                  <Stack maxW="sm" mx={"auto"}>
                    {contactTypes &&
                      contactTypes.length > 0 &&
                      contactTypes
                        ?.filter((ct: ContactType) => ct.socialMedia)
                        .map((contactType, index) => (
                          <Stack
                            alignItems={"center"}
                            direction={"row"}
                            spacing={2}
                            key={index}
                          >
                            <DynamicFaIcon
                              mr={2}
                              boxSize={"5"}
                              color={
                                contactType.color1
                                  ? contactType.color1
                                  : undefined
                              }
                              strokeWidth={
                                contactType.name == "Snapchat"
                                  ? "10px"
                                  : undefined
                              }
                              stroke="black"
                              name={contactType.icon}
                            />
                            {contactType.prefix != "" && (
                              <Text color="dark.500" pl={2} fontWeight={"bold"}>
                                {contactType.prefix}
                              </Text>
                            )}
                            <Input
                              as={InputField}
                              focusBorderColor="mintro.300"
                              name={`${contactType.name}`}
                              value={values[contactType.name]?.input || ""}
                              variant="outline"
                              bg="white"
                              placeholder={contactType.placeholder}
                              errorBorderColor="red.200"
                              onChange={async (e) => {
                                setshowSaveButton(true);
                                setTouched((touched) => [
                                  ...touched,
                                  contactType.id,
                                ]);
                                setFieldValue(contactType.name, {
                                  id: contactType.id,
                                  input: e.target.value,
                                });
                              }}
                            />
                          </Stack>
                        ))}
                  </Stack>
                  <Flex pt={5}>
                    <Spacer />
                    <Button
                      visibility={showSaveButton ? "visible" : "collapse"}
                      position={showSaveButton ? "unset" : "absolute"}
                      isLoading={isSubmitting}
                      variant="mintro"
                      type="submit"
                    >
                      Save
                    </Button>
                  </Flex>
                </Form>
              )}
            </Formik>
          )}
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};

export default ContactCard;
