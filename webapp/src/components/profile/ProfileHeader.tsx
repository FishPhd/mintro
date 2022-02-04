import { EditIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Heading,
  HStack,
  IconButton,
  Spacer,
  Stack,
  Tab,
  TabList,
  Tabs,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { AiOutlineGift, AiOutlineHome } from "react-icons/ai";
import { MdLocationOn } from "react-icons/md";
import { User } from "../../graphql/generated/graphql";
import { ShareButton } from "../buttons/ShareButton";
import { Card } from "../general/Card";
import { TextWithIcon } from "../general/TextWithIcon";
import { isMobile } from "is-mobile";

interface ProfileHeaderProps {
  user: User | undefined;
  openSetupModal: () => void;
  isMyProfile: boolean;
  setTabIndex: React.Dispatch<React.SetStateAction<number>>;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  user,
  openSetupModal,
  isMyProfile,
  setTabIndex,
}) => {
  const userBirthday = user?.birthday
    ? new Date(user?.birthday.toString())
    : undefined;
  // const isMobile = isMobile();
  return (
    <Box p="6">
      {user?.profileSetup && (
        <Card
          maxW="4xl"
          mx="auto"
          py={5}
          borderTopWidth="3px"
          borderColor={"gray.500"}
          borderTopColor={"mintro.300"}
        >
          <Stack
            spacing={{ base: "4", md: "4" }}
            direction={{ base: "column", lg: "row" }}
            justify="space-between"
            align="flex-start"
            w="-webkit-fill-available"
          >
            <Stack direction="row" spacing="2" w="100%">
              <Avatar
                alt={"Profile Picture"}
                bg="gray.300"
                size={isMobile() ? "md" : "xl"}
                src={user.profileImageUrl ? user.profileImageUrl : undefined}
              />

              <Box flex="1" px={2}>
                <HStack mb={1} align="flex-end" lineHeight="1" spacing="2">
                  <Stack
                    spacing={{ base: "0", lg: "2" }}
                    direction={{ base: "column", lg: "row" }}
                  >
                    <Text fontSize="2xl" fontWeight="bold">
                      {user?.firstName}
                    </Text>
                    <Text fontSize="2xl" fontWeight="bold">
                      {user?.lastName}
                    </Text>
                  </Stack>

                  <Text fontStyle="italic" color="dark.500" fontSize="md">
                    {user?.nickname}
                  </Text>

                  <Spacer />
                  <Stack
                    alignItems={"center"}
                    direction={isMobile() ? "column" : "row"}
                  >
                    {isMyProfile && user?.profileSetup && (
                      <IconButton
                        textAlign={"justify"}
                        variant="mintro"
                        bg="dark.100"
                        rounded={"full"}
                        aria-label="Edit Section"
                        onClick={openSetupModal}
                        maxW={isMobile() ? "-webkit-fit-content" : "md"}
                        icon={
                          <>
                            <Stack direction={"row"} p={4}>
                              <EditIcon
                                alignSelf={"center"}
                                boxSize={isMobile() ? "3" : "4"}
                                color="dark.500"
                              />
                              <Text fontSize={isMobile() ? "sm" : "lg"}>
                                Edit
                              </Text>
                            </Stack>
                          </>
                        }
                      />
                    )}
                    <ShareButton
                      maxW={isMobile() ? "-webkit-fit-content" : "md"}
                      pl={2}
                    />
                  </Stack>
                </HStack>
                <HStack>
                  <Heading color="dark.400" size="xs">
                    {user?.pronouns}
                  </Heading>
                  {user?.namePronunciation && (
                    <Heading color="dark.500" size="xs">
                      Pronounced &quot;{user?.namePronunciation}&quot;
                    </Heading>
                  )}
                </HStack>
                <Heading
                  fontStyle="italic"
                  alignSelf="flex-end"
                  color="mintro.500"
                  size="xs"
                  py={2}
                >
                  {user?.tagline}
                </Heading>
                <Stack
                  direction={{ base: "column", md: "row" }}
                  spacing={{ base: "3", lg: "3" }}
                  py={2}
                >
                  <TextWithIcon
                    maxW={"-webkit-fit-content"}
                    bgGradient="linear(to-tr, mintro.200, mintro.300)"
                    px={3}
                    py={2}
                    rounded={"full"}
                    icon={<MdLocationOn />}
                  >
                    {user?.city ? user.city : "No City"}
                    {", "}
                    {user?.state ? user.state : "No State"}
                    {user?.country != "United States"
                      ? `, ${user?.country}`
                      : ""}
                  </TextWithIcon>
                  <TextWithIcon
                    maxW={"-webkit-fit-content"}
                    bgGradient="linear(to-tr, mintro.200, mintro.300)"
                    px={3}
                    py={2}
                    rounded={"full"}
                    icon={<AiOutlineGift />}
                  >
                    {userBirthday?.toLocaleString("default", {
                      timeZone: "UTC",
                      month: "long",
                    })}
                    ,&nbsp;
                    {userBirthday?.toLocaleString("default", {
                      timeZone: "UTC",
                      day: "2-digit",
                    })}
                  </TextWithIcon>
                  <TextWithIcon
                    maxW={"-webkit-fit-content"}
                    bgGradient="linear(to-tr, mintro.200, mintro.300)"
                    px={3}
                    color="black"
                    opacity={"100%"}
                    py={2}
                    rounded={"full"}
                    icon={<AiOutlineHome />}
                  >
                    {user?.homeTown}
                  </TextWithIcon>
                </Stack>
              </Box>
            </Stack>
          </Stack>
          <Tabs
            pt={2}
            colorScheme={"mintro"}
            onChange={async (index) => {
              setTabIndex(index);
            }}
            isFitted
          >
            <TabList
              border="0"
              position="relative"
              zIndex={1}
              w={{ base: "100%", md: "auto" }}
            >
              <Tab _focus={{ outline: "none" }} fontWeight="semibold">
                About
              </Tab>
              <Tab _focus={{ outline: "none" }} fontWeight="semibold">
                Connect
              </Tab>
            </TabList>
          </Tabs>
        </Card>
      )}
    </Box>
  );
};

export default ProfileHeader;
