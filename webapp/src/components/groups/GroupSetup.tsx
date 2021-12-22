import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormLabel,
  Input,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
// import { AnimatePresence, m, motion } from "framer-motion";
import React, { useState } from "react";
import * as Yup from "yup";
import {
  Group,
  useCreateGroupMutation,
  useEditGroupMutation,
  useGroupHasPasswordQuery,
} from "../../generated/graphql";
import { toErrorMap } from "../../utils/toErrorMap";
import { InputField } from "../forms/InputField";
import { PasswordUpdateField } from "../forms/PasswordUpdateField";
import { UploadForm } from "../forms/UploadForm";

const SetupGroupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  url: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  description: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

//TODO Do this on the server end
export function upperCase(string: String) {
  return string[0].toUpperCase() + string.substr(1);
}

export function titleCase(string: String) {
  return string[0].toUpperCase() + string.substr(1).toLowerCase();
}

const initialValues = {
  name: "",
  description: "",
  url: "",
  password: "",
};

interface GroupSetupProps {
  group?: Group;
  isOpen: boolean;
  onClose: () => void;
}

export const GroupSetup: React.FC<GroupSetupProps> = ({
  isOpen,
  group,
  onClose,
  ...props
}) => {
  const router = useRouter();
  const [groupImageUrl, setGroupImage] = useState(null);
  // const [passwordUpdated, setPasswordUpdated] = useState(false);
  const [createGroup] = useCreateGroupMutation();
  const [editGroup] = useEditGroupMutation();
  const [updatePassword, setUpdatePassword] = useState(false);

  const { data: hasPassword } = useGroupHasPasswordQuery({
    variables: { groupId: group?.id ? group.id : 0 },
  });
  let groupHasPassword = hasPassword ? hasPassword.groupHasPassword : false;

  let groupValues = group
    ? {
        name: group.name ? group.name : "",
        description: group.description ? group.description : "",
        url: group.url ? group.url : "",
        password: "",
      }
    : initialValues;

  return (
    <Box px={20}>
      <Modal
        {...props}
        isOpen={isOpen}
        onClose={async () => {
          await onClose();
        }}
        size="2xl"
        motionPreset="slideInBottom"
        isCentered={true}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader textAlign="center" fontSize="3xl">
            {group ? "Lets make some changes!" : "Lets setup your group!"}
          </ModalHeader>
          <Box px={5}>
            <Formik
              // validationSchema={SetupGroupSchema}
              validateOnBlur={false}
              validateOnChange={false}
              initialValues={groupValues}
              onSubmit={async (
                values,
                { setErrors, resetForm, validateForm }
              ) => {
                validateForm();
                let imageUrl = undefined;

                if (groupImageUrl) {
                  imageUrl = groupImageUrl;
                }

                if (group) {
                  const { data: groupData } = await editGroup({
                    variables: {
                      groupId: group.id,
                      name: values.name,
                      url: values.url,
                      description: values.description,
                      imageUrl: imageUrl,
                      password: values.password,
                      passwordUpdated: updatePassword,
                    },
                    update: (cache: any) => {
                      cache.evict({ fieldName: "getUsersGroups" });
                      cache.evict({ fieldName: "getGroupByUrl" });
                      cache.evict({ fieldName: "groupHasPassword" });
                    },
                  });
                  if (groupData?.editGroup?.errors) {
                    setErrors(toErrorMap(groupData.editGroup.errors));
                  } else if (values.url != "") {
                    // If a url update occurs
                    router.push(`/g/${values.url}`);
                    onClose();
                  } else {
                    onClose();
                  }
                } else {
                  const { data: groupData } = await createGroup({
                    variables: {
                      name: values.name,
                      url: values.url,
                      description: values.description,
                      imageUrl: imageUrl,
                      password: values.password,
                    },
                    update: (cache: any) => {
                      cache.evict({ fieldName: "getUsersGroups" });
                    },
                  });
                  if (groupData?.createGroup?.errors) {
                    setErrors(toErrorMap(groupData.createGroup.errors));
                  } else {
                    onClose();
                  }
                }
              }}
            >
              {({ isSubmitting, setFieldValue, values, validateForm }) => (
                <Form>
                  <Stack p={5}>
                    <>
                      <Flex>
                        <Input
                          as={InputField}
                          focusBorderColor="mintro.400"
                          name="name"
                          label="Group Name"
                        />
                        <Box ml={5}>
                          <FormLabel pb={2}>
                            Group Image
                            <UploadForm
                              folder="groups"
                              returnImage={setGroupImage}
                            />
                          </FormLabel>
                        </Box>
                      </Flex>
                      <Flex>
                        <Input
                          as={InputField}
                          name="url"
                          label="Group url"
                          helperText="mintro.page/g/{group url}"
                          focusBorderColor="mintro.400"
                        />
                      </Flex>
                      <Input
                        as={InputField}
                        hasText
                        name="description"
                        label="Description"
                        focusBorderColor="mintro.400"
                      />
                      <Input
                        as={PasswordUpdateField}
                        placeholder="New Password"
                        hasPassword={groupHasPassword}
                        setPasswordUpdate={setUpdatePassword}
                        name="password"
                        label="Password"
                        type="password"
                        focusBorderColor="mintro.400"
                      />
                    </>
                  </Stack>
                  <ModalFooter>
                    <Button
                      type="submit"
                      key="submit"
                      colorScheme="mintro"
                      isLoading={isSubmitting}
                      isFullWidth={true}
                      fontSize="md"
                      variant="mintro"
                    >
                      {group ? "Save" : "Create"}
                    </Button>
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
