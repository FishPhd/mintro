import {
  Flex,
  Icon,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import React from "react";
import { BiBug } from "react-icons/bi";

interface BugReportButtonProps {
  onOpen: () => void;
  me: boolean;
}

const BugButton = (
  <Flex
    alignItems="center"
    bgGradient="linear(to-tr, red.200, red.300)"
    rounded="full"
    h="9"
    w="9"
  >
    <Icon color="dark.500" margin="auto" as={BiBug} />
  </Flex>
);

export const BugReportButton: React.FC<BugReportButtonProps> = ({
  onOpen,
  me
}) => {
  return (
    <>
      <Tooltip
        label="Report Bug"
        colorScheme="red"
        placement="auto-end"
        aria-label="Report Bug"
      >
        <IconButton
          alignSelf={me ? "self-start" : undefined}
          pt={me ? 1.5 : undefined}
          _hover={{ opacity: "75%" }}
          variant="unstyled"
          aria-label="Report Bug"
          onClick={onOpen}
          icon={BugButton}
        />
      </Tooltip>
    </>
  );
};
