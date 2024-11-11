const formatHTML = (string: string): string => {
	const formattedString: string = string
		? `<p>${string.replace(/\n/g, '<br />')}</p>`
		: '';
	return formattedString;
};

export default formatHTML;
