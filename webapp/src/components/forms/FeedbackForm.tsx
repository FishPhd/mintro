import {
  toast,
  Modal,
  Text,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Textarea,
  ModalFooter,
  Button,
  useToast,
} from "@chakra-ui/react";
import { Formik, Form, ErrorMessage } from "formik";
import { useSubmitFeedbackMutation } from "../../graphql/generated/graphql";

interface FeedbackFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FeedbackForm: React.FC<FeedbackFormProps> = ({
  onClose,
  isOpen,
}) => {
  const [submitFeedback] = useSubmitFeedbackMutation();
  const toast = useToast();

  return (
    <Formik
      initialValues={{ feedback: "" }}
      onSubmit={async (values, { setErrors, resetForm }) => {
        const { data: feedbackData } = await submitFeedback({
          variables: {
            feedback: values.feedback,
          },
        });
        if (feedbackData?.submitFeedback.errors) {
          setErrors({ feedback: "Please enter some feedback!" });
        } else {
          onClose();
          toast({
            title: "Thank you!",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          resetForm();
        }
      }}
    >
      {({ setFieldValue, submitForm, values, errors }) => (
        <Form>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Feedback</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text pb={2}>Bug or Feedback:</Text>
                <Textarea
                  id="feedback"
                  name="feedback"
                  type="feedback"
                  onChange={async (e) => {
                    setFieldValue("feedback", e.target.value);
                  }}
                />

                <ErrorMessage name="feedback">
                  {(msg) => (
                    <Text pt={2} color="red.200">
                      {msg}
                    </Text>
                  )}
                </ErrorMessage>
              </ModalBody>
              <ModalFooter>
                <Button
                  type="submit"
                  onClick={submitForm}
                  variant="mintro"
                  mr={3}
                >
                  Submit
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Form>
      )}
    </Formik>
  );
};
