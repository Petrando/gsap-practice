import { FC, useRef, useEffect, useState, RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  parentRef: RefObject<HTMLDivElement | HTMLSpanElement>;
  src: string;
  clipClass?: string;
  slices?: number;
  staggerEach?: number; // optional: seconds between slices
}

const ImageClipDiagonalLTopToRBottom: FC<Props> = ({
  parentRef,
  src,
  clipClass = "",
  slices = 8,
  staggerEach = 0.06,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null);

  // Observe container size
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

    const { width, height } = dimensions;

    const ctx = gsap.context(() => {
      // ENTER TL (scrubbed): odd from top-left, even from bottom-right → settle at (0,0)
      const enterTl = gsap.timeline({
        scrollTrigger: {
          trigger: parentRef.current,
          start: "top 80%",
          end: "top 40%",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      enterTl.fromTo(
        slicesEl,
        {
          x: (i) => (i % 2 === 1 ? -width :  width),   // odd: from left, even: from right
          y: (i) => (i % 2 === 1 ? -height : height),  // odd: from top,  even: from bottom
          opacity: 0,
        },
        {
          x: 0,
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: { each: staggerEach }, // ripple effect
        }
      );

      // EXIT TL (scrubbed): reverse directions
      const exitTl = gsap.timeline({
        scrollTrigger: {
          trigger: parentRef.current,
          start: "bottom 60%",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      exitTl.to(slicesEl, {
        x: (i) => (i % 2 === 1 ?  width : -width),    // odd: to bottom-right, even: to top-left
        y: (i) => (i % 2 === 1 ?  height : -height),
        opacity: 0,
        duration: 0.8,
        ease: "power3.in",
        stagger: { each: staggerEach, from: "end" },  // reverse ripple on exit
      });
    }, containerRef);

    return () => ctx.revert();
  }, [dimensions, slices, staggerEach, parentRef]);

  if (!dimensions) {
    return <div ref={containerRef} className={`relative overflow-hidden ${clipClass}`} />;
  }

  const { width, height } = dimensions;

  return (
    <div ref={containerRef} className={`relative ${clipClass}`}>
      {/* Hidden image to lock layout ratio */}
      <img className="opacity-0" src={src} alt="" />
      <div className="absolute left-0 top-0 overflow-hidden" style={{ width, height }}>
        {Array.from({ length: slices }).map((_, i) => (
          <div
            key={i}
            className="absolute left-0 top-0 w-full h-full slice bg-cover bg-center"
            style={{
              backgroundImage: `url(${src})`,
              backgroundSize: `${width}px ${height}px`,
              // NOTE: each .slice is clipped diagonally via your CSS (nth-child or utility classes)
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageClipDiagonalLTopToRBottom;
