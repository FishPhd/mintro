import {
  Box,
  Button,
  Icon,
  Input,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Formik, Form, FieldArray, Field } from "formik";
import { AnimatePresence, motion } from "framer-motion";
// import {
//   FaSnapchatGhost,
//   FaInstagram,
//   FaTiktok,
//   FaPhoneAlt,
//   FaEnvelope,
// } from "react-icons/fa";
import { InputField } from "../forms/InputField";
import { SelectField } from "../forms/SelectField";
import Card from "../general/Card";

import * as Icons from "react-icons/fa";
import {
  ContactType,
  useContactTypesQuery,
} from "../../graphql/generated/graphql";
import { PhoneIcon } from "@chakra-ui/icons";

interface DynamicFaIconProps {
  name: string;
}

/* Your icon name from database data can now be passed as prop */
const DynamicFaIcon: React.FC<DynamicFaIconProps> = ({ name }) => {
  const IconComponent = Icons[name];

  if (!IconComponent) {
    // Return a default one
    return <Icons.FaBeer />;
  }

  return <IconComponent />;
};

export const ContactCard = () => {
  const { data: { contactTypes: contactTypes } = {} } = useContactTypesQuery();
  console.log(contactTypes);
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
          <Text
            fontWeight="800"
            color="dark.500"
            fontSize={{ base: "4xl", md: "4xl", lg: "5xl" }}
          >
            Contact
          </Text>
          <Formik
            initialValues={{ contactInfo: [] }}
            onSubmit={async (values) =>
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
              }, 500)
            }
          >
            {({ values }) => (
              <Form>
                <FieldArray
                  name="contactInfo"
                  render={(arrayHelpers) => (
                    <Stack>
                      {values.contactInfo && values.contactInfo.length > 0 ? (
                        values.contactInfo.map((contactInfo, index) => (
                          <Stack direction={"row"} spacing={2} key={index}>
                            <Select
                              as={SelectField}
                              borderColor={"mintro.200"}
                              focusBorderColor={"mintro.200"}
                              variant="filled"
                              width="50%"
                              bg="white"
                              key="sectionName"
                              iconSize={"10"}
                              icon={<></>}
                              name={`contactTypes.${index}`}
                            >
                              {contactTypes?.map((contactType) => (
                                <option
                                  key={contactType.id}
                                  value={contactType.name}
                                >
                                  {contactType.name}
                                </option>
                              ))}
                            </Select>
                            <Input
                              as={InputField}
                              focusBorderColor="mintro.300"
                              name={`contactInfo.${index}`}
                              placeholder="Phone Number"
                              variant="outline"
                              bg="white"
                              errorBorderColor="red.200"
                            />
                            <Button
                              onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                            >
                              -
                            </Button>
                            <Button
                              onClick={() => arrayHelpers.insert(index, "")} // insert an empty string at a position
                            >
                              +
                            </Button>
                          </Stack>
                        ))
                      ) : (
                        <Button onClick={() => arrayHelpers.push("")}>
                          {/* show this when user has removed all friends from the list */}
                          Add Contact Info
                        </Button>
                      )}
                      {/* <Box>
                        <Button mt={5} variant="mintro" type="submit">
                          Save
                        </Button>
                      </Box> */}
                    </Stack>
                  )}
                />
              </Form>
            )}
          </Formik>

          <Text
            fontWeight="800"
            color="dark.500"
            pt={5}
            fontSize={{ base: "4xl", md: "4xl", lg: "5xl" }}
          >
            Social
          </Text>
          <Formik
            initialValues={{ contactInfo: [] }}
            onSubmit={async (values) =>
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
              }, 500)
            }
          >
            {({ values }) => (
              <Form>
                <FieldArray
                  name="contactInfo"
                  render={(arrayHelpers) => (
                    <Stack>
                      {values.contactInfo && values.contactInfo.length > 0 ? (
                        values.contactInfo.map((contactInfo, index) => (
                          <Stack direction={"row"} spacing={2} key={index}>
                            <Select
                              as={SelectField}
                              borderColor={"mintro.200"}
                              focusBorderColor={"mintro.200"}
                              variant="filled"
                              width="50%"
                              bg="white"
                              key="sectionName"
                              iconSize={"10"}
                              icon={<></>}
                              name={`contactTypes.${index}`}
                            >
                              {contactTypes?.map((contactType) => (
                                <option
                                  key={contactType.id}
                                  value={contactType.name}
                                >
                                  {contactType.name}
                                </option>
                              ))}
                            </Select>
                            <Input
                              as={InputField}
                              focusBorderColor="mintro.300"
                              name={`contactInfo.${index}`}
                              placeholder="Phone Number"
                              variant="outline"
                              bg="white"
                              errorBorderColor="red.200"
                            />
                            <Button
                              onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                            >
                              -
                            </Button>
                            <Button
                              onClick={() => arrayHelpers.insert(index, "")} // insert an empty string at a position
                            >
                              +
                            </Button>
                          </Stack>
                        ))
                      ) : (
                        <Button onClick={() => arrayHelpers.push("")}>
                          {/* show this when user has removed all friends from the list */}
                          Add Social Media
                        </Button>
                      )}
                      {/* <Box>
                        <Button mt={5} variant="mintro" type="submit">
                          Save
                        </Button>
                      </Box> */}
                    </Stack>
                  )}
                />
              </Form>
            )}
          </Formik>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};

export default ContactCard;
