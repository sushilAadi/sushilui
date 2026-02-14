'use client';
import { useEffect, useRef } from 'react';
// import Lenis from 'lenis';
// import { useGSAP } from '@gsap/react';

export default function SmoothScroll({ children }) {
  // const lenis = useRef(null);

  // useGSAP(() => {
  //   lenis.current = new Lenis();

  //   function raf(time) {
  //     lenis.current.raf(time);
  //     requestAnimationFrame(raf);
  //   }

  //   requestAnimationFrame(raf);
  // }, []);

  return <>{children}</>;
}
