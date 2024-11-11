const PAGE_QUERY: string = `
	query Query($pageSlug: String) {
		page(filter: {pageSlug: {eq: $pageSlug}}) {
			pageSlug
			seo: _seoMetaTags {
				attributes
				content
				tag
			}
		}
	}
`;

export default PAGE_QUERY;
