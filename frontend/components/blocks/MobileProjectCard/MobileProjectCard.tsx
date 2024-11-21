import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { ProjectType } from "../../../shared/types/types";
import MuxPlayer from "@mux/mux-player-react/lazy";
import pxToRem from "../../../utils/pxToRem";
import VideoControls from "../VideoControls";
import MobileCreditsModal from "../MobileCreditsModal";

const MobileProjectCardWrapper = styled.div<{ $isActiveIndex: boolean }>`
  width: 100%;
  padding-top: 56.25%;
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
  padding: ${pxToRem(16)} ${pxToRem(80)} ${pxToRem(16)} ${pxToRem(16)};
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
  padding: ${pxToRem(16)};
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
  year: ProjectType["year"];
  media: ProjectType["media"];
  credits: ProjectType["credits"];
  isActiveIndex: boolean;
};

const MobileProjectCard = ({
  title,
  client,
  services,
  year,
  media,
  credits,
  isActiveIndex,
}: Props) => {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [creditsIsActive, setCreditsIsActive] = useState(false);
  const muxPlayerRef = useRef<HTMLVideoElement | null>(null);

  const handleVideoState = () => {
    if (muxPlayerRef.current) {
      if (isActiveIndex) {
        muxPlayerRef.current.play().catch((error) => {
          console.error("Error playing video:", error);
        });
        setIsPlaying(true);
      } else {
        muxPlayerRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  useEffect(() => {
    handleVideoState();
  }, [isActiveIndex, muxPlayerRef]);

  useEffect(() => {
    if (muxPlayerRef.current) {
      // Ensure video state is updated correctly on initial load and subsequent changes
      handleVideoState();
    }
  }, [isActiveIndex, muxPlayerRef]);

  useEffect(() => {
    if (isActiveIndex && muxPlayerRef.current) {
      // Play the video on the initial load if it's the active index
      muxPlayerRef.current.play().catch((error) => {
        console.error("Error playing video on initial load:", error);
      });
      setIsPlaying(true);
    }
  }, [muxPlayerRef]); // Run only once on mount

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
      onClick={() => handleVideoState()}
    >
      {media.asset?.playbackId && (
        <MediaWrapper>
          <MuxPlayer
            ref={muxPlayerRef}
            streamType="on-demand"
            playbackId={media.asset.playbackId}
            autoPlay={false}
            loop
            muted={isMuted}
            style={{ aspectRatio: "16 / 9" }}
            onCanPlay={() => handleVideoState()}
            onLoadedData={() => handleVideoState()}
          />
        </MediaWrapper>
      )}
      <ContentWrapper $isActive={isActiveIndex}>
        {client} / {title}
        {services?.length > 0 && ` (${services.join(", ")})`}
      </ContentWrapper>
      <CreditsTrigger
        $isActive={isActiveIndex}
        onClick={() => setCreditsIsActive(!creditsIsActive)}
      >
        {creditsIsActive ? "Close" : "Credits"}
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
      <MobileCreditsModal
        credits={credits}
        title={title}
        client={client}
        year={year}
        isActive={creditsIsActive}
      />
    </MobileProjectCardWrapper>
  );
};

export default MobileProjectCard;
