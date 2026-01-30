"use client";

import { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

type AnimatedTextProps = {
  text: string;
  el?: keyof JSX.IntrinsicElements;
  className?: string;
  stagger?: number;
  spanClassName?: string;
};

export function AnimatedText({
  text,
  el: Wrapper = 'p',
  className,
  stagger = 0.05,
  spanClassName,
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

    return () => {
        if (ref.current) {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            observer.unobserve(ref.current);
        }
    };
  }, []);

  return (
    <Wrapper ref={ref} className={cn('overflow-hidden', className)}>
      {text.split(' ').map((word, wordIndex) => (
        <span
          key={wordIndex}
          className={cn("inline-block text-reveal", spanClassName)}
          style={{ '--reveal-delay': `${wordIndex * stagger}s` } as React.CSSProperties}
        >
          {word}&nbsp;
        </span>
      ))}
    </Wrapper>
  );
}
