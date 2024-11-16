import styled from "styled-components";
import pxToRem from "../../../utils/pxToRem";
import { motion } from "framer-motion";

const Title = styled(motion.h1)``;

const SuperScript = styled.sup`
  font-size: ${pxToRem(12)};
  line-height: ${pxToRem(1)};
  letter-spacing: 0.02em;
`;

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

const HomeTitle = () => {
  return (
    <Title variants={wrapperVariants}>
      Offers Production <SuperScript>(P)</SuperScript> & Art Direction{" "}
      <SuperScript>(AD)</SuperScript>
    </Title>
  );
};

export default HomeTitle;
