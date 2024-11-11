import { useEffect } from 'react';

const useHeaderHeight = () => {
	useEffect(() => {
		const setHeaderHeight = (): void => {
			const header: HTMLElement | null = document.querySelector('.header');

			if (!header) return;
			const headerHeight = header.offsetHeight;

			document.documentElement.style.setProperty(
				'--header-h',
				`${headerHeight}px`
			);
		};

		setHeaderHeight();

		window.addEventListener('resize', setHeaderHeight);

		return () => {
			window.removeEventListener('resize', setHeaderHeight);
		};
	}, []);
};

export default useHeaderHeight;
