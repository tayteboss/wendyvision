import styled from "styled-components";
import { ProjectType } from "../../../shared/types/types";

const ProjectTabWrapper = styled.div``;

type Props = {
  projects: ProjectType[];
  activeProjectData: ProjectType | undefined;
};

const ProjectTab = (props: Props) => {
  const { projects, activeProjectData } = props;

  return <ProjectTabWrapper>ProjectTab</ProjectTabWrapper>;
};

export default ProjectTab;
