import { lazy } from 'react';
import { createFileRoute } from '@tanstack/react-router';

import CanvasPortal from '@/components/r3f/CanvasPortal';
import { FeatureCards } from '@/components/ui/FeatureCards';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { PageSection } from '@/components/layout/PageSection';

const SpheresBackground = lazy(() => import('@/components/r3f/SpheresBackground'));

export const Route = createFileRoute('/')({ component: HomePage });

function HomePage() {
  return (
    <PageWrapper>
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

      <PageSection width="narrow">
        <div className="flex items-center justify-center gap-4 text-shadow-black/30 text-shadow-lg">
          <h1 className="uppercase">
            Tanstack
            <br /> Three.js
            <span className="block text-gradient-primary text-8xl text-shadow-none">&</span>
            <small>more</small>
          </h1>
        </div>
        <p className="mb-4 text-xl font-medium md:text-2xl">
          A boilerplate for next generation web experiences
        </p>
        <p className="text-neutral-300">
          Full-stack framework powered by <strong>TanStack Start</strong>, enhanced with{' '}
          <strong>React Three Fiber</strong> for immersive 3D experiences, <strong>GSAP</strong> for
          stunning animations, <strong>Lenis</strong> for smooth scrolling, and{' '}
          <strong>Tempus</strong> for high-performance frame synchronization.
        </p>
      </PageSection>

      <PageSection>
        <FeatureCards />
      </PageSection>
    </PageWrapper>
  );
}
