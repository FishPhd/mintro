import { Box, Heading, Stack, useDisclosure } from "@chakra-ui/react";
import { NextPage, NextPageContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import Card from "../../components/general/Card";
import { NavBar } from "../../components/page/NavBar";
import AddEditSectionTrigger from "../../components/profile/AddEditSectionTrigger";
import ProfileHeader from "../../components/profile/ProfileHeader";
import { UserProfileSetup } from "../../components/profile/UserProfileSetup";
import { UserSections } from "../../components/profile/UserSections";
import {
  GetSectionsByUserDocument,
  GetSectionsByUserQuery,
  GetUserDocument,
  GetUserQuery,
  MeDocument,
  MeQuery,
  Section,
  User,
} from "../../graphql/generated/graphql";
import { addApolloState, initializeApollo } from "../../utils/withApollo";

interface UserPageProps {
  isMyProfile: boolean;
  user: User;
  sections: Section[];
}

export const Profile: NextPage<UserPageProps> = ({
  isMyProfile,
  user,
  sections,
}) => {
  // const {
  //   data: { getSectionsByUser: sectionsData } = {},
  //   loading: sectionFetching,
  // } = useGetSectionsByUserQuery({
  //   variables: {
  //     postCount: 10,
  //     userId: user?.id !== undefined ? user?.id : 0,
  //   },
  //   notifyOnNetworkStatusChange: true,
  // });

  // const sections = sectionsData?.sections;
  const router = useRouter();

  const { isOpen, onOpen, onClose } = useDisclosure({});
  if (user && !user?.profileSetup && !isOpen) {
    onOpen();
  }

  return (
    <>
      <Head>
        <title>
          {user?.firstName ? user?.firstName : router?.query?.user}{" "}
          {user?.lastName} | Mintro
        </title>
      </Head>
      <NavBar />
      {!user?.username ? (
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
                {/* {sectionFetching && (
                  <Box px={5} borderRadius="lg">
                    <Progress
                      py={5}
                      px={5}
                      bg="mintro.A300"
                      margin="auto"
                      maxW={{ base: "md", md: "md", lg: "lg" }}
                    />
                  </Box>
                )} */}
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

export const getServerSideProps = async (context: NextPageContext) => {
  const client = initializeApollo({ headers: context?.req?.headers });
  const username = context.query.user;
  const {
    data: { me: me },
  } = await client.query<MeQuery>({
    query: MeDocument,
  });
  const {
    data: { getUser: user },
  } = await client.query<GetUserQuery>({
    query: GetUserDocument,
    variables: { username },
  });

  const {
    data: { getSectionsByUser: { sections: sections } = {} },
  } = await client.query<GetSectionsByUserQuery>({
    query: GetSectionsByUserDocument,
    variables: {
      postCount: 10,
      userId: user?.id !== undefined ? user?.id : 0,
    },
  });

  const isMyProfile = !!(me?.id === user?.id && me?.id);

  return addApolloState(client, {
    props: { isMyProfile, user: user, sections },
  });
};

export default Profile;
