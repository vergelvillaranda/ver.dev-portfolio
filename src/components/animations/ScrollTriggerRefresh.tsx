'use client';

import { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function ScrollTriggerRefresh() {
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();

    window.addEventListener('load', refresh);

    if ('fonts' in document) {
      document.fonts.ready.then(refresh);
    }

    // Catch-all: refresh whenever the page's overall height changes,
    // e.g. from lazy images, canvas/WebGL sizing, or other late layout shifts.
    let timeout: ReturnType<typeof setTimeout>;
    const resizeObserver = new ResizeObserver(() => {
      clearTimeout(timeout);
      timeout = setTimeout(refresh, 200);
    });
    resizeObserver.observe(document.body);

    // Fallback: in case nothing above fires quickly enough, force a
    // refresh shortly after mount too.
    const fallback = setTimeout(refresh, 1000);

    return () => {
      window.removeEventListener('load', refresh);
      resizeObserver.disconnect();
      clearTimeout(timeout);
      clearTimeout(fallback);
    };
  }, []);

  return null;
}