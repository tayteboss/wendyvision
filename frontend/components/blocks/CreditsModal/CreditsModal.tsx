import styled from "styled-components";
import { ProjectType } from "../../../shared/types/types";
import pxToRem from "../../../utils/pxToRem";
import Eye from "../../icons/Eye";
import Logo from "../../icons/Logo";
import { AnimatePresence, motion } from "framer-motion";
import { PortableText } from "@portabletext/react";
import { useRef, useState, useEffect } from "react";

const CreditsModalWrapper = styled(motion.section)`
  position: fixed;
  top: 0;
  left: 0;
  min-height: 100vh;
  width: 100%;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(4px);
  z-index: 500;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LogoWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: ${pxToRem(16)};
  transform: translateY(-50%);
  z-index: 1;
  display: flex;
  align-items: center;
  gap: ${pxToRem(3)};
  overflow: scroll;

  @media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
    .word-mark {
      display: none;
    }
  }
`;

const CloseTrigger = styled.button`
  position: absolute;
  top: 50%;
  right: ${pxToRem(16)};
  transform: translateY(-50%);
  z-index: 1;
  color: var(--colour-white);
  text-align: right;
`;

const CreditsWrapper = styled.div<{ isTwoColumns: boolean }>`
  display: flex;
  flex-direction: ${({ isTwoColumns }) => (isTwoColumns ? "row" : "column")};
  flex-wrap: ${({ isTwoColumns }) => (isTwoColumns ? "wrap" : "nowrap")};
  align-items: ${({ isTwoColumns }) =>
    isTwoColumns ? "flex-start" : "center"};
  justify-content: ${({ isTwoColumns }) =>
    isTwoColumns ? "center" : "flex-start"};
  gap: ${pxToRem(24)};
  max-height: 100vh; /* Ensure it doesn't exceed viewport height */
  overflow-y: auto; /* Scroll if content exceeds viewport height */
  max-width: 70vw;

  & > div {
    flex: ${({ isTwoColumns }) =>
      isTwoColumns ? "1 1 calc(50% - 16px)" : "unset"};
    max-width: ${({ isTwoColumns }) =>
      isTwoColumns ? "calc(50% - 16px)" : "none"};
  }
`;

const CreditItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${pxToRem(8)};
`;

const TitleWrapper = styled.div`
  * {
    font-size: ${pxToRem(18)};
    line-height: 1.2;
    color: var(--colour-white);
    text-align: center;

    a {
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

const CreditType = styled.p`
  color: var(--colour-white);
  text-align: center;
  opacity: 0.75;
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
  creditsIsActive: boolean;
  setCreditsIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  activeProjectData: ProjectType | undefined;
};

const CreditsModal = (props: Props) => {
  const { creditsIsActive, setCreditsIsActive, activeProjectData } = props;
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [isTwoColumns, setIsTwoColumns] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      if (wrapperRef.current) {
        const wrapper = wrapperRef.current;
        const isOverflowing = wrapper.scrollHeight > wrapper.clientHeight;

        // If content overflows, set two columns
        setIsTwoColumns(isOverflowing);
      }
    };

    // Check on mount and when content changes
    checkOverflow();

    // Optional: Recheck on window resize
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [activeProjectData]);

  const hasCredits =
    activeProjectData?.credits !== undefined &&
    activeProjectData?.credits?.length > 0;

  return (
    <AnimatePresence>
      {creditsIsActive && (
        <CreditsModalWrapper
          variants={wrapperVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <LogoWrapper>
            <Eye useBlink={creditsIsActive ? 1 : 0} />
            <Logo />
          </LogoWrapper>
          {hasCredits && (
            <CreditsWrapper ref={wrapperRef} isTwoColumns={isTwoColumns}>
              {activeProjectData.credits.map((credit, i) => (
                <CreditItem key={i}>
                  {credit?.title && (
                    <TitleWrapper>
                      <PortableText value={credit.title} />
                    </TitleWrapper>
                  )}
                  {credit?.type && (
                    <CreditType className="type-small">
                      {credit.type}
                    </CreditType>
                  )}
                </CreditItem>
              ))}
            </CreditsWrapper>
          )}
          <CloseTrigger onClick={() => setCreditsIsActive(false)}>
            Close
          </CloseTrigger>
        </CreditsModalWrapper>
      )}
    </AnimatePresence>
  );
};

export default CreditsModal;
