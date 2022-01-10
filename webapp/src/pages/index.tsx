import { gql } from "@apollo/client";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import React from "react";
import { Footer } from "../components/general/Footer";
import { FoundersList } from "../components/general/FoundersList";
import Hero from "../components/general/Hero";
import Parallax from "../components/general/Parallax";
import ProblemStatement from "../components/general/ProblemStatement";
import TemplateHeader from "../components/general/TemplateHeader";
import NavBar from "../components/page/NavBar";
import { MeDocument, MeQuery, User } from "../graphql/generated/graphql";
import { addApolloState, initializeApollo } from "../utils/withApollo";

interface IndexProps {
  me: User | undefined;
}

// const EXAMPLE_QUERY = gql`
//   query me {
//     me {
//       id
//     }
//   }
// `;

export const Index: React.FC<IndexProps> = ({ me }) => {
  // console.log(me);
  // const { data: { me: meData } = {} } = useMeQuery();
  // console.log(me);

  // const { loading, error, data, fetchMore, networkStatus } = useQuery(
  //   EXAMPLE_QUERY,
  //   {
  //     notifyOnNetworkStatusChange: true,
  //   }
  // );
  // console.log(data);
  console.log(me);
  return (
    <>
      <Head>
        <title>Home | Mintro</title>
      </Head>
      <NavBar me={me} transparent />

      <Parallax>
        <Hero />
      </Parallax>
      <Parallax>
        <ProblemStatement />
      </Parallax>
      <Parallax>
        <TemplateHeader />
      </Parallax>
      <Parallax>
        <FoundersList />
      </Parallax>
      <Footer />
    </>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  // pass along the headers for authentication
  const client = initializeApollo({ headers: context?.req?.headers });
  const {
    data: { me: me },
  } = await client.query<MeQuery>({
    query: MeDocument,
  });

  return addApolloState(client, {
    props: { me: me },
  });
};

export default Index;

// export default usingApollo({ ssr: true })(Index);
