import { FC, useRef, useEffect, useState, RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface IImageClipBox {
    parentRef: RefObject<HTMLDivElement | HTMLSpanElement>;
    src: string;
    clipClass?: string;
    slices?: number;
    direction?: "horizontal" | "vertical" | "diagonal"; // NEW
}

const ImageClipBox: FC<IImageClipBox> = ({
    parentRef,
    src,
    clipClass = "",
    slices = 8,
    direction = "horizontal", // default
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Observe container size
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

    // GSAP context ensures only animations in this scope are reverted
    const ctx = gsap.context(() => {
        slicesEl.forEach((slice, i) => {
        let fromX = 0, fromY = 0;
        let toX = 0, toY = 0;

        if (direction === "horizontal") {
            fromX = i % 2 === 0 ? -dimensions.width : dimensions.width;
            toX = i % 2 === 0 ? dimensions.width : -dimensions.width;
        } else if (direction === "vertical") {
            fromY = i % 2 === 0 ? -dimensions.height : dimensions.height;
            toY = i % 2 === 0 ? dimensions.height : -dimensions.height;
        } else if (direction === "diagonal") {
            fromX = i % 2 === 0 ? -dimensions.width : dimensions.width;
            fromY = i % 2 === 0 ? -dimensions.height : dimensions.height;
            toX = i % 2 === 0 ? dimensions.width : -dimensions.width;
            toY = i % 2 === 0 ? dimensions.height : -dimensions.height;
        }

        // IN animation
        gsap.fromTo(
            slice,
            { x: fromX, y: fromY, opacity: 0 },
            {
            x: 0,
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
                trigger: parentRef.current,
                start: "top 80%",
                end: "top 40%",
                scrub: true,
            },
            }
        );

        // OUT animation
        gsap.to(slice, {
            x: toX,
            y: toY,
            opacity: 0,
            duration: 0.8,
            ease: "power3.in",
            scrollTrigger: {
            trigger: parentRef.current,
            start: "bottom 60%",
            end: "bottom top",
            scrub: true,
            },
        });
        });
    }, containerRef);

    return () => ctx.revert(); // cleanup only local animations
  }, [dimensions, slices, direction]);


  if (!dimensions) {
    return <div ref={containerRef} className={`relative overflow-hidden ${clipClass}`} />;
  }

  const { width, height } = dimensions;
  const sliceHeight = height / slices;

  return (
    <div ref={containerRef} className={`relative ${clipClass}`}>
      {/* hidden img to enforce size ratio */}
      <img className="opacity-0" src={src} alt="" />
      <div
        className="absolute left-0 top-0 overflow-hidden"
        style={{ width, height }}
      >
        {Array.from({ length: slices }).map((_, i) => (
          <div
            key={i}
            className="absolute left-0 w-full slice bg-cover bg-center"
            style={{
              top: `${i * sliceHeight}px`,
              height: `${sliceHeight}px`,
              backgroundImage: `url(${src})`,
              backgroundSize: `${width}px ${height}px`,
              backgroundPosition: `0px -${i * sliceHeight}px`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageClipBox;