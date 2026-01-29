"use client";

import { useState, useEffect, useRef } from 'react';

export function useCountUp(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const frameRate = 1000 / 60;
  const totalFrames = Math.round(duration / frameRate);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const counter = setInterval(() => {
            frame++;
            const progress = (frame / totalFrames) ** 2; // Ease-out
            const currentCount = Math.round(end * progress);
            setCount(currentCount);

            if (frame === totalFrames) {
              clearInterval(counter);
              setCount(end);
            }
          }, frameRate);

          return () => clearInterval(counter);
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }
    
    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    }
  }, [end, duration, totalFrames, frameRate]);

  return { count, ref: counterRef };
}
