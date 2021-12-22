import {
  Box,
  Icon,
  IconButton,
  Text,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { RiAddFill, RiDeleteBinLine } from "react-icons/ri";
import { BiExit } from "react-icons/bi";
import {
  Group,
  useDeleteGroupMutation,
  useGroupHasPasswordQuery,
  useJoinGroupMutation,
  useLeaveGroupMutation,
  useMeQuery,
} from "../../generated/graphql";
import { GroupPasswordModal } from "../groups/GroupPasswordModal";

interface JoinButtonProps {
  group?: Group;
  isMember?: boolean;
  disabled?: boolean;
  hasPassword: boolean;
}

export const JoinButton: React.FC<JoinButtonProps> = ({
  group,
  isMember,
  disabled,
  hasPassword,
  ...props
}) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: me } = useMeQuery();

  let isOwner = false;
  let buttonText = "Join";
  let buttonIcon = RiAddFill;
  if (me?.me && group && group.creatorId == me?.me.id) {
    isOwner = true;
    buttonText = "Delete";
    buttonIcon = RiDeleteBinLine;
  } else if (isMember) {
    buttonText = "Leave";
    buttonIcon = BiExit;
  } else if (!me?.me) {
    buttonText = "Login to join";
  }

  const textVariant = useBreakpointValue({
    md: buttonText,
    base: "",
  });

  const [joinGroup] = useJoinGroupMutation();
  const [leaveGroup] = useLeaveGroupMutation();
  const [deleteGroup] = useDeleteGroupMutation();

  return (
    <>
      <GroupPasswordModal group={group} isOpen={isOpen} onClose={onClose} />
      <IconButton
        disabled={disabled ? disabled : false}
        color="dark.500"
        variant={isMember ? "outline" : "mintro"}
        aria-label="Join Group!"
        alignSelf="start"
        rounded="full"
        role="group"
        p={{ base: 2, md: 3 }}
        onClick={async (e) => {
          if (isOwner) {
            await deleteGroup({
              variables: { id: group!.id },
              update: (cache) => {
                cache.evict({ fieldName: "getUsersGroups" });
              },
            });
            router.push("/groups");
          } else if (isMember) {
            await leaveGroup({
              variables: { groupId: group!.id },
              update: (cache, { data }) => {
                cache.evict({ fieldName: "getGroupMembers" });
                cache.evict({ fieldName: "getGroupByUrl" });
                cache.evict({ fieldName: "groupHasPassword" });
                cache.evict({ fieldName: "getUsersGroups" });
              },
            });
          } else if (hasPassword) {
            await onOpen();
          } else {
            await joinGroup({
              variables: { groupId: group!.id },
              update: (cache, { data }) => {
                cache.evict({ fieldName: "getGroupMembers" });
                cache.evict({ fieldName: "getGroupByUrl" });
                cache.evict({ fieldName: "groupHasPassword" });
              },
            });
          }
        }}
        icon={
          <Box alignSelf="center">
            <Text _groupHover={isOwner ? { color: "red.400" } : undefined}>
              {textVariant}
              <Icon
                ml={1}
                _groupHover={isOwner ? { color: "red.400" } : undefined}
                boxSize="4"
                color="dark.500"
                as={buttonIcon}
              />
            </Text>
          </Box>
        }
        {...props}
      >
        Join
      </IconButton>
    </>
  );
};
