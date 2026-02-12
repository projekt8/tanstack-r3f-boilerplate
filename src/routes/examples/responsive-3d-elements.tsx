import { lazy } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { RoundedBox } from '@react-three/drei';
import { Container } from '@/components/Container';
import CanvasPortal from '@/components/r3f/CanvasPortal';

const WobbleSphere = lazy(() => import('@/components/r3f/WobbleSphere'));

export const Route = createFileRoute('/examples/responsive-3d-elements')({ component: Page });

function Page() {
  return (
    <div className="flex flex-col gap-20">
      <section className="relative mx-auto max-w-5xl text-center">
        <div className="flex items-center justify-center gap-4 text-shadow-black/30 text-shadow-lg">
          <h1 className="uppercase">
            Tanstack
            <br /> Three.js
            <span className="block text-gradient-primary text-8xl text-shadow-none">&</span>
            <small>more</small>
          </h1>
        </div>
        <p className="mb-4 text-2xl md:text-3xl">
          A boilerplate for next generation web experiences
        </p>
        <p className="text-gray-300">
          Full-stack framework powered by TanStack Start, progressively enhanced with Three.js
          (React Three Fiber) for immersive 3D web experiences and GSAP for stunning animations.
        </p>
      </section>

      <Container className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <section>
          <div className="flex gap-4 text-shadow-black/30 text-shadow-lg">
            <h1>
              Lorem <span className="text-gradient-primary">ipsum</span> dolor sit
            </h1>
          </div>
          <p className="text-gray-300">
            Full-stack framework powered by TanStack Start, progressively enhanced with Three.js
            (React Three Fiber) for immersive 3D web experiences and GSAP for stunning animations.
          </p>
          <p className="text-gray-300">
            Build modern applications with server functions, streaming, type safety and performance
            in mind.
          </p>
        </section>
        <CanvasPortal id="wobble-sphere-trigger" camera environment lights loader bounds>
          <WobbleSphere trigger="#wobble-sphere-trigger" />
        </CanvasPortal>
      </Container>

      <Container className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-4">
        <section>
          <div className="flex gap-4 text-shadow-black/30 text-shadow-lg">
            <h1>
              Lorem <span className="text-gradient-primary">ipsum</span> dolor sit
            </h1>
          </div>
          <p className="text-gray-300">
            Full-stack framework powered by TanStack Start, progressively enhanced with Three.js
            (React Three Fiber) for immersive 3D web experiences and GSAP for stunning animations.
          </p>
          <p className="text-gray-300">
            Build modern applications with server functions, streaming, type safety and performance
            in mind.
          </p>
        </section>

        <CanvasPortal
          camera
          environment
          lights
          loader
          orbitControls
          bounds={{
            margin: 1.8,
          }}
          className="md:order-first"
        >
          <RoundedBox position={[0, 0, 0]} args={[1, 1, 1]}>
            <meshPhysicalMaterial
              color="#ff6345"
              envMapIntensity={0.3}
              clearcoat={0.1}
              clearcoatRoughness={0.1}
              metalness={0.1}
            />
          </RoundedBox>
        </CanvasPortal>
      </Container>
    </div>
  );
}
