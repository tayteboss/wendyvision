import styled from "styled-components";
import { NextSeo } from "next-seo";
import {
  InformationPageType,
  ProjectType,
  SiteSettingsType,
  TransitionsType,
} from "../shared/types/types";
import { AnimatePresence, motion } from "framer-motion";
import client from "../client";
import {
  informationPageQueryString,
  projectsQueryString,
  siteSettingsQueryString,
} from "../lib/sanityQueries";
import { useEffect, useState } from "react";
import Header from "../components/common/Header";
import InformationTab from "../components/blocks/InformationTab";
import ProjectTab from "../components/blocks/ProjectTab";
import ContactTab from "../components/blocks/BlankTab";
import BlankTab from "../components/blocks/BlankTab";
import CreditsModal from "../components/blocks/CreditsModal";

const PageWrapper = styled(motion.div)``;

type Props = {
  projects: ProjectType[];
  siteSettings: SiteSettingsType;
  pageTransitionVariants: TransitionsType;
  information: InformationPageType;
};

const Page = (props: Props) => {
  const { projects, siteSettings, information, pageTransitionVariants } = props;

  const [menuTabActive, setMenuTabActive] = useState("home");
  const [tabActive, setTabActive] = useState("home");
  const [menuIsActive, setMenuIsActive] = useState(false);
  const [blinkCount, setBlinkCount] = useState(0);
  const [activeProjectId, setActiveProjectId] = useState("");
  const [creditsIsActive, setCreditsIsActive] = useState(false);
  const [activeProjectData, setActiveProjectData] = useState<
    ProjectType | undefined
  >(undefined);

  useEffect(() => {
    if (activeProjectId) {
      const project = projects.find(
        (project) => project.slug?.current === activeProjectId
      );
      setActiveProjectData(project);
    }
    setBlinkCount(blinkCount + 1);
  }, [activeProjectId]);

  useEffect(() => {
    setBlinkCount(blinkCount + 1);
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
        siteSettings={siteSettings}
        activeProjectData={activeProjectData}
        setMenuTabActive={setMenuTabActive}
        setMenuIsActive={setMenuIsActive}
        setTabActive={setTabActive}
        setActiveProjectId={setActiveProjectId}
        setCreditsIsActive={setCreditsIsActive}
      />
      <CreditsModal
        creditsIsActive={creditsIsActive}
        activeProjectData={activeProjectData}
        setCreditsIsActive={setCreditsIsActive}
      />
      <AnimatePresence mode="wait">
        {tabActive === "information" && (
          <InformationTab
            siteSettings={siteSettings}
            data={information}
            key="information-tab"
          />
        )}
        {tabActive === "project" && (
          <ProjectTab activeProjectData={activeProjectData} key="project-tab" />
        )}
      </AnimatePresence>
    </PageWrapper>
  );
};

export async function getStaticProps() {
  const siteSettings = await client.fetch(siteSettingsQueryString);
  const projects = await client.fetch(projectsQueryString);
  const information = await client.fetch(informationPageQueryString);

  return {
    props: {
      projects,
      siteSettings,
      information,
    },
  };
}

export default Page;
