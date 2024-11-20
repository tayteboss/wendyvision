import styled from "styled-components";
import Eye from "../../icons/Eye";
import Logo from "../../icons/Logo";
import pxToRem from "../../../utils/pxToRem";
import { AnimatePresence, motion } from "framer-motion";

const LogoWrapper = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: ${pxToRem(3)};
  padding-top: 4px;
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
  blinkCount: number;
  isActive: boolean;
};

const LogoElement = (props: Props) => {
  const { blinkCount, isActive } = props;

  return (
    <AnimatePresence>
      {isActive && (
        <LogoWrapper
          variants={wrapperVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <Eye useBlink={blinkCount} />
          <Logo />
        </LogoWrapper>
      )}
    </AnimatePresence>
  );
};

export default LogoElement;
