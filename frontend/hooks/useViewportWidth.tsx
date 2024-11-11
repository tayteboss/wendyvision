import { useState, useEffect } from 'react';

const useViewportWidth = (): string => {
	const [breakpoint, setBreakpoint] = useState<string>('');

	const handleResize = (): void => {
		const width: number = window.innerWidth;

		if (width < 550) {
			setBreakpoint('mobile');
		}
		if (width > 551 && width < 768) {
			setBreakpoint('tabletPortrait');
		}
		if (width > 769 && width < 1124) {
			setBreakpoint('tabletMedium');
		}
		if (width > 1125 && width < 1440) {
			setBreakpoint('tabletLandscape');
		}
		if (width > 1441 && width < 1679) {
			setBreakpoint('laptop');
		}
		if (width > 1680) {
			setBreakpoint('desktop');
		}
	};

	useEffect(() => {
		window.addEventListener('resize', handleResize);
		handleResize();

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return breakpoint;
};

export default useViewportWidth;
