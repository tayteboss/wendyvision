import styled from "styled-components";
import { ProjectType } from "../../../shared/types/types";
import { AnimatePresence, motion } from "framer-motion";
import pxToRem from "../../../utils/pxToRem";
import { PortableText } from "@portabletext/react";
import useEmblaCarousel from "embla-carousel-react";

const MobileCreditsModalWrapper = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
  background: rgba(0, 0, 0, 0.5);
`;

const CreditsWrapper = styled.div``;

const CreditItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${pxToRem(2)};
`;

const TitleWrapper = styled.div`
  font-size: ${pxToRem(18)};
  line-height: 1.2;
  color: var(--colour-white);
  text-align: center;

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

const EmblaCarousel = styled.div`
  overflow: hidden;
  height: 100%;
`;

const EmblaContainer = styled.div`
  display: flex;
  height: 100%;
`;

const EmblaSlide = styled.div`
  flex: 0 0 50vw;
  height: 100%;
  min-width: 0;
  display: flex;
  justify-content: center;
  align-items: center;
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
  credits: ProjectType["credits"];
  title: ProjectType["title"];
  year: ProjectType["year"];
  client: ProjectType["client"];
  isActive: boolean;
};

const MobileCreditsModal = (props: Props) => {
  const { credits, isActive, title, client, year } = props;

  const hasCredits = credits !== undefined && credits?.length > 0;

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    dragFree: true,
    watchSlides: false,
    watchDrag: true,
    align: "center",
    containScroll: false,
  });

  return (
    <AnimatePresence>
      {isActive && (
        <MobileCreditsModalWrapper
          variants={wrapperVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {hasCredits && (
            <EmblaCarousel ref={emblaRef}>
              <EmblaContainer>
                {title && (
                  <EmblaSlide>
                    <CreditItem>
                      <TitleWrapper>{title}</TitleWrapper>
                      <CreditType className="type-small">Title</CreditType>
                    </CreditItem>
                  </EmblaSlide>
                )}
                {client && (
                  <EmblaSlide>
                    <CreditItem>
                      <TitleWrapper>{client}</TitleWrapper>
                      <CreditType className="type-small">Client</CreditType>
                    </CreditItem>
                  </EmblaSlide>
                )}
                {year && (
                  <EmblaSlide>
                    <CreditItem>
                      <TitleWrapper>{year}</TitleWrapper>
                      <CreditType className="type-small">Year</CreditType>
                    </CreditItem>
                  </EmblaSlide>
                )}
                {credits.map((credit, i) => (
                  <EmblaSlide key={i}>
                    <CreditItem>
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
                  </EmblaSlide>
                ))}
              </EmblaContainer>
            </EmblaCarousel>
          )}
        </MobileCreditsModalWrapper>
      )}
    </AnimatePresence>
  );
};

export default MobileCreditsModal;
