import {
  Box,
  useColorModeValue,
  Text,
  Wrap,
  WrapItem,
  Heading,
  Flex,
  Icon,
  HStack,
} from "@chakra-ui/react";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { RiLock2Line } from "react-icons/ri";
import { UserCard } from "../../components/general/UserCard";
import GroupHeader from "../../components/groups/GroupHeader";
import { NavBar } from "../../components/page/NavBar";
import {
  useGetGroupByNameQuery,
  useGetGroupByUrlLazyQuery,
  useGetGroupByUrlQuery,
  useGetGroupMembersQuery,
  useGroupHasPasswordQuery,
  useMeQuery,
} from "../../generated/graphql";
import { usingApollo } from "../../utils/withApollo";

export const Group: NextPage<{}> = () => {
  const router = useRouter();
  let isMember = false;
  const url = router?.query?.group;
  const { data: meData, loading: fetchingMe } = useMeQuery({
    notifyOnNetworkStatusChange: true,
  });
  const { data: groupData, loading: groupFetching } = useGetGroupByUrlQuery({
    variables: {
      url: url !== undefined ? (url as string) : "",
    },
    notifyOnNetworkStatusChange: true,
  });
  const group = groupData?.getGroupByUrl;
  const { data: userData, loading: userFetching } = useGetGroupMembersQuery({
    variables: { groupId: group?.id ? group.id : 0 },
  });
  const { data: groupHasPassword } = useGroupHasPasswordQuery({
    variables: { groupId: group?.id ? group.id : -1 },
  });
  const hasPassword = groupHasPassword?.groupHasPassword;

  const me = meData?.me;
  let isAdmin = false;

  const members = userData?.getGroupMembers;
  if (members) {
    isMember = members.some((member) => member.id == me?.id);
  }

  if (me?.id == group?.creatorId) {
    isAdmin = true;
  }

  return (
    <>
      <Head>
        <title>
          {/* Mintro - {user?.firstName ? user?.firstName : router?.query?.user}{" "}
          {user?.lastName}{" "} */}
        </title>
      </Head>
      <NavBar />
      <Box bg={useColorModeValue("gray.50", "inherit")} minH="100vh">
        <Box maxW="4xl" px={5} mx="auto">
          <GroupHeader
            hasPassword={hasPassword ? hasPassword : false}
            me={me ? me : undefined}
            group={group ? group : undefined}
            isMember={isMember}
            isAdmin={isAdmin}
          />
          {members && (
            <Heading textAlign="center" p={5}>
              Members
            </Heading>
          )}
          {!isMember && hasPassword ? (
            <HStack pt={15} w="fit-content" alignSelf="center" mx="auto">
              <Icon
                alignSelf="center"
                fontSize="xl"
                color="dark.200"
                as={RiLock2Line}
              />
              <Text fontWeight="500" color="dark.200" fontSize="2xl">
                {"Secret Club"}
              </Text>
            </HStack>
          ) : (
            <Wrap justify="center" p={2} mb={2} spacing={5}>
              {members &&
                members.map((member, index: number) => (
                  <WrapItem key={member.username + "_" + index}>
                    <UserCard
                      tagline={
                        group?.creatorId == member.id ? "Creator" : undefined
                      }
                      name={member?.firstName ? member?.firstName : ""}
                      img={member.profileImageUrl ? member.profileImageUrl : ""}
                      username={member.username ? member.username : ""}
                    />
                  </WrapItem>
                ))}
            </Wrap>
          )}
        </Box>
      </Box>
    </>
  );
};

export default usingApollo({ ssr: true })(Group);
