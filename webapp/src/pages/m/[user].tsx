import {
  Box,
  Heading,
  Progress,
  Spacer,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { ShareButton } from "../../components/buttons/ShareButton";
import Card from "../../components/general/Card";
import { NavBar } from "../../components/page/NavBar";
import AddEditSectionTrigger from "../../components/profile/AddEditSectionTrigger";
import ProfileHeader from "../../components/profile/ProfileHeader";
import { UserProfileSetup } from "../../components/profile/UserProfileSetup";
import { UserSections } from "../../components/profile/UserSections";
import {
  useGetSectionsByUserQuery,
  useGetUserQuery,
  useMeQuery,
} from "../../graphql/generated/graphql";
import { usingApollo } from "../../utils/withApollo";

export const Profile: NextPage<{}> = () => {
  const router = useRouter();
  // const [setupProfile, setSetupProfile] = useState(false);

  const { data: { me: me } = {}, loading: fetchingMe } = useMeQuery({
    notifyOnNetworkStatusChange: true,
  });
  const { data: { getUser: user } = {}, loading: userFetching } =
    useGetUserQuery({
      variables: {
        username:
          router?.query?.user !== undefined
            ? (router.query?.user as string)
            : "",
      },
      // notifyOnNetworkStatusChange: true,
    });

  const isMyProfile = !!(me?.id === user?.id && me?.id);

  const {
    data: { getSectionsByUser: sectionsData } = {},
    loading: sectionFetching,
  } = useGetSectionsByUserQuery({
    variables: {
      postCount: 10,
      userId: user?.id !== undefined ? user?.id : 0,
    },
    notifyOnNetworkStatusChange: true,
  });

  const sections = sectionsData?.sections;

  const { isOpen, onOpen, onClose } = useDisclosure({});
  if (!user?.profileSetup && !isOpen && !userFetching) {
    onOpen();
  }
  // defaultIsOpen: user?.profileSetup ? false : true,

  return (
    <>
      <Head>
        <title>
          Mintro - {user?.firstName ? user?.firstName : router?.query?.user}{" "}
          {user?.lastName}{" "}
        </title>
      </Head>
      <NavBar />
      {!user?.username && !userFetching ? (
        <Box bg={"dark.25"} minH="100vh" pt={"20"} px={5}>
          <Card maxW="4xl" mx="auto" textAlign="center">
            <Heading p={5} fontSize={{ base: "3xl", md: "4xl" }}>
              User does not exist!
            </Heading>
          </Card>
        </Box>
      ) : (
        <Box bg={"gray.50"} minH="100vh">
          <ProfileHeader
            openSetupModal={onOpen}
            user={user ? user : undefined}
            isMyProfile={isMyProfile}
          />

          {user && (
            <UserProfileSetup user={user} isOpen={isOpen} onClose={onClose} />
          )}

          <Box as="section">
            <Box maxW="2xl" px={5} mx="auto">
              <Stack spacing="4">
                {isMyProfile && user?.profileSetup && (
                  <AddEditSectionTrigger sections={sections} />
                )}
                {sectionFetching && (
                  <Box px={5} borderRadius="lg">
                    <Progress
                      py={5}
                      px={5}
                      bg="mintro.A300"
                      margin="auto"
                      maxW={{ base: "md", md: "md", lg: "lg" }}
                    />
                  </Box>
                )}
                <UserSections sections={sections} isMyProfile={isMyProfile} />
                <Box id="footer"></Box>
                {/* {sections?.getSectionsByUser.sections.length === 0 &&
                !sectionFetching &&
                !isMyProfile && (
                  <Box>
                    <Heading
                      py={5}
                      textTransform="capitalize"
                      alignSelf="center"
                    >
                      {user?.getUser?.firstName}
                    </Heading>
                    <Text>hasn&apos;t setup any sections!</Text>
                  </Box>
                )} */}
              </Stack>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default usingApollo({ ssr: true })(Profile);
