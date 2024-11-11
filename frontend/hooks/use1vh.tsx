import { useEffect } from 'react';

const use1vh = () => {
	useEffect(() => {
		const set1vh = () => {
			const vh: number = document.documentElement.clientHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		};
		set1vh();
		window.addEventListener('resize', set1vh);
		return () => {
			window.removeEventListener('resize', set1vh);
		};
	}, []);
};
export default use1vh;
