// ImageClipDiagonalLBottomToRTop.tsx
import { FC, useRef, useEffect, useState, RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  parentRef: RefObject<HTMLDivElement | HTMLSpanElement>;
  src: string;
  clipClass?: string;
  slices?: number;
}

const ImageClipDiagonalLBottomToRTop: FC<Props> = ({ parentRef, src, clipClass = "", slices = 8 }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setDimensions({ width, height });
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!containerRef.current || !dimensions || !parentRef.current) return;
    const slicesEl = containerRef.current.querySelectorAll<HTMLDivElement>(".slice");

    const ctx = gsap.context(() => {
      slicesEl.forEach((slice, i) => {
        const fromX = i % 2 === 0 ? -dimensions.width : dimensions.width;
        const fromY = i % 2 === 0 ? dimensions.height : -dimensions.height;
        const toX = i % 2 === 0 ? dimensions.width : -dimensions.width;
        const toY = i % 2 === 0 ? -dimensions.height : dimensions.height;

        gsap.fromTo(slice,
          { x: fromX, y: fromY, opacity: 0 },
          {
            x: 0, y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
            scrollTrigger: { trigger: parentRef.current, start: "top 80%", end: "top 40%", scrub: true }
          });

        gsap.to(slice, {
          x: toX, y: toY, opacity: 0, duration: 0.8, ease: "power3.in",
          scrollTrigger: { trigger: parentRef.current, start: "bottom 60%", end: "bottom top", scrub: true }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [dimensions, slices]);

  if (!dimensions) return <div ref={containerRef} className={`relative overflow-hidden ${clipClass}`} />;

  const { width, height } = dimensions;

  return (
    <div ref={containerRef} className={`relative ${clipClass}`}>
      <img className="opacity-0" src={src} alt="" />
      <div className="absolute left-0 top-0 overflow-hidden" style={{ width, height }}>
        {Array.from({ length: slices }).map((_, i) => (
          <div
            key={i}
            className={`absolute left-0 top-0 w-full h-full slice bg-cover bg-center`}
            style={{
              backgroundImage: `url(${src})`,
              backgroundSize: `${width}px ${height}px`,
              // diagonal clipping handled in CSS via nth-child or utility classes
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageClipDiagonalLBottomToRTop;
