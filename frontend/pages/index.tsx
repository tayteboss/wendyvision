import styled from "styled-components";
import { NextSeo } from "next-seo";
import {
  HomePageType,
  ProjectType,
  SiteSettingsType,
  TransitionsType,
} from "../shared/types/types";
import { motion } from "framer-motion";
import client from "../client";
import {
  projectsQueryString,
  siteSettingsQueryString,
} from "../lib/sanityQueries";
import { useEffect, useState } from "react";
import Header from "../components/common/Header";

const PageWrapper = styled(motion.div)``;

type Props = {
  projects: ProjectType[];
  siteSettings: SiteSettingsType;
  pageTransitionVariants: TransitionsType;
};

const Page = (props: Props) => {
  const { projects, siteSettings, pageTransitionVariants } = props;

  const [menuTabActive, setMenuTabActive] = useState("home");
  const [tabActive, setTabActive] = useState("home");
  const [menuIsActive, setMenuIsActive] = useState(false);
  const [blinkCount, setBlinkCount] = useState(0);

  useEffect(() => {
    setBlinkCount(blinkCount + 1);

    if (menuTabActive === "home") {
      setTabActive("home");
    }
    if (menuTabActive === "information") {
      setTabActive("information");
    }
    if (menuTabActive === "contact") {
      setTabActive("contact");
    }
    if (menuTabActive === "workList") {
      setTabActive("work");
    }
  }, [menuTabActive]);

  return (
    <PageWrapper
      variants={pageTransitionVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <NextSeo
        title={siteSettings?.seoTitle || ""}
        description={siteSettings?.seoDescription || ""}
      />
      <Header
        menuTabActive={menuTabActive}
        blinkCount={blinkCount}
        menuIsActive={menuIsActive}
        projects={projects}
        tabActive={tabActive}
        setMenuTabActive={setMenuTabActive}
        setMenuIsActive={setMenuIsActive}
        setTabActive={setTabActive}
      />
    </PageWrapper>
  );
};

export async function getStaticProps() {
  const siteSettings = await client.fetch(siteSettingsQueryString);
  const projects = await client.fetch(projectsQueryString);

  return {
    props: {
      projects,
      siteSettings,
    },
  };
}

export default Page;
