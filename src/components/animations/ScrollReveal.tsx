  'use client';

  import { useLayoutEffect, useRef } from 'react';
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';

  gsap.registerPlugin(ScrollTrigger);

  type ScrollRevealProps = {
    children: React.ReactNode;
    className?: string;
  };

  export default function ScrollReveal({
    children,
    className = '',
  }: ScrollRevealProps) {
    const elementRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
      const element = elementRef.current;

      if (!element) return;

      const animation = gsap.fromTo(
        element,
        {
          y: 80,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
            invalidateOnRefresh: true,
          },
        },
      );

      return () => {
        animation.scrollTrigger?.kill();
        animation.kill();
      };
    }, []);

    return (
      <div ref={elementRef} className={className}>
        {children}
      </div>
    );
  }