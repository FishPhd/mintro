import { EditIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Heading,
  HStack,
  IconButton,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { AiOutlineGift, AiOutlineHome } from "react-icons/ai";
import { MdLocationOn } from "react-icons/md";
import { User } from "../../graphql/generated/graphql";
import { ShareButton } from "../buttons/ShareButton";
import { Card } from "../general/Card";
import { TextWithIcon } from "../general/TextWithIcon";

interface ProfileHeaderProps {
  user: User | undefined;
  openSetupModal: () => void;
  isMyProfile: boolean;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  user,
  openSetupModal,
  isMyProfile,
}) => {
  const userBirthday = user?.birthday
    ? new Date(user?.birthday.toString())
    : undefined;
  let profile_photo = user?.profileImageUrl?.replace(
    "mintro-webapp-images.s3.amazonaws.com/",
    "ik.imagekit.io/wzbi68mgpi3/"
  );
  profile_photo += "?tr=w-250,h-250";
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
                bg="gray.300"
                size="xl"
                src={profile_photo ? profile_photo : undefined}
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
                  {isMyProfile && user?.profileSetup && (
                    <IconButton
                      textAlign={"justify"}
                      variant="mintro"
                      bg="dark.100"
                      rounded={"full"}
                      aria-label="Edit Section"
                      onClick={openSetupModal}
                      icon={
                        <>
                          <Stack direction={"row"} p={4}>
                            <EditIcon
                              alignSelf={"center"}
                              boxSize="4"
                              color="dark.500"
                            />
                            <Text>Edit</Text>
                          </Stack>
                        </>
                      }
                    />
                  )}
                  <ShareButton pl={2} />
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
        </Card>
      )}
    </Box>
  );
};

export default ProfileHeader;
