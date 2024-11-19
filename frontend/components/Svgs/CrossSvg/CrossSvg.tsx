type Props = {
	color?: string;
}

const CrossSvg = ({ color = '#FFFFFF' }: Props) => {
	return (
		<svg className="cross-svg" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M1 1L7 7" stroke={color} strokeLinecap="round"/>
			<path d="M1 7L7 0.999998" stroke={color} strokeLinecap="round"/>
		</svg>
	);
};

export default CrossSvg;
