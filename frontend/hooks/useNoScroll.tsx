const useNoScroll = (addNoScroll: boolean) => {
	const html: HTMLElement | null = document.querySelector('html');

	if (!html) return;

	if (addNoScroll) {
		html.classList.add('no-scroll');
	} else {
		html.classList.remove('no-scroll');
	}
};

export default useNoScroll;
