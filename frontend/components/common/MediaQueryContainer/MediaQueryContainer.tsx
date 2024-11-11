import { ReactNode } from 'react';
import useMediaQuery from '../../../hooks/useMediaQuery';

type Props = {
	children: ReactNode;
	query: string;
};

const MediaQueryContainer = (props: Props) => {
	const { children, query } = props;

	const showChildren = useMediaQuery(query);

	return showChildren ? { children } : null;
}

export default MediaQueryContainer;

// EXAMPLE USAGE
// <MediaQueryContainer query={`media ${theme.mediaBreakpoints.tabletPortrait}`}>
//	<Component />
// </MediaQueryContainer>;
