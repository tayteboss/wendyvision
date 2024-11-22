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
import { useEffect, useRef, useState } from "react";
import Header from "../components/common/Header";
import InformationTab from "../components/blocks/InformationTab";
import DesktopProjectTab from "../components/blocks/DesktopProjectTab";
import CreditsModal from "../components/blocks/CreditsModal";
import MobileProjectTab from "../components/blocks/MobileProjectTab";
import HomeTab from "../components/blocks/HomeTab";

const PageWrapper = styled(motion.div)<{ $showHomeTabInner: boolean }>`
  background: var(--colour-black);

  .home-tab-inner {
    opacity: ${(props) => (props.$showHomeTabInner ? 1 : 0)};
  }
`;

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
  const [canPlay, setCanPlay] = useState(false);

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      const timer = setTimeout(() => {
        setCanPlay(true);
        isFirstRender.current = false;
      }, 2000);

      return () => clearTimeout(timer);
    } else {
      setCanPlay(true);
    }
  }, [tabActive]);

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

  console.log("projects", projects);

  return (
    <PageWrapper
      variants={pageTransitionVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      $showHomeTabInner={canPlay}
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
      <AnimatePresence mode="sync">
        <HomeTab
          siteSettings={siteSettings}
          key="home-tab"
          isActive={tabActive === "home"}
        />
        {tabActive === "information" && (
          <InformationTab
            siteSettings={siteSettings}
            data={information}
            key="information-tab"
          />
        )}
        {tabActive === "project" && (
          <DesktopProjectTab
            activeProjectData={activeProjectData}
            key="desktop-project-tab"
          />
        )}
        {tabActive === "project" && (
          <MobileProjectTab
            activeProjectDataID={activeProjectData?.slug?.current}
            projects={projects}
            mobileCreditsIsActive={creditsIsActive}
            setMobileCreditsIsActive={setCreditsIsActive}
            setActiveProjectId={setActiveProjectId}
            key="mobile-project-tab"
          />
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
