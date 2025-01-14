import styled from "styled-components";
import pxToRem from "../../../utils/pxToRem";

type Props = {
  setIsPlaying: (isPlaying: boolean) => void;
  isPlaying: boolean;
  isMobile: boolean;
};

const PlayTriggerWrapper = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: ${pxToRem(4)};
  color: var(--colour-white);
  width: 43px;
  margin-right: ${pxToRem(16)};
  text-align: center;

  @media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
    display: none;
  }
`;

const PlayTrigger = (props: Props) => {
  const { setIsPlaying, isPlaying, isMobile } = props;

  return (
    <PlayTriggerWrapper
      className="type-small"
      onClick={() => setIsPlaying(!isPlaying)}
    >
      {isPlaying ? "Pause" : "Play"}
    </PlayTriggerWrapper>
  );
};

export default PlayTrigger;
