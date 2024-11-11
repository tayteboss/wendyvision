const robotsPolicy = [{ userAgent: '*', allow: '/' }];
if (
	process.env.NEXT_PUBLIC_ENVIRONMENT === 'staging' ||
	process.env.NEXT_PUBLIC_ENVIRONMENT === 'development'
) {
	robotsPolicy = [{ userAgent: '*', disallow: '/' }];
}

module.exports = {
	siteUrl: process.env.SITE_URL || 'https://localhost:3000',
	generateRobotsTxt: true,
	robotsTxtOptions: {
		policies: robotsPolicy,
	},
};
