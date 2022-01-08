import {
  Icon,
  IconButton,
  Text,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { BiExit } from "react-icons/bi";
import { RiAddFill, RiDeleteBinLine } from "react-icons/ri";
import {
  Group,
  useDeleteGroupMutation,
  useJoinGroupMutation,
  useLeaveGroupMutation,
  useMeQuery,
} from "../../graphql/generated/graphql";
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
        onClick={async () => {
          if (isOwner) {
            await deleteGroup({
              variables: { id: group ? group.id : -1 },
              update: (cache) => {
                cache.evict({ fieldName: "getUsersGroups" });
              },
            });
            router.push("/groups");
          } else if (isMember) {
            await leaveGroup({
              variables: { groupId: group ? group.id : -1 },
              update: (cache) => {
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
              variables: { groupId: group ? group.id : -1 },
              update: (cache) => {
                cache.evict({ fieldName: "getGroupMembers" });
                cache.evict({ fieldName: "getGroupByUrl" });
                cache.evict({ fieldName: "groupHasPassword" });
              },
            });
          }
        }}
        icon={
          <>
            <Text _groupHover={isOwner ? { color: "red.400" } : undefined}>
              {textVariant}
            </Text>
            {textVariant != "Login to join" && (
              <Icon
                ml={1}
                mb={0.5}
                _groupHover={isOwner ? { color: "red.400" } : undefined}
                boxSize="4"
                color="dark.500"
                as={buttonIcon}
              />
            )}
          </>
        }
        {...props}
      >
        Join
      </IconButton>
    </>
  );
};
