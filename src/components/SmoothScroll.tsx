import { useEffect, useEffectEvent, useRef } from 'react';
import { useLocation } from '@tanstack/react-router';
import { useTempus } from 'tempus/react';
import { ReactLenis, useLenis } from 'lenis/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { LenisProps, LenisRef } from 'lenis/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  gsap.defaults({ ease: 'none' });
  gsap.ticker.lagSmoothing(0);
  gsap.ticker.remove(gsap.updateRoot);
}

export function SmoothScroll({ children, ...props }: Omit<LenisProps, 'autoRaf' | 'ref' | 'root'>) {
  const lenisRef = useRef<LenisRef>(null);
  const { pathname } = useLocation();

  // SYNC LENIS (Priority 0)
  // useTempus automatically handles adding/removing the callback
  useTempus(
    (time: number) => {
      lenisRef.current?.lenis?.raf(time);
    },
    { priority: 0 }
  );

  // SYNC GSAP (Priority 1)
  useTempus(
    (time: number) => {
      gsap.updateRoot(time / 1000);
    },
    { priority: 1 }
  );

  // ROUTE CHANGE HANDLING
  useEffect(() => {
    const lenis = lenisRef.current?.lenis;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });

      // Delay refresh slightly to ensure DOM is fully painted
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }
  }, [pathname]);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      autoRaf={false} // Managed by useTempus
      options={{ lerp: 0.1, duration: 1, smoothWheel: true }}
      {...props}
    >
      <LenisScrollTriggerSync />
      {children}
    </ReactLenis>
  );
}

/**
 * Syncs GSAP ScrollTrigger with Lenis scroll position.
 * Must be rendered inside ReactLenis context.
 */
export function LenisScrollTriggerSync() {
  useEffect(() => {
    ScrollTrigger.update();
  }, []);

  const handleUpdate = useEffectEvent(() => {
    ScrollTrigger.update();
  });

  const handleRefresh = useEffectEvent(() => {
    ScrollTrigger.refresh();
  });

  const lenis = useLenis(handleUpdate);

  useEffect(() => {
    if (lenis) {
      handleRefresh();
    }
  }, [lenis]);

  return null;
}
