import { GetStaticProps } from "next";
import Head from "next/head";
import React from "react";
import { Footer } from "../components/general/Footer";
import { FoundersList } from "../components/general/FoundersList";
import { Hero } from "../components/general/Hero";
import Parallax from "../components/general/Parallax";
import { ProblemStatement } from "../components/general/ProblemStatement";
import { TemplateHeader } from "../components/general/TemplateHeader";
import { NavBar } from "../components/page/NavBar";
import { useMeQuery, User } from "../graphql/generated/graphql";
import { usingApollo } from "../utils/withApollo";

interface IndexProps {
  me: User | undefined
}

export const Index: React.FC<IndexProps> = ({me}) => {
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


export const getStaticProps: GetStaticProps<IndexProps> = async () => {
  const { data: { me: me } = {} } = useMeQuery();
  return {
    props: {
      me: me ? me : undefined
    },
  };
};

export default usingApollo({ ssr: true })(Index);
