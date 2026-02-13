import { lazy } from 'react';
import { createFileRoute } from '@tanstack/react-router';

import { Container } from '@/components/Container';
import CanvasPortal from '@/components/r3f/CanvasPortal';
import { FeatureCards } from '@/components/FeatureCards';

const SpheresBackground = lazy(() => import('@/components/r3f/SpheresBackground'));

export const Route = createFileRoute('/')({ component: HomePage });

function HomePage() {
  return (
    <>
      <CanvasPortal
        fullscreen
        loader={false}
        bounds={false}
        camera={false}
        orbitControls={false}
        shadows={false}
        environment={false}
        lights={false}
      >
        <SpheresBackground />
      </CanvasPortal>

      <Container className="relative flex flex-col gap-12">
        <section className="relative mx-auto max-w-2xl text-center">
          <div className="flex items-center justify-center gap-4 text-shadow-black/30 text-shadow-lg">
            <h1 className="uppercase">
              Tanstack
              <br /> Three.js
              <span className="block text-gradient-primary text-8xl text-shadow-none">&</span>
              <small>more</small>
            </h1>
          </div>
          <p className="mb-4 text-xl md:text-3xl">
            A boilerplate for next generation web experiences
          </p>
          <p className="text-neutral-300">
            Full-stack framework powered by TanStack Start, enhanced with React Three Fiber for
            immersive 3D web experiences and GSAP for stunning animations. Built with performance in
            mind.
          </p>
        </section>

        <section className="mx-auto max-w-7xl">
          <FeatureCards />
        </section>
      </Container>
    </>
  );
}
