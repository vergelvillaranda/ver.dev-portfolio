'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

type TextRevealProps = {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
};

export default function TextReveal({
  children,
  delay = 0,
  duration = 1.1,
  className = '',
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const text = textRef.current;

    if (!container || !text) return;

    const context = gsap.context(() => {
      gsap.fromTo(
        text,
        {
          yPercent: 110,
        },
        {
          yPercent: 0,
          duration,
          delay,
          ease: 'power4.out',
        },
      );
    }, container);

    return () => context.revert();
  }, [delay, duration]);

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <div ref={textRef}>{children}</div>
    </div>
  );
}