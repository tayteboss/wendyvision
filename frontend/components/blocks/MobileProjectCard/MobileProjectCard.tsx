import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { ProjectType } from "../../../shared/types/types";
import MuxPlayer from "@mux/mux-player-react/lazy";
import pxToRem from "../../../utils/pxToRem";
import VideoControls from "../VideoControls";

const MobileProjectCardWrapper = styled.div<{
  $isActiveIndex: boolean;
  $aspectRatioPercentage: string;
}>`
  width: 100%;
  padding-top: ${(props) => props.$aspectRatioPercentage};
  position: relative;
  filter: brightness(${(props) => (props.$isActiveIndex ? "1" : "0.15")});
  transition: all var(--transition-speed-slow) var(--transition-ease);
`;

const MediaWrapper = styled.div`
  position: absolute;
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

const ContentWrapper = styled.div<{ $isActive: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  padding: ${pxToRem(8)} ${pxToRem(80)} ${pxToRem(8)} ${pxToRem(8)};
  z-index: 10;
  mix-blend-mode: difference;
  color: var(--colour-white);
  opacity: ${(props) => (props.$isActive ? "1" : "0")};
  font-size: ${pxToRem(12)};
  line-height: ${pxToRem(12)};
  letter-spacing: -0.05em;
  transition: all var(--transition-speed-default) var(--transition-ease);
`;

const CreditsTrigger = styled.button<{ $isActive: boolean }>`
  position: absolute;
  top: 0;
  right: 0;
  padding: ${pxToRem(8)};
  z-index: 10;
  mix-blend-mode: difference;
  color: var(--colour-white);
  opacity: ${(props) => (props.$isActive ? "1" : "0")};
  text-align: right;
  font-size: ${pxToRem(12)};
  line-height: ${pxToRem(12)};
  letter-spacing: -0.05em;
  transition: all var(--transition-speed-default) var(--transition-ease);
`;

type Props = {
  title: ProjectType["title"];
  id: ProjectType["slug"]["current"];
  client: ProjectType["client"];
  services: ProjectType["services"];
  media: ProjectType["media"];
  aspectRatio: ProjectType["media"]["asset"]["data"]["aspect_ratio"];
  isActiveIndex: boolean;
  mobileCreditsIsActive: boolean;
  setMobileCreditsIsActive: (isActive: boolean) => void;
};

const MobileProjectCard = ({
  title,
  client,
  services,
  media,
  isActiveIndex,
  mobileCreditsIsActive,
  aspectRatio,
  setMobileCreditsIsActive,
}: Props) => {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [aspectRatioPercentage, setAspectRatioPercentage] = useState("56.25%");

  const muxPlayerRef = useRef<HTMLVideoElement | null>(null);

  const playVideo = async () => {
    if (!muxPlayerRef.current) return;
    try {
      await muxPlayerRef.current.play();
    } catch (err) {
      console.warn("Autoplay failed, retrying muted:", err);
      muxPlayerRef.current.muted = true;
      await muxPlayerRef.current.play();
    }
  };

  const handleVideoState = () => {
    if (!muxPlayerRef.current) return;
    if (isActiveIndex) {
      playVideo();
      setIsPlaying(true);
    } else {
      muxPlayerRef.current.pause();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    handleVideoState();
  }, [isActiveIndex]);

  useEffect(() => {
    const [width, height] = aspectRatio.split(":").map(Number);
    const percentage = (height / width) * 100;
    setAspectRatioPercentage(`${percentage}%`);
  }, [aspectRatio]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (muxPlayerRef.current) {
        setCurrentTime(muxPlayerRef.current.currentTime || 0);
      }
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <MobileProjectCardWrapper
      $isActiveIndex={isActiveIndex}
      $aspectRatioPercentage={aspectRatioPercentage}
      onClick={handleVideoState}
    >
      {media.asset?.playbackId && (
        <MediaWrapper>
          <MuxPlayer
            ref={muxPlayerRef}
            streamType="on-demand"
            playbackId={media.asset.playbackId}
            loop
            muted={isMuted}
            onCanPlay={handleVideoState}
            onLoadedData={handleVideoState}
          />
        </MediaWrapper>
      )}
      <ContentWrapper $isActive={isActiveIndex}>
        {client} / {title}
        {services?.length > 0 && ` (${services.join(", ")})`}
      </ContentWrapper>
      <CreditsTrigger
        $isActive={isActiveIndex}
        onClick={() => setMobileCreditsIsActive(!mobileCreditsIsActive)}
      >
        {mobileCreditsIsActive ? "Close" : "Credits"}
      </CreditsTrigger>
      <VideoControls
        isMuted={isMuted}
        isPlaying={isPlaying}
        currentTime={currentTime}
        videoLength={media?.asset?.data?.duration}
        setIsMuted={setIsMuted}
        setIsPlaying={setIsPlaying}
        handleSeek={(time) => {
          if (muxPlayerRef.current) muxPlayerRef.current.currentTime = time;
        }}
      />
    </MobileProjectCardWrapper>
  );
};

export default MobileProjectCard;
