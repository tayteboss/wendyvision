import styled from "styled-components";
import { ProjectType } from "../../../shared/types/types";
import MuxPlayer from "@mux/mux-player-react/lazy";
import VideoControls from "../VideoControls";
import { useState, useRef, useEffect } from "react";
import pxToRem from "../../../utils/pxToRem";
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
  padding: ${pxToRem(16)};
  z-index: 10;
  mix-blend-mode: difference;
  color: var(--colour-white);
  opacity: ${(props) => (props.$isActive ? "1" : "0")};

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

  transition: all var(--transition-speed-default) var(--transition-ease);
`;

const Spacer = styled.span`
  padding: 0 ${pxToRem(2)};
  color: var(--colour-white);
`;

const SuperScript = styled.span`
  padding-left: ${pxToRem(4)};
  color: var(--colour-white);
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

const MobileProjectCard = (props: Props) => {
  const { title, id, client, services, year, media, credits, isActiveIndex } =
    props;

  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [videoLength, setVideoLength] = useState(media?.asset?.data?.duration);
  const [creditsIsActive, setCreditsIsActive] = useState(false);

  const muxPlayerRef = useRef<any>(null);

  const handleSeek = (time: number) => {
    if (muxPlayerRef?.current) {
      muxPlayerRef.current.currentTime = time;
    }
  };

  useEffect(() => {
    if (muxPlayerRef.current) {
      if (isActiveIndex) {
        muxPlayerRef.current.play();
      } else {
        muxPlayerRef.current.pause();
      }
    }
  }, [isActiveIndex, muxPlayerRef]);

  useEffect(() => {
    setVideoLength(media?.asset?.data?.duration);

    // Get the current time of the video
    const interval = setInterval(() => {
      if (muxPlayerRef.current) {
        let currentTime = muxPlayerRef.current?.currentTime;

        setCurrentTime(currentTime);
      }
    }, 250);

    return () => clearInterval(interval);
  }, [media]);

  return (
    <MobileProjectCardWrapper $isActiveIndex={isActiveIndex}>
      {media.asset?.playbackId && (
        <MediaWrapper>
          <MuxPlayer
            ref={muxPlayerRef}
            streamType="on-demand"
            playbackId={media.asset.playbackId}
            autoPlay="muted"
            loop={true}
            thumbnailTime={1}
            preload="auto"
            muted
            playsInline={true}
            loading="viewport"
            style={{ aspectRatio: 16 / 9 }}
          />
        </MediaWrapper>
      )}
      <ContentWrapper $isActive={isActiveIndex} className="type-small">
        {client || ""} <Spacer>/</Spacer>
        {title || ""}
        {services.length > 0 && (
          <SuperScript className="type-small">
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
      </ContentWrapper>
      <CreditsTrigger
        $isActive={isActiveIndex}
        className="type-small"
        onClick={() => setCreditsIsActive(!creditsIsActive)}
      >
        {creditsIsActive ? "Close" : "Credits"}
      </CreditsTrigger>
      <VideoControls
        isMuted={isMuted}
        isPlaying={isPlaying}
        currentTime={currentTime}
        videoLength={videoLength}
        setIsMuted={setIsMuted}
        setIsPlaying={setIsPlaying}
        handleSeek={handleSeek}
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
