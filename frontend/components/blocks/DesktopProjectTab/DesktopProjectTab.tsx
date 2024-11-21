import styled from "styled-components";
import { ProjectType } from "../../../shared/types/types";
import MuxPlayer from "@mux/mux-player-react/lazy";
import VideoControls from "../VideoControls";
import { useState, useRef, useEffect } from "react";

const DesktopProjectTabWrapper = styled.div`
  height: 100dvh;
  width: 100%;
  position: relative;

  @media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
    display: none;
  }
`;

const MediaWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;

  mux-player {
    --media-object-fit: contain;
    --media-object-position: center;
    --controls: none;

    height: 100%;
    width: 100%;

    transition: all var(--transition-speed-slow) var(--transition-ease);
  }
`;

type Props = {
  activeProjectData: ProjectType | undefined;
};

const DesktopProjectTab = (props: Props) => {
  const { activeProjectData } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [videoLength, setVideoLength] = useState(
    activeProjectData?.media?.asset?.data?.duration
  );

  const muxPlayerRef = useRef<any>(null);

  const handleSeek = (time: number) => {
    if (muxPlayerRef?.current) {
      muxPlayerRef.current.currentTime = time;
    }
  };

  useEffect(() => {
    if (muxPlayerRef.current) {
      if (isPlaying) {
        muxPlayerRef.current.play();
      } else {
        muxPlayerRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    setVideoLength(activeProjectData?.media?.asset?.data?.duration);

    // Get the current time of the video
    const interval = setInterval(() => {
      if (muxPlayerRef.current) {
        let currentTime = muxPlayerRef.current?.currentTime;

        setCurrentTime(currentTime);
      }
    }, 250);

    return () => clearInterval(interval);
  }, [activeProjectData]);

  useEffect(() => {
    if (!muxPlayerRef.current) return;

    muxPlayerRef.current.play();
  }, [isLoading]);

  useEffect(() => {
    muxPlayerRef?.current?.play();
  }, []);

  return (
    <DesktopProjectTabWrapper className="project-tab">
      {activeProjectData?.media?.asset?.playbackId && (
        <MediaWrapper>
          <MuxPlayer
            ref={muxPlayerRef}
            streamType="on-demand"
            playbackId={activeProjectData.media.asset.playbackId}
            autoPlay="muted"
            loop={true}
            thumbnailTime={1}
            preload="auto"
            muted={isMuted}
            playsInline={true}
            loading="viewport"
            style={{ aspectRatio: 16 / 9 }}
          />
        </MediaWrapper>
      )}
      <VideoControls
        isMuted={isMuted}
        isPlaying={isPlaying}
        currentTime={currentTime}
        videoLength={videoLength}
        setIsMuted={setIsMuted}
        setIsPlaying={setIsPlaying}
        handleSeek={handleSeek}
      />
    </DesktopProjectTabWrapper>
  );
};

export default DesktopProjectTab;
