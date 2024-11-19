export const mediaString = `
	...,
	mediaType,
	image {
		asset-> {
			url,
			metadata {
				lqip
			}
		},
		alt
	},
	video {
		asset-> {
			playbackId,
		},
	},
	mobileImage {
		asset-> {
			url,
			metadata {
				lqip
			}
		},
		alt
	},
	mobileVideo {
		asset-> {
			playbackId,
		},
	},
`;

export const siteSettingsQueryString = `
	*[_type == 'siteSettings'][0] {
		referenceTitle,
		seoTitle,
		seoDescription,
		email,
		instagramUrl,
		showreel {
			asset-> {
				playbackId,
			},
		},
		primaryService,
		secondaryServices[] {
			title,
			superScript,
		},
	}
`;

export const informationPageQueryString = `
	*[_type == 'informationPage'][0] {
		heroContent,
		services,
		clients[] {
			link,
			name,
		},
		heroVideo {
			asset-> {
				playbackId
			}
		}
	}
`;

export const projectsQueryString = `
	*[_type == 'project'] | order(orderRank) [0...100] {
		title,
		slug,
		client,
		services,
		year,
		media {
			asset-> {
				playbackId
			}
		},
		credits[] {
			title,
			type,
		},
	}
`;
