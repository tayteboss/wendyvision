import { motion } from "framer-motion";
import styled from "styled-components";

const CreditsTriggerWrapper = styled(motion.button)`
  color: var(--colour-white);
`;

type Props = {
  wrapperVariants: any;
  setCreditsIsActive: (isActive: boolean) => void;
};

const CreditsTrigger = (props: Props) => {
  const { wrapperVariants, setCreditsIsActive } = props;

  return (
    <CreditsTriggerWrapper
      variants={wrapperVariants}
      onClick={() => setCreditsIsActive(true)}
    >
      Credits
    </CreditsTriggerWrapper>
  );
};

export default CreditsTrigger;
