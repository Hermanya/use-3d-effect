import { useSpring } from "react-spring";
import { useState, useEffect } from "react";

type ResizeObserverEntry = any // eslint-disable-line
interface Bounds {
  left: number;
  top: number;
  width: number;
  height: number;
}
const initialBounds: Bounds = { left: 0, top: 0, width: 0, height: 0 };
function useBoundingClientRect(ref: React.RefObject<HTMLDivElement>): Bounds {
  if (!window["ResizeObserver"]) {
    console.warn(`use-3d-effect requires a ResizeObserver polyfill`);
    return initialBounds;
  }
  const [bounds, set] = useState<Bounds>(initialBounds);
  const [ro] = useState(
    () =>
      new window["ResizeObserver"](([entry]: ResizeObserverEntry[]) =>
        set(entry.target.getBoundingClientRect())
      )
  );
  useEffect(() => {
    if (ref.current) ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  return bounds;
}

export const use3dEffect = (
  ref: React.RefObject<HTMLDivElement>
): {
  style: React.CSSProperties;
  onMouseLeave: () => void;
  onMouseEnter: (event: React.MouseEvent) => void;
} => {
  const [props, set] = useSpring(() => ({
    xys: [0, 0, 1],
    config: { mass: 5, tension: 350, friction: 40 }
  }));
  const { top, left, width, height } = useBoundingClientRect(ref);

  const calc = (x: number, y: number): number[] => [
    -((top + height / 2 - y) / (height / 2)) * 10,
    -((left + width / 2 - x) / (width / 2)) * 10,
    1.1
  ];
  const trans = (x: number, y: number, s: number): string =>
    `perspective(1000px) rotateX(${x}deg) rotateY(${-y}deg) scale(${s})`;

  return {
    style: {
      // @ts-ignore
      transform: props.xys.interpolate(trans)
    },
    onMouseLeave: () => set({ xys: [0, 0, 1] }),
    // @ts-ignore
    onMouseMove: ({ pageX: x, pageY: y }: React.MouseEvent) =>
      set({ xys: calc(x, y) })
  };
};
