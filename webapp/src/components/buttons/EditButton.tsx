import { EditIcon } from "@chakra-ui/icons";
import { IconButton, IconButtonProps, Stack, Text } from "@chakra-ui/react";
import isMobile from "is-mobile";
import React from "react";

export const EditButton = (props: Omit<IconButtonProps, "aria-label">) => {
  return (
    <IconButton
      // textAlign={"justify"}
      variant="mintro"
      bg="dark.100"
      rounded={"full"}
      aria-label="Edit Section"
      p={[0, "0px !important"]}
      icon={
        <>
          <Stack direction={"row"} spacing={0} p={[0, "0px !important"]}>
            <EditIcon
              ml={1}
              alignSelf={"center"}
              boxSize={isMobile() ? "3" : "4"}
              color="dark.500"
            />
            <Text pl={1} pr={4} fontSize={isMobile() ? "sm" : "lg"}>
              Edit
            </Text>
          </Stack>
        </>
      }
      {...props}
    />
  );
};
