import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const useActiveLink = (): string => {
	const [activeLink, setActiveLink] = useState<string>('Home');
	const router = useRouter();

	useEffect(() => {
		if (router.pathname === '/') {
			setActiveLink('Home');
		} else if (router.pathname === '/profile') {
			setActiveLink('Profile');
		} else if (router.pathname === '/services') {
			setActiveLink('Services');
		} else if (router.pathname === '/partners') {
			setActiveLink('Partners');
		} else if (router.pathname === '/contact') {
			setActiveLink('Contact');
		} else {
			setActiveLink('');
		}
	}, [router]);

	return activeLink;
};

export default useActiveLink;
