import { motion } from "framer-motion";
import styled from "styled-components";
import pxToRem from "../../../utils/pxToRem";
import Link from "next/link";

const MenuLinkWrapper = styled(motion.button)<{ $isHovered: boolean }>`
  text-align: left;
  color: var(--colour-white);
`;

const Inner = styled.span<{ $isHovered: boolean; $isActive: boolean }>`
  opacity: ${(props) =>
    !props.$isActive ? "0.25" : props.$isHovered ? "0.25" : "1"};
  filter: blur(${(props) => (props.$isHovered ? "1px" : "0px")});

  transition: all var(--transition-speed-default) var(--transition-ease);

  &:hover {
    opacity: 1 !important;
    filter: blur(0px) !important;
  }

  a {
    color: var(--colour-white);
    text-decoration: none;
  }
`;

const Title = styled.span``;

const Spacer = styled.span`
  padding: 0 ${pxToRem(4)} 0 ${pxToRem(1)};
`;

const SuperScript = styled.sup`
  font-size: ${pxToRem(12)};
  line-height: ${pxToRem(1)};
  letter-spacing: 0.02em;
  padding-left: ${pxToRem(4)};
`;

const wrapperVariants = {
  hidden: {
    opacity: 0,
    filter: "blur(1px)",
    x: -1,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    x: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

type Props = {
  title: string;
  id?: string;
  isHovered: boolean;
  isProjectType?: boolean;
  isActive: boolean;
  client?: string;
  services?: string[];
  url?: string;
  isContactType?: boolean;
  setIsHovered: (isHovered: boolean) => void;
  setMenuIsActive: (isActive: boolean) => void;
  setMenuTabActive: (tab: string) => void;
  setTabActive?: (tab: string) => void;
  setActiveProjectId?: (id: string) => void;
};

const MenuLink = (props: Props) => {
  const {
    title,
    id,
    isHovered,
    isProjectType,
    isActive,
    client,
    services,
    url,
    isContactType,
    setIsHovered,
    setMenuIsActive,
    setMenuTabActive,
    setTabActive,
    setActiveProjectId,
  } = props;

  const handleMenuIsActive = () => {
    if (id === "workList") {
      setMenuTabActive(id);
      setIsHovered(false);
    }
    if (id === "contact") {
      setMenuTabActive(id);
      setIsHovered(false);
    }
    if (id === "home" || id === "information") {
      setMenuTabActive(id);
      setMenuIsActive(false);
      setIsHovered(false);
    }
    if (isProjectType) {
      setMenuTabActive("project");
      setActiveProjectId && setActiveProjectId(id || "");
      setIsHovered(false);
      setMenuIsActive(false);
      setTabActive && setTabActive("project");
    }
  };

  const hasServices = services && services.length > 0;

  return (
    <MenuLinkWrapper
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
      onClick={() => {
        handleMenuIsActive();
      }}
      $isHovered={isHovered}
      variants={wrapperVariants}
    >
      <Inner $isHovered={isHovered} $isActive={isActive}>
        {isProjectType && (
          <Title>
            {client || ""} <Spacer>/</Spacer>
            <Title>{title || ""}</Title>
            {hasServices && (
              <SuperScript>
                (
                {services.map((service: string, i: number) => (
                  <span key={`service-${i}`}>
                    {service}
                    {i < services.length - 1 && " —"}
                  </span>
                ))}
                )
              </SuperScript>
            )}
          </Title>
        )}
        {isContactType && url && (
          <Link href={url} target="_blank">
            <Title>{title}</Title>
          </Link>
        )}
        {!isProjectType && !isContactType && title}
      </Inner>
    </MenuLinkWrapper>
  );
};

export default MenuLink;
