import {
  Icon,
  IconButton,
  Text,
  useToast,
  Stack,
  IconButtonProps,
} from "@chakra-ui/react";
import isMobile from "is-mobile";
import { useRouter } from "next/router";
import React from "react";
import { IoMdShare } from "react-icons/io";
export const ShareButton = (props: Omit<IconButtonProps, "aria-label">) => {
  const toast = useToast();
  const router = useRouter();
  // const variant = useBreakpointValue({ md: "Share", base: "" });
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
      icon={
        <>
          <Stack direction={"row"} spacing={0}>
            <Icon
              ml={1}
              boxSize={isMobile() ? "3" : "4"}
              color="dark.500"
              mr={{ base: 2.2, sm: 1 }}
              alignSelf={"center"}
              as={IoMdShare}
            />
            <Text pl={1} pr={4} fontSize={isMobile() ? "sm" : "lg"}>
              Share
            </Text>
          </Stack>
        </>
      }
      {...props}
    >
      Share your Mintro!
    </IconButton>
  );
};
