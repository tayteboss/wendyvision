import styled from "styled-components";
import pxToRem from "../../../utils/pxToRem";
import Eye from "../../icons/Eye";
import Logo from "../../icons/Logo";
import MenuTrigger from "../../elements/MenuTrigger";
import MenuList from "../../blocks/MenuList";
import HomeTitle from "../../elements/HomeTitle";
import { AnimatePresence } from "framer-motion";
import TabTitle from "../../elements/TabTitle";
import { ProjectType } from "../../../shared/types/types";
import ProjectTitle from "../../elements/ProjectTitle";

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
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${pxToRem(3)};
`;

const LHS = styled.div`
  display: flex;
  align-items: center;
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

const Spacer = styled.span``;

const MenuSpacer = styled.span<{ $isActive: boolean }>`
  opacity: ${(props) => (props.$isActive ? 1 : 0)};

  transition: all var(--transition-speed-default) var(--transition-ease);
`;

type Props = {
  menuTabActive: string;
  blinkCount: number;
  menuIsActive: boolean;
  projects: ProjectType[];
  tabActive: string;
  setTab: (tab: string) => void;
  setMenuTabActive: (tab: string) => void;
  setMenuIsActive: (isActive: boolean) => void;
  setTabActive?: (tab: string) => void;
};

const Header = (props: Props) => {
  const {
    blinkCount,
    projects,
    menuTabActive,
    menuIsActive,
    tabActive,
    setMenuTabActive,
    setMenuIsActive,
    setTabActive,
  } = props;

  return (
    <HeaderWrapper className="header">
      <LHS>
        <LogoWrapper>
          <Eye useBlink={blinkCount} />
          <Logo />
        </LogoWrapper>
        <AnimatePresence mode="wait">
          <Spacer key="spacer">/</Spacer>
          {menuTabActive === "home" && <HomeTitle key="home" />}
          {menuTabActive === "workList" && <TabTitle key="work" title="Work" />}
          {menuTabActive === "information" && (
            <TabTitle key="information" title="Information" />
          )}
          {menuTabActive === "contact" && (
            <TabTitle key="contact" title="Contact" />
          )}
          {tabActive === "project" && <ProjectTitle key="project" />}
        </AnimatePresence>
      </LHS>
      <RHS>
        <MenuListWrapper>
          <MenuSpacer key="spacer" $isActive={menuIsActive}>
            /
          </MenuSpacer>
          <MenuList
            menuTabActive={menuTabActive}
            menuIsActive={menuIsActive}
            projects={projects}
            setMenuTabActive={setMenuTabActive}
            setMenuIsActive={setMenuIsActive}
            setTabActive={setTabActive}
          />
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
