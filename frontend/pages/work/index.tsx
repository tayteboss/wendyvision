import styled from 'styled-components';
import client from '../../client';
import { motion } from 'framer-motion';
import {
	ProjectType,
	TransitionsType,
	WorkPageType
} from '../../shared/types/types';
import { NextSeo } from 'next-seo';
import {
	projectsQueryString,
	workPageQueryString
} from '../../lib/sanityQueries';
import pxToRem from '../../utils/pxToRem';
import PageBuilder from '../../components/common/PageBuilder';

const PageWrapper = styled(motion.div)`
	padding-top: var(--header-h);
	min-height: 150vh;
	padding-bottom: ${pxToRem(80)};
	background: var(--colour-white);
`;

type Props = {
	data: WorkPageType;
	projects: ProjectType[];
	pageTransitionVariants: TransitionsType;
};

const Page = (props: Props) => {
	const { data, projects, pageTransitionVariants } = props;

	return (
		<PageWrapper
			variants={pageTransitionVariants}
			initial="hidden"
			animate="visible"
			exit="hidden"
		>
			<NextSeo
				title={data?.seoTitle || ''}
				description={data?.seoDescription || ''}
			/>
			<PageBuilder data={projects} />
		</PageWrapper>
	);
};

export async function getStaticProps() {
	// const data = await client.fetch(workPageQueryString);
	// const projects = await client.fetch(projectsQueryString);

	const data = false;
	const projects = false;

	return {
		props: {
			data,
			projects
		}
	};
}

export default Page;
