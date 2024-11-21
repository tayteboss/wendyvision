import styled from "styled-components";
import pxToRem from "../../../utils/pxToRem";

type Props = {
  setIsMuted: (isMuted: boolean) => void;
  isMuted: boolean;
};

const MuteTriggerWrapper = styled.button`
  width: 47px;
  color: var(--colour-white);
  margin-right: ${pxToRem(32)};
  text-align: center;

  @media ${(props) => props.theme.mediaBreakpoints.mobile} {
    margin-right: 0;
    font-size: ${pxToRem(12)};
    line-height: ${pxToRem(12)};
    letter-spacing: -0.05em;
  }
`;

const MuteTrigger = (props: Props) => {
  const { setIsMuted, isMuted } = props;

  return (
    <MuteTriggerWrapper
      className="type-small"
      onClick={() => setIsMuted(!isMuted)}
    >
      {isMuted ? "Unmute" : "Mute"}
    </MuteTriggerWrapper>
  );
};

export default MuteTrigger;
