import { motion } from "framer-motion";
import styled from "styled-components";

const TabTitleWrapper = styled(motion.h1)``;

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
  title: string;
};

const TabTitle = (props: Props) => {
  const { title } = props;

  return <TabTitleWrapper variants={wrapperVariants}>{title}</TabTitleWrapper>;
};

export default TabTitle;
