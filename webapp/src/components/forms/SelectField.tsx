import { TriangleDownIcon } from "@chakra-ui/icons";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select,
  Spinner,
} from "@chakra-ui/react";
import { useField } from "formik";
import React, { SelectHTMLAttributes } from "react";

type SelectFieldProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  name: string;
  isLoading?: boolean;
  disableIcon?: boolean;
  size: string;
};

export const SelectField: React.FC<SelectFieldProps> = ({
  label,
  isLoading,
  disableIcon,
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
      {label && <FormLabel htmlFor={field.name}>{label}</FormLabel>}
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
