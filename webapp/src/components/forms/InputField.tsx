import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";

type InputFieldProps = InputHTMLAttributes<
  HTMLInputElement | HTMLTextAreaElement
> & {
  label?: string;
  name: string;
  hasText?: boolean;
  helperText?: string;
  size?: string;
  required?: boolean;
};

export const InputField: React.FC<InputFieldProps> = ({
  label,
  hasText,
  helperText,
  required,
  ...props
}) => {
  const InputTag = hasText ? Textarea : Input;

  const [field, { error }] = useField(props);
  return (
    <FormControl isInvalid={!!error} autoComplete="new-password">
      {label && (
        <FormLabel mt={2} mb={helperText ? 0 : 2} htmlFor={field.name}>
          <Stack direction={"row"} spacing={1}>
            <span>{label}</span>
            {required && <Text color="mintro.300">*</Text>}
          </Stack>
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
      />
      {error ? (
        <FormErrorMessage name={field.name}>{error}</FormErrorMessage>
      ) : null}
    </FormControl>
  );
};
