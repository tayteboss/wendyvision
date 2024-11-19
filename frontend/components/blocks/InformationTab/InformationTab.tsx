import styled from "styled-components";
import {
  InformationPageType,
  SiteSettingsType,
} from "../../../shared/types/types";
import { motion } from "framer-motion";
import LayoutWrapper from "../../layout/LayoutWrapper";
import MuxPlayer from "@mux/mux-player-react";
import { PortableText } from "@portabletext/react";
import LayoutGrid from "../../layout/LayoutGrid";
import pxToRem from "../../../utils/pxToRem";
import FooterCard from "../FooterCard";

const InformationTabWrapper = styled(motion.section)`
  background: var(--colour-black);
  min-height: 100vh;
  padding-bottom: ${pxToRem(24)};
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 2;
  grid-column: 1 / 8;
  padding-top: ${pxToRem(16)};
  margin-bottom: ${pxToRem(120)};

  * {
    font-size: ${pxToRem(28)};
    font-family: var(--font-graphik-bold);
    color: var(--colour-white);
    line-height: 1.1;
  }

  p {
    margin-bottom: ${pxToRem(20)};
  }
`;

const Blank = styled.div`
  grid-column: 7 / -1;
`;

const MediaWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;

  mux-player {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
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
  siteSettings: SiteSettingsType;
  data: InformationPageType;
};

const InformationTab = (props: Props) => {
  const { siteSettings, data } = props;

  const contactList = [
    {
      name: "Instagram",
      link: siteSettings?.instagramUrl || "#",
    },
    {
      name: siteSettings?.email || "",
      link: `mailto:${siteSettings?.email || ""}`,
    },
  ];
  const creditList = [
    {
      name: "Design by Bien Studio",
      link: "https://www.bienstudio.com.au/",
    },
    {
      name: "Development by Tayte.co",
      link: "https://tayte.co/",
    },
  ];

  return (
    <InformationTabWrapper
      variants={wrapperVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <LayoutWrapper>
        <LayoutGrid>
          {data?.heroContent && (
            <ContentWrapper>
              <PortableText value={data.heroContent} />
            </ContentWrapper>
          )}
          <Blank />
          <FooterCard title="Select Clients" data={data?.clients} />
          <FooterCard title="Services" data={data?.services} isService />
          <FooterCard title="Contact" data={contactList} />
          <FooterCard title="Credits" data={creditList} />
        </LayoutGrid>
      </LayoutWrapper>
      {data?.heroVideo?.asset?.playbackId && (
        <MediaWrapper>
          <MuxPlayer
            streamType="on-demand"
            playbackId={data?.heroVideo?.asset?.playbackId}
            autoPlay="muted"
            loop={true}
            thumbnailTime={1}
            preload="auto"
            muted
            playsInline={true}
          />
        </MediaWrapper>
      )}
    </InformationTabWrapper>
  );
};

export default InformationTab;
