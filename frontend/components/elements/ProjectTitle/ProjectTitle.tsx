import styled from "styled-components";
import pxToRem from "../../../utils/pxToRem";
import { motion } from "framer-motion";

const Title = styled(motion.h1)``;

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

const ProjectTitle = () => {
  return <Title variants={wrapperVariants}>Work / Add project list here</Title>;
};

export default ProjectTitle;
