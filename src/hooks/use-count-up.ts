"use client";

import { useState, useEffect, useRef } from 'react';

export function useCountUp(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = counterRef.current;
    let animationFrameId: number;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let startTimestamp: number | null = null;
          const step = (timestamp: number) => {
            if (!startTimestamp) {
              startTimestamp = timestamp;
            }
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            // ease-out cubic
            const easedProgress = 1 - Math.pow(1 - progress, 3);
            const currentCount = Math.floor(easedProgress * end);
            
            setCount(currentCount);

            if (progress < 1) {
              animationFrameId = requestAnimationFrame(step);
            } else {
              setCount(end); // Ensure it ends on the exact number
            }
          };

          animationFrameId = requestAnimationFrame(step);
          
          if (element) {
            observer.unobserve(element);
          }
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [end, duration]);

  return { count, ref: counterRef };
}
