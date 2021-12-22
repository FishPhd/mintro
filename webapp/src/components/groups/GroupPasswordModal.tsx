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
  LoginMutation,
  useCreateGroupMutation,
  useEditGroupMutation,
  useGroupHasPasswordQuery,
  useJoinGroupMutation,
  GroupResponse,
  JoinGroupMutation,
  useValidateGroupPasswordQuery,
} from "../../generated/graphql";
import { toErrorMap } from "../../utils/toErrorMap";
import { InputField } from "../forms/InputField";
import { PasswordUpdateField } from "../forms/PasswordUpdateField";
import { UploadForm } from "../forms/UploadForm";

const initialValues = {
  password: "",
};

interface GroupPasswordModalProps {
  group?: Group;
  isOpen: boolean;
  onClose: () => void;
}

export const GroupPasswordModal: React.FC<GroupPasswordModalProps> = ({
  isOpen,
  group,
  onClose,
  ...props
}) => {
  const router = useRouter();
  const [joinGroup] = useJoinGroupMutation();

  return (
    <Box px={20}>
      <Modal
        {...props}
        isOpen={isOpen}
        onClose={async () => {
          await onClose();
        }}
        size="lg"
        motionPreset="slideInBottom"
        isCentered={true}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader textAlign="center" fontSize="3xl">
            Group Password
          </ModalHeader>
          <Box px={5}>
            <Formik
              // validationSchema={SetupGroupSchema}
              validateOnBlur={false}
              validateOnChange={false}
              initialValues={initialValues}
              onSubmit={async (
                values,
                { setErrors, resetForm, validateForm }
              ) => {
                const { data: response } = (await joinGroup({
                  variables: { groupId: group!.id, password: values.password },
                  update: (cache, { data }) => {
                    cache.evict({ fieldName: "getGroupMembers" });
                    cache.evict({ fieldName: "getGroupByUrl" });
                  },
                })) as { data: JoinGroupMutation };

                if (response?.joinGroup?.errors) {
                  setErrors(toErrorMap(response.joinGroup.errors));
                } else if (response.joinGroup.group) {
                  await onClose();
                }
              }}
            >
              {({ isSubmitting, setFieldValue, values, validateForm }) => (
                <Form>
                  <>
                    <Input
                      as={InputField}
                      name="password"
                      label="Password"
                      type="password"
                      focusBorderColor="mintro.400"
                    />
                  </>
                  <ModalFooter>
                    <Button
                      mt={2}
                      type="submit"
                      key="submit"
                      colorScheme="mintro"
                      isLoading={isSubmitting}
                      isFullWidth={true}
                      fontSize="md"
                      variant="mintro"
                    >
                      Join
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
