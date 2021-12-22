import {
  ComponentWithAs,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Textarea,
  TextareaProps,
} from "@chakra-ui/react";
import { ErrorMessage, useField } from "formik";
import React, { InputHTMLAttributes } from "react";

type InputFieldProps = InputHTMLAttributes<
  HTMLInputElement | HTMLTextAreaElement
> & {
  label?: string;
  name: string;
  hasText?: boolean;
  helperText?: string;
};

export const InputField: React.FC<InputFieldProps> = ({
  label,
  size: _,
  hasText,
  helperText,
  ...props
}) => {
  let InputTag = hasText ? Textarea : Input;

  const [field, { error }] = useField(props);
  return (
    <FormControl isInvalid={!!error} autoComplete="new-password">
      {label && (
        <FormLabel mt={2} mb={helperText ? 0 : 2} htmlFor={field.name}>
          {label}{" "}
        </FormLabel>
      )}
      {helperText && (
        <FormHelperText mt={0} mb={2}>
          {helperText}
        </FormHelperText>
      )}

      <InputTag
        {...field}
        {...props}
        focusBorderColor="transparent"
        id={field.name}
        autoComplete="off"
      />
      {error ? (
        <FormErrorMessage name={field.name}>{error}</FormErrorMessage>
      ) : null}
    </FormControl>
  );
};
