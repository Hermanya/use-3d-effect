import { useSpring } from "react-spring";
import { useState, useEffect } from "react";
import ResizeObserver from "resize-observer-polyfill";

interface Bounds {
	left: number;
	top: number;
	width: number;
	height: number;
}
const initialBounds: Bounds = { left: 0, top: 0, width: 0, height: 0 };
function useBoundingClientRect(ref: React.RefObject<HTMLDivElement>): Bounds {
	const [bounds, set] = useState<Bounds>(initialBounds);
	const [ro] = useState(
		() =>
			new ResizeObserver(([entry]: ResizeObserverEntry[]) =>
				set(entry.target.getBoundingClientRect())
			)
	);
	useEffect(() => {
		if (ref.current) ro.observe(ref.current);
		return () => ro.disconnect();
	}, [ref, ro]);
	return bounds;
}

export const use3dEffect = (
	ref: React.RefObject<HTMLDivElement>
): {
	onMouseLeave: () => void;
	onMouseEnter: (event: React.MouseEvent) => void;
	style: React.CSSProperties;
} => {
	const trans = (x: number, y: number, s: number): String =>
		`perspective(1000px) rotateX(${x}deg) rotateY(${-y}deg) scale(${s})`;

	const [style, api] = useSpring(() => ({
		xys: trans(0, 0, 1),
		config: { mass: 5, tension: 350, friction: 40 },
	}));

	const { top, left, width, height } = useBoundingClientRect(ref);

	const calc = (x: number, y: number): String => {
    //TODO: instead of 'top' that counts from the current viewport the distance, might use something else that count from the document top y=0 
    //TODO: you can also manually change 'top' with the current y=0 of the element but it's not really nice doing this way
		const rY: number =
			y > top + height / 2
				? ((top + height / 2 - y) / (height / 2)) * 10
				: -((top + height / 2 - y) / (height / 2)) * 10;

		const array: number[] = [
			rY,
			((left + width / 2 - x) / (width / 2)) * 10,
			1.1,
		];
		return trans(array[0], array[1], array[2]);
	};

	return {
		onMouseLeave: () =>
			api({
				xys: trans(0, 0, 1),
			}),
		// @ts-ignore
		onMouseMove: ({ pageX: x, pageY: y }: React.MouseEvent) => {
			api({ xys: calc(x, y) });
		},
		style: {
			// @ts-ignore
			transform: style.xys,
		},
	};
};
