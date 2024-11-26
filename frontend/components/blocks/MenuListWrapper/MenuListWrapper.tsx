import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import pxToRem from "../../../utils/pxToRem";
import CreditsTrigger from "../../elements/CreditsTrigger";
import MenuList from "../MenuList/MenuList";
import { ProjectType, SiteSettingsType } from "../../../shared/types/types";

const MenuListWrapperWrapper = styled.div`
  display: flex;
  gap: ${pxToRem(8)};
`;

const CreditListWrapper = styled(motion.div)`
  display: flex;
  gap: ${pxToRem(8)};

  @media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
    display: none;
  }
`;

const MenuSpacer = styled(motion.span)``;

type Props = {
  menuTabActive: string;
  menuIsActive: boolean;
  tabActive: string;
  projects: ProjectType[];
  siteSettings: SiteSettingsType;
  wrapperVariants: any;
  isMobile?: boolean;
  setMenuIsActive: (value: boolean) => void;
  setMenuTabActive: (tab: string) => void;
  setTabActive?: (tab: string) => void;
  setActiveProjectId?: (id: string) => void;
  setCreditsIsActive: (isActive: boolean) => void;
  setBackdropActive?: (isActive: boolean) => void;
};

const MenuListWrapper = (props: Props) => {
  const {
    menuTabActive,
    menuIsActive,
    tabActive,
    projects,
    siteSettings,
    wrapperVariants,
    isMobile,
    setMenuTabActive,
    setMenuIsActive,
    setTabActive,
    setActiveProjectId,
    setCreditsIsActive,
    setBackdropActive,
  } = props;

  return (
    <MenuListWrapperWrapper>
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
              setBackdropActive={setBackdropActive}
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
          tabActive={tabActive}
          isMobile={isMobile}
          setMenuTabActive={setMenuTabActive}
          setMenuIsActive={setMenuIsActive}
          setTabActive={setTabActive}
          setActiveProjectId={setActiveProjectId}
        />
      </AnimatePresence>
    </MenuListWrapperWrapper>
  );
};

export default MenuListWrapper;
