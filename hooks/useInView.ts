"use client";

import { useEffect, useState, RefObject } from "react";

interface UseInViewProps {
  ref: RefObject<HTMLElement>;
  once?: boolean;
  isFrames?: boolean;
}

const useInView = ({ ref, once = true, isFrames = false }: UseInViewProps) => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isViewing, setIsViewing] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (once) {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
          }
          return;
        }
        if (entry && entry) {
          setIsViewing(entry.isIntersecting);
          return;
        }
      },
      {
        // root: ref?.current,
        // rootMargin: "100px",
        threshold: isFrames ? 0.8 : undefined,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
      return () => {
        observer.unobserve(currentRef);
      };
    }
  }, [ref, hasAnimated, once, isFrames]);

  return once ? hasAnimated : isViewing;
};

export default useInView;
