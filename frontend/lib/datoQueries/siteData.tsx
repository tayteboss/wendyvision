const SITE_DATA_QUERY: string = `
	query Query($pageSlug: String) {
		page(filter: {pageSlug: {eq: $pageSlug}}) {
			
		}
	}
`;

export default SITE_DATA_QUERY;
