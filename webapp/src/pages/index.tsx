import Head from "next/head";
import React from "react";
import { Footer } from "../components/general/Footer";
import { FoundersList } from "../components/general/FoundersList";
import Hero from "../components/general/Hero";
import Parallax from "../components/general/Parallax";
import ProblemStatement from "../components/general/ProblemStatement";
import TemplateHeader from "../components/general/TemplateHeader";
import NavBar from "../components/page/NavBar";
import { usingApollo } from "../utils/withApollo";

export const Index: React.FC = () => {
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
