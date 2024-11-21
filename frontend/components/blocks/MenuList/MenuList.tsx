import styled from "styled-components";
import MenuLink from "../../elements/MenuLink";
import { motion } from "framer-motion";
import pxToRem from "../../../utils/pxToRem";
import { useCallback, useEffect, useRef, useState } from "react";
import { ProjectType, SiteSettingsType } from "../../../shared/types/types";
import useEmblaCarousel from "embla-carousel-react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";

const MenuOuter = styled(motion.div)`
  min-height: ${pxToRem(22)};
`;

const MenuListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const EmblaCarousel = styled.div``;

const EmblaContainer = styled.div``;

const EmblaSlide = styled.div`
  @media ${(props) => props.theme.mediaBreakpoints.mobile} {
    overflow: hidden;
    margin-bottom: ${pxToRem(2)};
  }
`;

type Props = {
  menuTabActive: string;
  menuIsActive: boolean;
  projects: ProjectType[];
  siteSettings: SiteSettingsType;
  wrapperVariants: any;
  setMenuTabActive: (tab: string) => void;
  setMenuIsActive: (isActive: boolean) => void;
  setTabActive?: (tab: string) => void;
  setActiveProjectId?: (id: string) => void;
};

const MenuList = (props: Props) => {
  const {
    menuTabActive,
    menuIsActive,
    projects,
    siteSettings,
    wrapperVariants,
    setMenuTabActive,
    setMenuIsActive,
    setTabActive,
    setActiveProjectId,
  } = props;

  const [isHovered, setIsHovered] = useState(false);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const rootNodeRef = useRef<HTMLDivElement>(null);

  const generalLinks = [
    {
      title: "Home",
      id: "home",
    },
    {
      title: "Work",
      id: "workList",
    },
    {
      title: "Information",
      id: "information",
    },
    {
      title: "Contact",
      id: "contact",
    },
  ];

  const contactLinks = [
    {
      title: "Instagram",
      url: siteSettings?.instagramUrl || "",
    },
    {
      title: siteSettings?.email || "",
      url: `mailto:${siteSettings?.email}`,
    },
  ];

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
    emblaApi.scrollTo(0);
  }, [menuIsActive]);

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
    <>
      {menuIsActive && (
        <MenuOuter
          ref={rootNodeRef}
          variants={wrapperVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <MenuListWrapper>
            {menuTabActive !== "workList" && menuTabActive !== "contact" && (
              <EmblaCarousel className="embla" ref={emblaRef}>
                <EmblaContainer className="embla__container">
                  {generalLinks.map((link, i) => (
                    <EmblaSlide key={i} className="embla__slide">
                      <MenuLink
                        key={i}
                        title={link.title}
                        id={link.id}
                        isHovered={isHovered}
                        isActive={true}
                        setIsHovered={setIsHovered}
                        setMenuIsActive={setMenuIsActive}
                        setMenuTabActive={setMenuTabActive}
                        setTabActive={setTabActive}
                      />
                    </EmblaSlide>
                  ))}
                </EmblaContainer>
              </EmblaCarousel>
            )}

            {menuTabActive === "workList" && (
              <EmblaCarousel className="embla" ref={emblaRef}>
                <EmblaContainer className="embla__container">
                  {projects.map((link, i) => (
                    <EmblaSlide key={i} className="embla__slide">
                      <MenuLink
                        key={i}
                        title={link.title}
                        client={link.client}
                        services={link.services}
                        id={link.slug?.current}
                        isProjectType={true}
                        isHovered={isHovered}
                        isActive={activeSlideIndex === i}
                        setIsHovered={setIsHovered}
                        setMenuIsActive={setMenuIsActive}
                        setMenuTabActive={setMenuTabActive}
                        setTabActive={setTabActive}
                        setActiveProjectId={setActiveProjectId}
                      />
                    </EmblaSlide>
                  ))}
                </EmblaContainer>
              </EmblaCarousel>
            )}

            {menuTabActive === "contact" &&
              contactLinks.map((link, i) => (
                <MenuLink
                  key={i}
                  title={link.title}
                  url={link.url}
                  isContactType={true}
                  isActive={true}
                  isHovered={isHovered}
                  setIsHovered={setIsHovered}
                  setMenuIsActive={setMenuIsActive}
                  setMenuTabActive={setMenuTabActive}
                  setTabActive={setTabActive}
                  setActiveProjectId={setActiveProjectId}
                />
              ))}
          </MenuListWrapper>
        </MenuOuter>
      )}
    </>
  );
};

export default MenuList;
