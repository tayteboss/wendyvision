import styled from "styled-components";
import pxToRem from "../../../utils/pxToRem";

const ProjectTitleButtonWrapper = styled.button<{
  $isActive: boolean;
  $isHovered: boolean;
}>`
  opacity: ${(props) =>
    !props.$isActive ? "0.25" : props.$isHovered ? "0.25" : "1"};
  filter: blur(${(props) => (props.$isHovered ? "1px" : "0px")});

  transition: all var(--transition-speed-default) var(--transition-ease);

  &:hover {
    opacity: 1 !important;
    filter: blur(0px) !important;
  }
  color: var(--colour-white);
  text-align: left;
`;

const Spacer = styled.span`
  padding: 0 ${pxToRem(4)};
`;

const SuperScript = styled.sup`
  font-size: ${pxToRem(12)};
  line-height: ${pxToRem(1)};
  letter-spacing: 0.02em;
  padding-left: ${pxToRem(4)};
`;

type Props = {
  title: string;
  client: string;
  services: string[];
  isActive: boolean;
  isHovered: boolean;
  id: string;
  setIsHovered: (isHovered: boolean) => void;
  setActiveProjectId?: (id: string) => void;
};

const ProjectTitleButton = (props: Props) => {
  const {
    title,
    client,
    services,
    isActive,
    isHovered,
    id,
    setIsHovered,
    setActiveProjectId,
  } = props;

  return (
    <ProjectTitleButtonWrapper
      $isActive={isActive}
      $isHovered={isHovered}
      onClick={() => setActiveProjectId && setActiveProjectId(id)}
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
    >
      {client || ""} <Spacer>/</Spacer>
      {title || ""}
      {services.length > 0 && (
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
    </ProjectTitleButtonWrapper>
  );
};

export default ProjectTitleButton;
