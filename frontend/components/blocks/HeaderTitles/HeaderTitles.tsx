import { AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { ProjectType, SiteSettingsType } from "../../../shared/types/types";
import HomeTitle from "../../elements/HomeTitle";
import ProjectTitle from "../../elements/ProjectTitle";
import TabTitle from "../../elements/TabTitle";
import pxToRem from "../../../utils/pxToRem";

const HeaderTitlesWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${pxToRem(4)};

  @media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
    display: none;
  }
`;

const Spacer = styled.span``;

type Props = {
  menuTabActive: string;
  projects: ProjectType[];
  tabActive: string;
  siteSettings: SiteSettingsType;
  activeProjectData: ProjectType | undefined;
  setActiveProjectId?: (id: string) => void;
  setBackdropActive: (isActive: boolean) => void;
};

const HeaderTitles = (props: Props) => {
  const {
    tabActive,
    menuTabActive,
    siteSettings,
    activeProjectData,
    projects,
    setActiveProjectId,
    setBackdropActive,
  } = props;

  return (
    <HeaderTitlesWrapper>
      <AnimatePresence mode="wait">
        {tabActive !== "information" && <Spacer key="spacer">/</Spacer>}
        {tabActive === "home" &&
          menuTabActive !== "workList" &&
          menuTabActive !== "contact" && (
            <HomeTitle key="home" siteSettings={siteSettings} />
          )}
        {menuTabActive === "contact" && tabActive !== "information" && (
          <TabTitle key="contact" title="Contact" />
        )}
        {menuTabActive === "workList" && tabActive !== "information" && (
          <TabTitle key="work" title="Work" />
        )}
        {tabActive === "project" &&
          menuTabActive !== "workList" &&
          menuTabActive !== "contact" && (
            <ProjectTitle
              key="project"
              activeProjectData={activeProjectData}
              projects={projects}
              setActiveProjectId={setActiveProjectId}
              setBackdropActive={setBackdropActive}
            />
          )}
      </AnimatePresence>
    </HeaderTitlesWrapper>
  );
};

export default HeaderTitles;
