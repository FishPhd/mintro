import { EditIcon } from "@chakra-ui/icons";
import { IconButton, Stack, Text } from "@chakra-ui/react";
import React from "react";

export const EditButton = (props: any) => {
  return (
    <IconButton
      textAlign={"justify"}
      variant="mintro"
      bg="dark.100"
      rounded={"full"}
      aria-label="Edit Section"
      icon={
        <>
          <Stack direction={"row"} p={4}>
            <EditIcon alignSelf={"center"} boxSize="4" color="dark.500" />
            <Text>Edit</Text>
          </Stack>
        </>
      }
      {...props}
    />
  );
};
