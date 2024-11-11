export type MediaType = {
	mediaType: 'video' | 'image';
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

export type ButtonType = {
	url: string;
	pageReference: {
		_ref: string;
	};
	title: string;
};

export type SlugType = {
	current: string;
};

export type SiteSettingsType = {};

export type HomePageType = {
	seoTitle: string;
	seoDescription: string;
};

export type WorkPageType = {
	seoTitle: string;
	seoDescription: string;
};

export type ProjectType = {
	slug: SlugType;
};
