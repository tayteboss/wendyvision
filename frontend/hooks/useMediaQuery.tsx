import { useEffect, useState } from 'react';
import useWindowDimensions from './useWindowDimensions';

const checkQuery = (query: string) => window.matchMedia(query).matches;

const useMediaQuery = (query: string): boolean => {
	const [isMatching, setIsMatching] = useState<boolean>(false);
	const { width, height } = useWindowDimensions();

	useEffect(() => {
		const newMatchingState: boolean = checkQuery(query);
		if (isMatching !== newMatchingState) {
			setIsMatching(newMatchingState);
		}
	}, [width, height]);

	return isMatching;
};

export default useMediaQuery;
