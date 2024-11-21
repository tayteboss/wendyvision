import styled from "styled-components";
import pxToRem from "../../../utils/pxToRem";
import PlayTrigger from "../../elements/PlayTrigger";
import MuteTrigger from "../../elements/MuteTrigger";
import SeekBar from "../../elements/SeekBar";

const ControlsPanelWrapper = styled.div`
  width: 100%;
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: ${pxToRem(16)};

  @media ${(props) => props.theme.mediaBreakpoints.mobile} {
    padding: ${pxToRem(8)} ${pxToRem(16)};
  }
`;

const BottomBar = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  @media ${(props) => props.theme.mediaBreakpoints.mobile} {
    justify-content: flex-end;
  }
`;

type Props = {
  isMuted: boolean;
  isPlaying: boolean;
  currentTime: number;
  videoLength: number | undefined;
  isMobile: boolean;
  setIsMuted: (isMuted: boolean) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  handleSeek: (time: number) => void;
  setIsActive: (isActive: boolean) => void;
};

const ControlsPanel = (props: Props) => {
  const {
    isMuted,
    isPlaying,
    currentTime,
    videoLength,
    isMobile,
    setIsMuted,
    setIsPlaying,
    handleSeek,
  } = props;

  return (
    <ControlsPanelWrapper>
      <BottomBar>
        <PlayTrigger
          setIsPlaying={setIsPlaying}
          isPlaying={isPlaying}
          isMobile={isMobile}
        />
        <MuteTrigger setIsMuted={setIsMuted} isMuted={isMuted} />
        <SeekBar
          videoLength={videoLength}
          currentTime={currentTime}
          handleSeek={handleSeek}
        />
      </BottomBar>
    </ControlsPanelWrapper>
  );
};

export default ControlsPanel;
