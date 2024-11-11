import {
	useInView as useInViewOriginal,
	IntersectionOptions
} from 'react-intersection-observer';
import { useRef } from 'react';

interface InViewProps {
	threshold?: number | number[];
	rootMargin?: string;
	options?: IntersectionOptions;
}

export const useInView = ({
	threshold = 0,
	rootMargin = '0px',
	options
}: InViewProps = {}) => {
	const ref = useRef<any>(null);
	const [inViewRef, inView] = useInViewOriginal({
		threshold,
		rootMargin,
		triggerOnce: true,
		...options
	});

	const setRef = (node: any) => {
		ref.current = node;
		inViewRef(node);
	};

	return [setRef, inView] as const;
};

// Usage
// import { useInView } from "@/hooks/useInView";
// const [ref, inView] = useInView({ threshold: 0.2 });
