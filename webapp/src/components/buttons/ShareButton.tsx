import {
  Icon,
  Box,
  IconButton,
  Text,
  useToast,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { IoMdShare } from "react-icons/io";
export const ShareButton = (props: any) => {
  const toast = useToast();
  const router = useRouter();
  const variant = useBreakpointValue({ md: "Share", base: "" });
  return (
    <IconButton
      color="dark.500"
      variant="mintro"
      aria-label="Share your Mintro!"
      onClick={() => {
        navigator.clipboard.writeText("https://mintro.page" + router.asPath);
        toast({
          title: "Link copied to clipboard!",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      }}
      rounded="full"
      p={{ base: 2, md: 3 }}
      icon={
        <Text>
          <Icon
            boxSize="4"
            color="dark.500"
            mr={{ base: 2.2, sm: 1 }}
            as={IoMdShare}
          />
          {variant}
        </Text>
      }
      {...props}
    >
      Share your Mintro!
    </IconButton>
  );
};
