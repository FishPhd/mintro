import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Spacer,
  Switch,
  Textarea,
} from "@chakra-ui/react";
import { useField } from "formik";
import React, { InputHTMLAttributes, useState } from "react";

type PasswordUpdateFieldProps = InputHTMLAttributes<
  HTMLInputElement | HTMLTextAreaElement
> & {
  label?: string;
  name: string;
  hasText?: boolean;
  helperText?: string;
  hasPassword?: boolean;
  size: string;
  setPasswordUpdate: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PasswordUpdateField: React.FC<PasswordUpdateFieldProps> = ({
  label,
  hasText,
  hasPassword,
  setPasswordUpdate,
  ...props
}) => {
  const InputTag = hasText ? Textarea : Input;

  const [enablePassword, setEnablePassword] = useState(hasPassword);
  const [editPassword, setEditPassword] = useState(false);
  const [field, { error }] = useField(props);
  return (
    <FormControl isInvalid={!!error} autoComplete="new-password">
      <Flex mt={2}>
        {label && (
          <FormLabel mt={2} htmlFor={field.name}>
            {label}{" "}
          </FormLabel>
        )}
        <Switch
          m={"auto"}
          ml={2}
          defaultChecked={hasPassword}
          colorScheme="mintro"
          onChange={() => {
            // setRemovePassword(!removePassword);
            if (!hasPassword) {
              if (enablePassword) setEditPassword(false);

              setEnablePassword(!enablePassword);
              setPasswordUpdate(true);
            } else {
              if (enablePassword) {
                setEditPassword(false);
                setPasswordUpdate(true);
              } else {
                setPasswordUpdate(true);
              }
              setEnablePassword(!enablePassword);
            }
          }}
        />
        <Spacer />
        <Button
          opacity={editPassword || (hasPassword && enablePassword) ? "1" : "0"}
          onClick={() => {
            setPasswordUpdate(!editPassword);
            setEditPassword(!editPassword);
          }}
        >
          Edit
        </Button>
      </Flex>

      <InputTag
        {...field}
        {...props}
        focusBorderColor="transparent"
        id={field.name}
        autoComplete="off"
        transition="opacity 0.1s;"
        display={
          editPassword || (!hasPassword && enablePassword) ? undefined : "None"
        }
        my={2}
        w={"auto"}
      />

      {error ? (
        <FormErrorMessage name={field.name}>{error}</FormErrorMessage>
      ) : null}
    </FormControl>
  );
};
