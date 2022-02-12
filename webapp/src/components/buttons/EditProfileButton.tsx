import { EditIcon } from "@chakra-ui/icons";
import { IconButton, IconButtonProps, Stack, Text } from "@chakra-ui/react";
import React from "react";

interface EditProfileButtonProps {
  openSetupModal: () => void;
}

export const EditProfileButton: React.FC<
  EditProfileButtonProps & Omit<IconButtonProps, "aria-label">
> = ({ openSetupModal, ...props }) => {
  return (
    <IconButton
      textAlign={"justify"}
      variant="mintro"
      bg="dark.100"
      mr={2}
      pl={1}
      rounded={"full"}
      aria-label="Edit Profile"
      onClick={openSetupModal}
      icon={
        <>
          <Stack direction={"row"} p={0} px={{ base: 2, lg: 4 }}>
            <EditIcon alignSelf={"center"} boxSize={"4"} color="dark.500" />
            <Text
              fontSize={{ base: "sm", lg: "lg" }}
              display={{ base: "none", md: "unset" }}
            >
              Edit
            </Text>
          </Stack>
        </>
      }
      {...props}
    />
  );
};
