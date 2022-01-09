import {
  Box,
  Button,
  Input,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import {
  Group,
  JoinGroupMutation,
  useJoinGroupMutation,
} from "../../graphql/generated/graphql";
import { toErrorMap } from "../../utils/toErrorMap";
import { InputField } from "../forms/InputField";

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
              onSubmit={async (values, { setErrors }) => {
                const { data: response } = (await joinGroup({
                  variables: {
                    groupId: group ? group.id : -1,
                    password: values.password,
                  },
                  update: (cache) => {
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
              {({ isSubmitting }) => (
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
