'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

type RevealProps = {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
};

export default function Reveal({
  children,
  delay = 0,
  duration = 1,
  className = '',
}: RevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const element = elementRef.current;

    if (!element) return;

    const animation = gsap.fromTo(
      element,
      {
        y: 60,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration,
        delay,
        ease: 'power3.out',
      },
    );

    return () => {
      animation.kill();
    };
  }, [delay, duration]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}