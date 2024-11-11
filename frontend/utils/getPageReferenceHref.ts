const getPageReferenceHref = (ref: string) => {
	if (ref === 'whatToExpectPage') {
		return '/what-to-expect';
	} else if (ref === 'contactPage') {
		return '/contact';
	} else if (ref === 'conversationsPage') {
		return '/conversations';
	} else if (ref === 'workPage') {
		return '/work';
	} else {
		return '/';
	}
};

export default getPageReferenceHref;
