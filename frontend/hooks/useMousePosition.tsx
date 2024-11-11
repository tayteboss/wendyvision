import { useEffect, useState } from 'react';
import throttle from 'lodash.throttle';

type ReturnMousePosition = {
	x: number;
	y: number;
};

type PositionState = {
	x: number;
	y: number;
};

export const useMousePosition = (): ReturnMousePosition => {
	const [position, setPosition] = useState<PositionState>({ x: 0, y: 0 });

	const setFromEvent = (e: MouseEvent) => setPosition({ x: e.clientX, y: e.clientY });

	useEffect(() => {
		const throttledSetFromEvent = throttle(setFromEvent, 50);
		window.addEventListener('mousemove', throttledSetFromEvent);

		return () => {
			window.removeEventListener('mousemove', throttledSetFromEvent);
		};
	}, []);

	return position;
};
