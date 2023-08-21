import React, { useState, useEffect, useRef, HTMLAttributes, FC } from "react";

interface HeadlessSliderCarouselInterface
  extends HTMLAttributes<HTMLDivElement> {
  slides: React.ReactNode[];
  dependency: number;
}

const HeadlessSliderCarousel: FC<HeadlessSliderCarouselInterface> = ({
  slides,
  dependency,
  ...rest
}) => {
  const parentRef = useRef<HTMLDivElement>(null);
  let parent: HTMLDivElement | null = parentRef.current;
  const [scrollLeft, setScrollLeft] = useState<number>(0);
  const [childWidth, setChildWidth] = useState<number>(0);

  const resumeSlides = () => {
    if (parent !== null) {
      const autoScroll = async () => {
        setScrollLeft((prev) => {
          return prev + childWidth;
        });
        if (
          parent != null &&
          scrollLeft >= parent.scrollWidth - parent.clientWidth
        ) {
          setScrollLeft(0);
        }

        parent != null
          ? parent.scrollTo({
              left: scrollLeft,
              behavior: "smooth",
            })
          : "";
      };
      autoScroll();
    }
  };

  useEffect(() => {
    parent = parentRef.current;
    if (parent) {
      setChildWidth(parent.clientWidth);
      setScrollLeft(parent.clientWidth);
    }
  }, []);

  useEffect(() => {
    resumeSlides();
  }, [dependency]);
  return (
    <div ref={parentRef} {...rest}>
      {slides.map((slide: React.ReactNode) => {
        return slide;
      })}
    </div>
  );
};

export default HeadlessSliderCarousel;
