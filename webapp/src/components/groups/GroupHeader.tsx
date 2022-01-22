import { EditIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  Spacer,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { RiGroup2Fill, RiLock2Line } from "react-icons/ri";
import { Group, User } from "../../graphql/generated/graphql";
import { JoinButton } from "../buttons/JoinButton";
import { Card } from "../general/Card";
import { GroupSetup } from "./GroupSetup";
interface GroupHeaderProps {
  group: Group | undefined;
  me?: User;
  isMember: boolean;
  hasPassword: boolean;
  isAdmin: boolean;
}

export const GroupHeader: React.FC<GroupHeaderProps> = ({
  group,
  me,
  hasPassword,
  isMember,
  isAdmin,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const group_photo = group?.groupImageUrl + "?tr=w-250,h-250";

  return (
    <Box p="6">
      <GroupSetup group={group} isOpen={isOpen} onClose={onClose} />
      <Card
        maxW="4xl"
        mx="auto"
        py={5}
        px={8}
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
              alt={"Group Page Picture"}
              icon={
                <Icon
                  color="mintro.300"
                  width="2.5em"
                  height="2.5em"
                  as={RiGroup2Fill}
                />
              }
              bg="gray.100"
              size="xl"
              src={group_photo ? group_photo : undefined}
            />

            <Box flex="1" px={2} py={3}>
              <HStack mb={1} align="flex-end" lineHeight="1">
                <Stack spacing={0}>
                  <HStack spacing={0}>
                    <Text fontSize="2xl" fontWeight="bold">
                      {group?.name}
                    </Text>
                    {isAdmin && (
                      <IconButton
                        variant="unstyled"
                        aria-label="Edit Section"
                        onClick={onOpen}
                        icon={
                          <EditIcon
                            color="dark.500"
                            _hover={{ color: "mintro.400" }}
                          />
                        }
                      />
                    )}
                  </HStack>
                  <Heading pt={1} color="dark.400" size="xs">
                    {group?.memberCount} Members
                  </Heading>
                  {!isMember && hasPassword ? (
                    <Flex pt={2}>
                      <Icon
                        alignSelf="flex-end"
                        color="dark.200"
                        as={RiLock2Line}
                      />
                      <Text
                        pl={1}
                        fontStyle="italic"
                        color="dark.200"
                        fontSize="md"
                      >
                        {"Secret Club"}
                      </Text>
                    </Flex>
                  ) : (
                    <Text
                      pt={2}
                      fontStyle="italic"
                      color="dark.200"
                      fontSize="md"
                    >
                      {group?.description}
                    </Text>
                  )}
                </Stack>

                <Spacer />
                {me ? (
                  <JoinButton
                    group={group}
                    hasPassword={hasPassword ? hasPassword : false}
                    isMember={isMember}
                  />
                ) : (
                  <JoinButton
                    disabled={true}
                    group={group}
                    hasPassword={hasPassword ? hasPassword : false}
                    isMember={isMember}
                  />
                )}
              </HStack>

              {/* <Heading
                fontStyle="italic"
                alignSelf="flex-end"
                color="mintro.500"
                size="xs"
                py={2}
              >
                {user?.tagline}
              </Heading> */}
            </Box>
          </Stack>
        </Stack>
      </Card>
    </Box>
  );
};

export default GroupHeader;
