import Head from "next/head";
import React from "react";
import { Hero } from "../components/general/Hero";
import { ProblemStatement } from "../components/general/ProblemStatement";
import { NavBar } from "../components/page/NavBar";
import { TemplateHeader } from "../components/general/TemplateHeader";
import { usingApollo } from "../utils/withApollo";
import { FoundersList } from "../components/general/FoundersList";
import { Footer } from "../components/general/Footer";
import Parallax from "../components/general/Parallax";

export const Index: React.FC = ({}) => {
  return (
    <>
      <Head>
        <title>Home | Mintro</title>
      </Head>
      <NavBar transparent />

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

export default usingApollo({ ssr: true })(Index);
