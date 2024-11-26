import styled from "styled-components";
import pxToRem from "../../../utils/pxToRem";
import { motion, AnimatePresence } from "framer-motion";
import { SiteSettingsType } from "../../../shared/types/types";
import React, { useState, useEffect } from "react";

const Title = styled(motion.h1)`
  display: flex;
  align-items: center;
  position: relative;
`;

const TextContainer = styled(motion.div)`
  position: absolute;
  left: 100%;
  white-space: nowrap;
  top: 50%;
  transform: translateY(-50%);
`;

const SuperScript = styled.sup`
  font-size: ${pxToRem(12)};
  line-height: ${pxToRem(1)};
  letter-spacing: 0.02em;
  color: var(--colour-white);
  padding-left: ${pxToRem(4)};
`;

const textVariants = {
  initial: (direction: number) => ({
    opacity: 0,
    filter: "blur(2px)",
    y: direction > 0 ? 20 : -20, // Incoming from the bottom, outgoing to the top
    transition: { duration: 0.5, ease: "easeInOut" },
  }),
  animate: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
  exit: (direction: number) => ({
    opacity: 0,
    filter: "blur(2px)",
    y: direction < 0 ? 20 : -20, // Outgoing to the top
    transition: { duration: 0.5, ease: "easeInOut" },
  }),
};

const wrapperVariants = {
  hidden: {
    opacity: 0,
    filter: "blur(1px)",
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

type Props = {
  siteSettings: SiteSettingsType;
};

const HomeTitle = ({ siteSettings }: Props) => {
  const { secondaryServices } = siteSettings;
  const hasSecondaryServices = secondaryServices.length > 0;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for next, -1 for previous

  useEffect(() => {
    if (hasSecondaryServices) {
      const interval = setInterval(() => {
        setDirection(1); // Always moving to the next
        setCurrentIndex(
          (prevIndex) => (prevIndex + 1) % secondaryServices.length
        );
      }, 2000); // 2 seconds

      return () => clearInterval(interval); // Cleanup on component unmount
    }
  }, [hasSecondaryServices, secondaryServices.length]);

  return (
    <Title variants={wrapperVariants}>
      {hasSecondaryServices && (
        <AnimatePresence custom={direction} mode="popLayout">
          <TextContainer
            key={currentIndex}
            variants={textVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            custom={direction}
          >
            {secondaryServices[currentIndex]?.title || ""}
            <SuperScript>
              ({secondaryServices[currentIndex]?.superscript || ""})
            </SuperScript>
          </TextContainer>
        </AnimatePresence>
      )}
    </Title>
  );
};

export default HomeTitle;
