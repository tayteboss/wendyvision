import styled from "styled-components";
import pxToRem from "../../../utils/pxToRem";
import { motion } from "framer-motion";
import { ProjectType } from "../../../shared/types/types";
import useEmblaCarousel from "embla-carousel-react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import { useState, useRef, useEffect, useCallback } from "react";
import ProjectTitleButton from "../ProjectTitleButton";

const Title = styled(motion.div)`
  white-space: nowrap;
  display: flex;
  align-items: flex-start;
`;

const Spacer = styled.span`
  padding: 0 ${pxToRem(4)};
`;

const EmblaCarousel = styled.div``;

const EmblaContainer = styled.div``;

const EmblaSlide = styled.div``;

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
  activeProjectData: ProjectType | undefined;
  projects: ProjectType[];
  setActiveProjectId?: (id: string) => void;
  setBackdropActive: (isActive: boolean) => void;
};

const ProjectTitle = (props: Props) => {
  const { activeProjectData, projects, setActiveProjectId, setBackdropActive } =
    props;

  const [isHovered, setIsHovered] = useState(false);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const rootNodeRef = useRef<HTMLDivElement>(null);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: false,
      axis: "y",
      dragFree: false,
      watchSlides: false,
      watchDrag: true,
      align: "start",
      skipSnaps: true,
      containScroll: false,
    },
    [WheelGesturesPlugin()]
  );

  useEffect(() => {
    if (!emblaApi) return;
    const activeProjectIndex = projects.findIndex(
      (project) => project.slug.current === activeProjectData?.slug?.current
    );

    if (activeProjectIndex !== -1) {
      emblaApi.scrollTo(activeProjectIndex);
      setActiveSlideIndex(activeProjectIndex);
    }
  }, [activeProjectData, emblaApi]);

  const updateActiveSlide = useCallback(() => {
    if (!emblaApi || !rootNodeRef.current) return;
    let closestIndex = null;
    let closestDistance = Infinity;
    emblaApi.scrollSnapList().forEach((snap, index) => {
      const slideElement = emblaApi.slideNodes()[index];
      const slideTop =
        slideElement.getBoundingClientRect().top -
        (
          rootNodeRef.current ?? { getBoundingClientRect: () => ({ top: 0 }) }
        ).getBoundingClientRect().top;
      const distance = Math.abs(slideTop);

      if (distance >= 0 && distance <= 20) {
        if (distance < closestDistance) {
          closestIndex = index;
          closestDistance = distance;
        }
      }
    });

    setActiveSlideIndex(closestIndex ? closestIndex : 0);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const friction = 0.5;
    const duration = 10;

    emblaApi.on("pointerUp", (emblaApi) => {
      emblaApi
        .internalEngine()
        .scrollBody.useFriction(friction)
        .useDuration(duration);

      // or just:
      emblaApi.internalEngine().scrollBody.useFriction(friction);
    });

    emblaApi.on("select", (emblaApi) => {
      emblaApi
        .internalEngine()
        .scrollBody.useFriction(friction)
        .useDuration(duration);

      // or just:
      emblaApi.internalEngine().scrollBody.useFriction(friction);
    });

    emblaApi.on("scroll", (emblaApi) => {
      emblaApi
        .internalEngine()
        .scrollBody.useFriction(friction)
        .useDuration(duration);

      // or just:
      emblaApi.internalEngine().scrollBody.useFriction(friction);
    });

    emblaApi.on("scroll", (emblaApi) => {
      const {
        limit,
        target,
        location,
        offsetLocation,
        scrollTo,
        translate,
        scrollBody,
      } = emblaApi.internalEngine();

      let edge: number | null = null;

      if (limit.reachedMax(target.get())) edge = limit.max;
      if (limit.reachedMin(target.get())) edge = limit.min;

      if (edge !== null) {
        offsetLocation.set(edge);
        location.set(edge);
        target.set(edge);
        translate.to(edge);
        translate.toggleActive(false);
        scrollBody.useDuration(0).useFriction(0);
        scrollTo.distance(0, false);
      } else {
        translate.toggleActive(true);
      }
    });

    emblaApi.on("scroll", updateActiveSlide);

    return () => {
      emblaApi.off("scroll", updateActiveSlide);
    };
  }, [emblaApi]);

  return (
    <Title
      variants={wrapperVariants}
      onMouseOver={() => setBackdropActive(true)}
      onMouseOut={() => setBackdropActive(false)}
    >
      Work <Spacer>/</Spacer>
      <EmblaCarousel className="embla" ref={emblaRef}>
        <EmblaContainer className="embla__container">
          {projects.map((project, i) => (
            <EmblaSlide key={i} className="embla__slide">
              <ProjectTitleButton
                title={project?.title}
                client={project?.client}
                services={project?.services}
                id={project?.slug?.current}
                isActive={i === activeSlideIndex}
                setIsHovered={setIsHovered}
                isHovered={isHovered}
                setActiveProjectId={setActiveProjectId}
              />
            </EmblaSlide>
          ))}
        </EmblaContainer>
      </EmblaCarousel>
    </Title>
  );
};

export default ProjectTitle;
