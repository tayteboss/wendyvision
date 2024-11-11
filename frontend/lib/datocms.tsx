import { GraphQLClient } from 'graphql-request';
import ALL_PAGES_QUERY from './datoQueries/allPages';
import PAGE_QUERY from './datoQueries/page';
import SITE_QUERY from './datoQueries/siteData';

type Request = {
	query: string;
	variables: {};
	preview: boolean;
};

const request = ({ query, variables, preview }: Request) => {
	const endpoint = preview
		? `https://graphql.datocms.com/preview`
		: `https://graphql.datocms.com/`;
	const client = new GraphQLClient(endpoint, {
		headers: {
			authorization: `Bearer ${process.env.DATOCMS_API_TOKEN}`,
		},
	});
	return client.request(query, variables);
};

export const getSiteData = async () => {
	const data = await request({
		query: SITE_QUERY,
		variables: { siteId: process.env.SITE_ID },
		preview: false
	});

	return data;
};

export const getAllPages = async (siteId: number) => {
	const data = await request({
		query: ALL_PAGES_QUERY,
		variables: { siteId },
		preview: false
	});

	return data;
};

export const getPage = async (pageSlug: string, preview: boolean) => {
	const data = await request({
		query: PAGE_QUERY,
		variables: { pageSlug },
		preview,
	});

	return data;
};
