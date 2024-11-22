import styled from "styled-components";
import pxToRem from "../../../utils/pxToRem";
import MenuTrigger from "../../elements/MenuTrigger";
import { ProjectType, SiteSettingsType } from "../../../shared/types/types";
import LogoElement from "../../elements/LogoElement";
import HeaderTitles from "../../blocks/HeaderTitles";
import MenuListWrapper from "../../blocks/MenuListWrapper";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import { useState } from "react";

const HeaderWrapper = styled.header`
  position: fixed;
  top: 50%;
  left: 0;
  transform: translateY(calc(-1 * (var(--header-h) / 2)));
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

  @media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
    padding: 0 ${pxToRem(8)};
  }
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

  @media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
    justify-content: flex-end;
  }
`;

const DesktopWrapper = styled.div`
  @media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
    display: none;
  }
`;

const MobileWrapper = styled.div`
  display: none;

  @media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
    display: block;
  }
`;

const BackDrop = styled.div<{ $isActive: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  height: 100dvh;
  width: 100%;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(25px);
  z-index: 99;
  pointer-events: none;
  opacity: ${(props) => (props.$isActive ? 1 : 0)};

  transition: all var(--transition-speed-default) var(--transition-ease);

  @media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
    background: rgba(0, 0, 0, 0.8);
  }
`;

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

  const [backdropActive, setBackdropActive] = useState(false);

  const { width } = useWindowDimensions();

  const wrapperVariants = {
    hidden: {
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        when: "afterChildren",
      },
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        when: "beforeChildren",
        staggerChildren: 0.1,
        delay: width < 1125 ? 0.3 : 0,
      },
    },
  };

  return (
    <>
      <HeaderWrapper className={menuIsActive ? "" : "header"}>
        <LHS>
          <DesktopWrapper>
            <LogoElement
              blinkCount={blinkCount}
              isActive={tabActive !== "information"}
            />
          </DesktopWrapper>
          <MobileWrapper>
            <LogoElement
              blinkCount={blinkCount}
              isActive={tabActive !== "information" && !menuIsActive}
            />
          </MobileWrapper>
          <MobileWrapper>
            <MenuListWrapper
              menuIsActive={menuIsActive}
              wrapperVariants={wrapperVariants}
              tabActive={tabActive}
              menuTabActive={menuTabActive}
              projects={projects}
              siteSettings={siteSettings}
              setCreditsIsActive={setCreditsIsActive}
              setMenuTabActive={setMenuTabActive}
              setMenuIsActive={setMenuIsActive}
              setTabActive={setTabActive}
              setActiveProjectId={setActiveProjectId}
            />
          </MobileWrapper>
          <HeaderTitles
            tabActive={tabActive}
            menuTabActive={menuTabActive}
            siteSettings={siteSettings}
            activeProjectData={activeProjectData}
            projects={projects}
            setActiveProjectId={setActiveProjectId}
            setBackdropActive={setBackdropActive}
          />
        </LHS>
        <RHS>
          <DesktopWrapper>
            <MenuListWrapper
              menuIsActive={menuIsActive}
              wrapperVariants={wrapperVariants}
              tabActive={tabActive}
              menuTabActive={menuTabActive}
              projects={projects}
              siteSettings={siteSettings}
              setCreditsIsActive={setCreditsIsActive}
              setMenuTabActive={setMenuTabActive}
              setMenuIsActive={setMenuIsActive}
              setTabActive={setTabActive}
              setActiveProjectId={setActiveProjectId}
            />
          </DesktopWrapper>
          <MenuTrigger
            menuIsActive={menuIsActive}
            menuTabActive={menuTabActive}
            setMenuIsActive={setMenuIsActive}
            setMenuTabActive={setMenuTabActive}
          />
        </RHS>
      </HeaderWrapper>
      <BackDrop $isActive={menuIsActive || backdropActive} />
    </>
  );
};

export default Header;
