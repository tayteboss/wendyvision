import styled from "styled-components";
import { ProjectType } from "../../../shared/types/types";
import useEmblaCarousel from "embla-carousel-react";
import MobileProjectCard from "../MobileProjectCard";
import { useEffect, useState } from "react";

const MobileProjectTabWrapper = styled.div`
  display: none;

  @media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
    display: block;
    background: var(--colour-black);
    min-height: 100dvh;
  }
`;

const EmblaCarousel = styled.div``;

const EmblaContainer = styled.div``;

const EmblaSlide = styled.div`
  &.embla__slide {
    margin-bottom: 0;
  }
`;

type Props = {
  activeProjectDataID: string | undefined;
  projects: ProjectType[];
};

const MobileProjectTab = (props: Props) => {
  const { activeProjectDataID, projects } = props;

  const [activeSlide, setActiveSlide] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    axis: "y",
    dragFree: false,
    watchSlides: false,
    watchDrag: true,
    align: "start",
    skipSnaps: true,
    containScroll: false,
  });

  useEffect(() => {
    if (activeProjectDataID) {
      const index = projects.findIndex(
        (project) => project.slug?.current === activeProjectDataID
      );
      setActiveSlide(index);
      if (emblaApi) {
        emblaApi.scrollTo(index);
      }
    }

    if (emblaApi) {
      emblaApi.on("pointerUp", () => {
        setTimeout(() => {
          setActiveSlide(emblaApi.selectedScrollSnap());
        }, 200);
      });
    }
  }, [emblaApi, activeProjectDataID]);

  return (
    <MobileProjectTabWrapper>
      <EmblaCarousel className="embla" ref={emblaRef}>
        <EmblaContainer className="embla__container">
          {projects.map((project, i) => (
            <EmblaSlide key={i} className="embla__slide">
              <MobileProjectCard
                title={project?.title}
                id={project?.slug?.current}
                client={project?.client}
                services={project?.services}
                year={project?.year}
                media={project?.media}
                credits={project?.credits}
                isActiveIndex={activeSlide === i}
                emblaApi={emblaApi}
              />
            </EmblaSlide>
          ))}
        </EmblaContainer>
      </EmblaCarousel>
    </MobileProjectTabWrapper>
  );
};

export default MobileProjectTab;
