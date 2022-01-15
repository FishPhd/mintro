import { TriangleDownIcon } from "@chakra-ui/icons";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select,
  Text,
  Stack,
  Spinner,
  FormHelperText,
} from "@chakra-ui/react";
import { useField } from "formik";
import React, { SelectHTMLAttributes } from "react";

type SelectFieldProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  name: string;
  isLoading?: boolean;
  disableIcon?: boolean;
  size: string;
  helperText?: string;
  required?: boolean;
};

export const SelectField: React.FC<SelectFieldProps> = ({
  label,
  isLoading,
  disableIcon,
  required,
  helperText,
  ...props
}) => {
  const [field, { error }] = useField(props);
  let icon;
  if (isLoading) {
    icon = <Spinner />;
  } else if (disableIcon) {
    icon = <></>;
  } else {
    icon = <TriangleDownIcon />;
  }
  return (
    <FormControl isInvalid={!!error}>
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
      <Select
        focusBorderColor="transparent"
        icon={icon}
        iconSize={"10"}
        {...field}
        {...props}
        id={field.name}
      />
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};
