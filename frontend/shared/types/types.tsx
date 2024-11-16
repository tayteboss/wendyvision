export type MediaType = {
  mediaType: "video" | "image";
  video: { asset: { playbackId: string } };
  image: { asset: { url: string; metadata: { lqip: string } }; alt: string };
  mobileImage?: { asset: { url: string; metadata: { lqip: string } } };
  mobileVideo?: { asset: { playbackId: string } };
  caption?: string;
};

export type TransitionsType = {
  hidden: {
    opacity: number;
    transition: {
      duration: number;
    };
  };
  visible: {
    opacity: number;
    transition: {
      duration: number;
      delay?: number;
    };
  };
};

export type SlugType = {
  current: string;
};

export type SiteSettingsType = {
  title: string;
  seoTitle: string;
  seoDescription: string;
  referenceTitle: string;
  email: string;
  instagramUrl: string;
  showreel: {
    asset: {
      playbackId: string;
    };
  };
};

export type InformationPageType = {
  referenceTitle: string;
  heroContent: any[];
  services: string[];
  clients: Array<{
    link: string;
    name: string;
  }>;
};

export type ProjectType = {
  _id: string;
  title: string;
  slug: SlugType;
  client: string;
  services: string[];
  year: string;
  media: MediaType;
  credits: any[];
};
