type Props = {
	color?: string;
}

const ArrowSvg = ({ color = '#FFFFFF' }: Props) => {
	return (
		<svg className="arrow-svg" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M0.646447 6.64645C0.451184 6.84171 0.451184 7.15829 0.646447 7.35355C0.841709 7.54882 1.15829 7.54882 1.35355 7.35355L0.646447 6.64645ZM7.5 1C7.5 0.723857 7.27614 0.5 7 0.5L2.5 0.5C2.22386 0.5 2 0.723857 2 1C2 1.27614 2.22386 1.5 2.5 1.5H6.5V5.5C6.5 5.77614 6.72386 6 7 6C7.27614 6 7.5 5.77614 7.5 5.5L7.5 1ZM1.35355 7.35355L7.35355 1.35355L6.64645 0.646446L0.646447 6.64645L1.35355 7.35355Z" fill={color}/>
		</svg>
	);
};

export default ArrowSvg;
