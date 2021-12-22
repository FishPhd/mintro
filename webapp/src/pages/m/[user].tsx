import { Box, Heading, Progress, Spacer, Stack } from "@chakra-ui/react";
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
} from "../../generated/graphql";
import { usingApollo } from "../../utils/withApollo";

export const Profile: NextPage<{}> = () => {
  const router = useRouter();
  const [setupProfile, setSetupProfile] = useState(false);

  const { data: me, loading: fetchingMe } = useMeQuery({
    notifyOnNetworkStatusChange: true,
  });
  const { data: userData, loading: userFetching } = useGetUserQuery({
    variables: {
      username:
        router?.query?.user !== undefined ? (router.query?.user as string) : "",
    },
    notifyOnNetworkStatusChange: true,
  });

  const isMyProfile = !!(me?.me?.id === userData?.getUser?.id && me?.me?.id);

  const { data: sectionsData, loading: sectionFetching } =
    useGetSectionsByUserQuery({
      variables: {
        postCount: 10,
        userId: userData?.getUser?.id !== undefined ? userData?.getUser?.id : 0,
      },
      notifyOnNetworkStatusChange: true,
    });

  const sections = sectionsData?.getSectionsByUser.sections;
  const user = userData?.getUser;

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
            setSetupProfile={setSetupProfile}
            user={user ? user : undefined}
            isMyProfile={isMyProfile}
          />

          {isMyProfile && !user?.profileSetup && <UserProfileSetup />}
          {setupProfile && user && (
            <UserProfileSetup user={user} setSetupProfile={setSetupProfile} />
          )}

          <Box as="section">
            <Box maxW="2xl" px={5} mx="auto">
              <Stack spacing="4">
                {isMyProfile && <AddEditSectionTrigger sections={sections} />}
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
