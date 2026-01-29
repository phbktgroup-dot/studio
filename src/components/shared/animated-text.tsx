"use client";

import { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

type AnimatedTextProps = {
  text: string;
  el?: keyof JSX.IntrinsicElements;
  className?: string;
  stagger?: number;
};

export function AnimatedText({
  text,
  el: Wrapper = 'p',
  className,
  stagger = 0.02,
}: AnimatedTextProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          ref.current?.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <Wrapper ref={ref} className={cn('overflow-hidden', className)}>
      {text.split(' ').map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block">
          {word.split('').map((char, charIndex) => (
            <span
              key={charIndex}
              className="inline-block text-reveal"
              style={{ '--reveal-delay': `${wordIndex * (stagger * 5) + charIndex * stagger}s` } as React.CSSProperties}
            >
              {char}
            </span>
          ))}
          &nbsp;
        </span>
      ))}
    </Wrapper>
  );
}
