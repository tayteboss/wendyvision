import styled from "styled-components";
import pxToRem from "../../../utils/pxToRem";
import Eye from "../../icons/Eye";
import Logo from "../../icons/Logo";
import MenuTrigger from "../../elements/MenuTrigger";
import MenuList from "../../blocks/MenuList";
import HomeTitle from "../../elements/HomeTitle";
import { AnimatePresence, motion } from "framer-motion";
import TabTitle from "../../elements/TabTitle";
import { ProjectType, SiteSettingsType } from "../../../shared/types/types";
import ProjectTitle from "../../elements/ProjectTitle";
import CreditsTrigger from "../../elements/CreditsTrigger";

const HeaderWrapper = styled.header`
  position: fixed;
  top: 50%;
  left: 0;
  z-index: 100;
  mix-blend-mode: difference;
  color: var(--colour-white);
  padding: ${pxToRem(16)};
  display: flex;
  align-items: center;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${pxToRem(4)};
  width: 100%;
  opacity: 1;

  transition: all var(--transition-speed-default) var(--transition-ease);
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${pxToRem(3)};
  padding-top: 4px;
`;

const LHS = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${pxToRem(4)};
`;

const RHS = styled.div`
  width: 33vw;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const MenuListWrapper = styled.div`
  display: flex;
  gap: ${pxToRem(8)};
`;

const CreditListWrapper = styled(motion.div)`
  display: flex;
  gap: ${pxToRem(8)};
`;

const Spacer = styled.span``;

const MenuSpacer = styled(motion.span)``;

const wrapperVariants = {
  hidden: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
      when: "afterChildren",
      staggerChildren: 0.01,
      staggerDirection: -1,
    },
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

type Props = {
  menuTabActive: string;
  blinkCount: number;
  menuIsActive: boolean;
  projects: ProjectType[];
  tabActive: string;
  siteSettings: SiteSettingsType;
  activeProjectData: ProjectType | undefined;
  setMenuTabActive: (tab: string) => void;
  setMenuIsActive: (isActive: boolean) => void;
  setTabActive?: (tab: string) => void;
  setActiveProjectId?: (id: string) => void;
  setCreditsIsActive: (isActive: boolean) => void;
};

const Header = (props: Props) => {
  const {
    blinkCount,
    projects,
    menuTabActive,
    menuIsActive,
    tabActive,
    siteSettings,
    activeProjectData,
    setMenuTabActive,
    setMenuIsActive,
    setTabActive,
    setActiveProjectId,
    setCreditsIsActive,
  } = props;

  return (
    <HeaderWrapper className={menuIsActive ? "" : "header"}>
      <LHS>
        {tabActive !== "information" && (
          <LogoWrapper>
            <Eye useBlink={blinkCount} />
            <Logo />
          </LogoWrapper>
        )}
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
              />
            )}
        </AnimatePresence>
      </LHS>
      <RHS>
        <MenuListWrapper>
          <AnimatePresence mode="wait">
            {menuIsActive && (
              <MenuSpacer
                key="spacer"
                variants={wrapperVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                /
              </MenuSpacer>
            )}
            {tabActive === "project" && !menuIsActive && (
              <CreditListWrapper
                variants={wrapperVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                key="credit-list"
              >
                <MenuSpacer
                  key="spacer-2"
                  variants={wrapperVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  /
                </MenuSpacer>
                <CreditsTrigger
                  key="credits-trigger"
                  wrapperVariants={wrapperVariants}
                  setCreditsIsActive={setCreditsIsActive}
                />
              </CreditListWrapper>
            )}
            <MenuList
              key="menu-list"
              menuTabActive={menuTabActive}
              menuIsActive={menuIsActive}
              projects={projects}
              siteSettings={siteSettings}
              wrapperVariants={wrapperVariants}
              setMenuTabActive={setMenuTabActive}
              setMenuIsActive={setMenuIsActive}
              setTabActive={setTabActive}
              setActiveProjectId={setActiveProjectId}
            />
          </AnimatePresence>
        </MenuListWrapper>
        <MenuTrigger
          menuIsActive={menuIsActive}
          menuTabActive={menuTabActive}
          setMenuIsActive={setMenuIsActive}
          setMenuTabActive={setMenuTabActive}
        />
      </RHS>
    </HeaderWrapper>
  );
};

export default Header;
