import styled from "styled-components";
import { SiteSettingsType } from "../../../shared/types/types";
import { motion } from "framer-motion";
import MuxPlayer from "@mux/mux-player-react";
import { useEffect, useState, useRef } from "react";

const HomeTabWrapper = styled(motion.section)`
  position: fixed;
  top: 0;
  left: 0;
  height: 100dvh;
  width: 100%;

  mux-player {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Inner = styled.div<{ $isActive: boolean }>`
  opacity: ${(props) => (props.$isActive ? 1 : 0)};
  height: 100%;
  width: 100%;

  transition: all var(--transition-speed-default) var(--transition-ease);
`;

const wrapperVariants = {
  hidden: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

type Props = {
  siteSettings: SiteSettingsType;
  isActive: boolean;
};

const HomeTab = (props: Props) => {
  const { siteSettings, isActive } = props;

  const [canPlay, setCanPlay] = useState(false);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      const timer = setTimeout(() => {
        setCanPlay(true);
        isFirstRender.current = false; // Mark as initialized
      }, 2000);

      return () => clearTimeout(timer);
    } else {
      setCanPlay(true); // No delay for subsequent mounts
    }
  }, []);

  return (
    <>
      {isActive && (
        <HomeTabWrapper
          variants={wrapperVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <Inner $isActive={canPlay}>
            <MuxPlayer
              streamType="on-demand"
              playbackId={siteSettings?.showreel?.asset.playbackId}
              loop={true}
              thumbnailTime={1}
              preload="auto"
              muted
              autoPlay="muted"
              playsInline={true}
            />
          </Inner>
        </HomeTabWrapper>
      )}
    </>
  );
};

export default HomeTab;
