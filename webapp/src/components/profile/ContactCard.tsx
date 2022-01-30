import {
  Button,
  Flex,
  Icon,
  IconProps,
  Input,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { AnimatePresence, motion } from "framer-motion";
import * as Icons from "react-icons/fa";
import { IconType } from "react-icons/lib";
import {
  ContactType,
  useAddContactMutation,
  useContactTypesQuery,
} from "../../graphql/generated/graphql";
import { InputField } from "../forms/InputField";
import Card from "../general/Card";

interface InitialValueDict {
  [index: string]: { id: number; input: string };
}

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

export const ContactCard = () => {
  const { data: { contactTypes: contactTypes } = {} } = useContactTypesQuery();
  const [addContact] = useAddContactMutation();
  const initialValues = {} as InitialValueDict;

  if (contactTypes) {
    for (const type of contactTypes) {
      initialValues[type.name] = { id: type.id, input: "" };
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
          {/* Social
        <Box>
          <Stack direction={"row"} pl={0} alignItems={"flex-start"}>
            <Button
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
              <Text color={"dark.500"} fontWeight="extrabold" fontSize={"sm"}>
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
            </Button>
          </Stack>
        </Box> */}

          <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            onSubmit={async (values) => {
              console.log(values);

              for (const value in values || []) {
                if (values[value].value != "") {
                  console.log(values[value].value);
                  addContact({
                    variables: {
                      typeId: values[value].id,
                      input: values[value].input,
                    },
                  });
                }
              }
            }}
          >
            {({ values, setFieldValue }) => (
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
                            value={values[contactType.name]?.value || ""}
                            variant="outline"
                            bg="white"
                            type={
                              contactType.name == "Phone" ? "phone" : undefined
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
                  <Button variant="mintro" type="submit">
                    Save
                  </Button>
                </Flex>
              </Form>
            )}
          </Formik>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};

export default ContactCard;
