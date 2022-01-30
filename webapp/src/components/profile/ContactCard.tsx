import {
  Box,
  Button,
  Flex,
  Icon,
  IconProps,
  Input,
  Spacer,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
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

interface InitialValueDict {
  [index: string]: { id: number; input: string };
}

const contactValidationType = {
  Phone: "number",
  Email: "email",
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
  // const <div isSubmitting,="" setSub=""></div> = useState(false);
  const toast = useToast();
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
  const [addContact] = useAddContactMutation();
  const initialValues = {} as InitialValueDict;

  if (contactTypes) {
    for (const type of contactTypes) {
      const userInput = userContactsData?.find(
        (i) => i.contactTypeId == type.id
      )?.input;
      initialValues[type.name] = { id: type.id, input: userInput || "" };
    }
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
              <Text
                fontWeight="800"
                color="dark.500"
                fontSize={{ base: "4xl", md: "4xl", lg: "5xl" }}
              >
                Contact
              </Text>
              <Stack direction={"row"} pl={0} alignItems={"flex-start"}>
                {userContacts?.map((uc, index) => (
                  <>
                    <Button
                      key={`userContact.${index}`}
                      size="md"
                      variant="ghost"
                      colorScheme={"mintro"}
                      _hover={{ opacity: "60%" }}
                      leftIcon={
                        <>
                          <svg width="0" height="0">
                            <linearGradient id="instagram" x1="100%" y1="100%">
                              <stop stopColor="#7a6ded" offset="0%" />
                              <stop stopColor="#591885" offset="100%" />
                            </linearGradient>
                          </svg>
                          <DynamicFaIcon
                            boxSize={"5"}
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
                        // bgGradient="linear(to-l, #7a6ded, #591885)"
                        // bgClip="text"
                        color={"black"}
                        fontWeight="extrabold"
                        fontSize={"sm"}
                      >
                        {uc.input}
                      </Text>
                    </Button>
                  </>
                ))}

                {/* <Button
                  size="md"
                  variant="ghost"
                  colorScheme={"mintro"}
                  _hover={{ opacity: "60%" }}
                  leftIcon={
                    <>
                      {" "}
                      <svg width="0" height="0">
                        <linearGradient id="instagram" x1="100%" y1="100%">
                          <stop stopColor="#7a6ded" offset="0%" />
                          <stop stopColor="#591885" offset="100%" />
                        </linearGradient>
                      </svg>
                      <FaInstagram
                        size="20px"
                        style={{ fill: "url(#instagram)" }}
                      />{" "}
                    </>
                  }
                >
                  <Text
                    // bgGradient="linear(to-l, #7a6ded, #591885)"
                    // bgClip="text"
                    color={"black"}
                    fontWeight="extrabold"
                    fontSize={"sm"}
                  >
                    /u/user
                  </Text>
                </Button>
                <Button
                  size="md"
                  variant="ghost"
                  colorScheme={"mintro"}
                  _hover={{ opacity: "80%" }}
                  leftIcon={<FaTiktok size="20px" style={{ fill: "black" }} />}
                >
                  <Text
                    color={"dark.500"}
                    fontWeight="extrabold"
                    fontSize={"sm"}
                  >
                    /u/user
                  </Text>
                </Button>
                <Button
                  size="md"
                  variant="ghost"
                  colorScheme={"mintro"}
                  _hover={{ opacity: "60%" }}
                  leftIcon={
                    <>
                      <FaSnapchatGhost
                        size="20px"
                        stroke="black"
                        strokeWidth={"20px"}
                        fill="yellow"
                      />
                    </>
                  }
                >
                  <Text
                    bgClip="text"
                    color={"dark.500"}
                    fontWeight="extrabold"
                    fontSize={"sm"}
                  >
                    /u/user
                  </Text>
                </Button> */}
              </Stack>
              {userSocials?.length != 0 && (
                <Text
                  fontWeight="800"
                  color="dark.500"
                  fontSize={{ base: "4xl", md: "4xl", lg: "5xl" }}
                >
                  Social
                </Text>
              )}
              {userSocials?.map((us, index) => (
                <>
                  <Button
                    key={`userSocial.${index}`}
                    size="md"
                    variant="ghost"
                    colorScheme={"mintro"}
                    _hover={{ opacity: "60%" }}
                    leftIcon={
                      <>
                        <DynamicFaIcon
                          boxSize={"5"}
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
                      // bgGradient="linear(to-l, #7a6ded, #591885)"
                      // bgClip="text"
                      color={"black"}
                      fontWeight="extrabold"
                      fontSize={"sm"}
                    >
                      {us.input}
                    </Text>
                  </Button>
                </>
              ))}
            </Box>
          ) : (
            <Formik
              enableReinitialize={true}
              initialValues={initialValues}
              onSubmit={async (values, { setFieldError }) => {
                console.log(values);

                for (const value in values || []) {
                  if (values[value].input != "") {
                    console.log(values[value].input);
                    const { data: response } = await addContact({
                      variables: {
                        typeId: values[value].id,
                        input: values[value].input,
                      },
                    });

                    if (response?.addContact.errors) {
                      // const dict = response.addContact.errors.map(function (num) {
                      //   return {
                      //     id: values[value].id,
                      //     input: values[value].input,
                      //   };
                      // });
                      const errorMsgArr = response?.addContact.errors[0];
                      const errorMsg = errorMsgArr.message
                        ? errorMsgArr.message[0]
                        : "";
                      console.log(response?.addContact.errors);
                      setFieldError("Phone", errorMsg);
                    }
                    // else if (response?.addContact.userContact) {
                    //   await onClose();
                    // }
                  }
                }
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
                  <Stack>
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
                              boxSize={"5"}
                              color={
                                contactType.color1
                                  ? contactType.color1
                                  : undefined
                              }
                              name={contactType.icon}
                            />
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
                                setFieldValue(contactType.name, {
                                  id: contactType.id,
                                  input: e.target.value,
                                });
                              }}
                              // onBlur={async () => }
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
                  <Stack>
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
                                setFieldValue(contactType.name, {
                                  id: contactType.id,
                                  input: e.target.value,
                                });
                              }}
                              // onBlur={async () => }
                            />
                          </Stack>
                        ))}
                  </Stack>
                  <Flex pt={5}>
                    <Spacer />
                    <Button
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
