import Head from "next/head";
import React from "react";
import { Hero } from "../components/general/Hero";
import { ProblemStatement } from "../components/general/ProblemStatement";
import { NavBar } from "../components/page/NavBar";
import { TemplateHeader } from "../components/general/TemplateHeader";
import { usingApollo } from "../utils/withApollo";
import { FoundersList } from "../components/general/FoundersList";
import { Footer } from "../components/general/Footer";

export const Index: React.FC<{}> = ({}) => {
  return (
    <>
      <Head>
        <title>Mintro - Home</title>
      </Head>
      <NavBar transparent />
      <Hero />
      <ProblemStatement />
      <TemplateHeader />
      <FoundersList />
      <Footer />
    </>
  );
};

export default usingApollo({ ssr: true })(Index);
