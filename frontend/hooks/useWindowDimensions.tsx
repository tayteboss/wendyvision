import { useState, useEffect } from 'react';
import throttle from 'lodash.throttle';

type WindowDimensions = {
	width: number;
	height: number;
};

const getWindowDimensions = (): WindowDimensions => {
	const { innerWidth: width, innerHeight: height } = window;

	return {
		width,
		height,
	};
};

const useWindowDimensions = (): WindowDimensions => {
	const [windowDimensions, setWindowDimensions] = useState<WindowDimensions>({
		width: 0,
		height: 0,
	});

	useEffect(() => {
		setWindowDimensions(getWindowDimensions());

		const handleResize = (): void => {
			setWindowDimensions(getWindowDimensions());
		}

		const throttledHandleResize = throttle(handleResize, 64, {
			leading: true,
			trailing: true,
		});

		window.addEventListener('resize', throttledHandleResize);
		return () =>
			window.removeEventListener('resize', throttledHandleResize);
	}, []);

	return windowDimensions;
};

export default useWindowDimensions;
