import { createFileRoute } from '@tanstack/react-router';
import { RoundedBox } from '@react-three/drei';
import { Container } from '@/components/Container';
import CanvasPortal from '@/components/r3f/CanvasPortal';
import WobbleSphere from '@/components/r3f/WobbleSphere';

export const Route = createFileRoute('/examples/responsive-3d-elements')({ component: Page });

function Page() {
  return (
    <Container className="flex flex-col gap-25">
      <section className="relative mx-auto max-w-3xl text-center">
        <div className="flex items-center justify-center gap-4 text-shadow-black/30 text-shadow-lg">
          <h1 className="uppercase">
            Responsive <br /> HTML
            <span className="block text-gradient-primary text-8xl text-shadow-none">&</span>
            Three.js <br /> Scenes
          </h1>
        </div>
        <p className="mb-4 text-xl font-medium md:text-2xl">
          Seamlessly integrate Three.js into your document flow
        </p>
        <p className="text-neutral-300">
          Unlock the power of <strong>CanvasPortal</strong> to blend immersive 3D content with
          standard HTML layouts. By leveraging a single <strong>GlobalCanvas</strong>, all scenes
          are rendered through a shared WebGL context, ensuring optimal performance and resource
          efficiency while maintaining pixel-perfect responsiveness and GSAP-driven scroll
          animations.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <section className="flex flex-col justify-center">
          <div className="flex gap-4 text-shadow-black/30 text-shadow-lg">
            <h2>
              <span className="text-gradient-primary">Responsive</span> <br /> Scenes
            </h2>
          </div>
          <p className="text-gray-300">
            Use <strong>CanvasPortal</strong> to render Three.js scenes directly within your HTML
            layout. 3D elements respect the document flow, making them natively responsive and easy
            to position using standard layout tools like Tailwind CSS.
          </p>
          <p className="text-gray-300">
            Orchestrate animations with <strong>GSAP ScrollTrigger</strong> by linking 3D properties
            to DOM events. In this example, the sphere&apos;s scale and color are driven by its
            container&apos;s scroll position.
          </p>
        </section>
        <CanvasPortal id="wobble-sphere-trigger" camera environment lights loader bounds>
          <WobbleSphere trigger="#wobble-sphere-trigger" />
        </CanvasPortal>
      </section>

      <section className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-4">
        <section className="flex flex-col justify-center">
          <div className="flex gap-4 text-shadow-black/30 text-shadow-lg">
            <h2>
              Interactive <br /> <span className="text-gradient-primary">Viewports</span>
            </h2>
          </div>
          <p className="text-gray-300">
            Each <strong>CanvasPortal</strong> can be configured with its own camera, lighting, and
            environment settings. Enable <strong>orbitControls</strong> to allow users to
            interactively explore 3D models within the flow of your article or landing page.
          </p>
          <p className="text-gray-300">
            The <strong>bounds</strong> property automatically centers and scales your 3D content to
            fit its DOM container, ensuring pixel-perfect alignment across different screen sizes.
          </p>
        </section>

        <CanvasPortal
          camera
          environment
          lights
          shadows
          loader
          orbitControls={{
            autoRotate: true,
            autoRotateSpeed: -2,
            minPolarAngle: Math.PI / 2,
            maxPolarAngle: Math.PI / 2,
          }}
          bounds={{
            margin: 1.8,
          }}
          className="md:order-first"
        >
          <RoundedBox position={[0, 0.7, 0]} args={[1, 1, 1]}>
            <meshPhysicalMaterial
              color="#ff6345"
              envMapIntensity={0.3}
              clearcoat={0.1}
              clearcoatRoughness={0.1}
              metalness={0.1}
            />
          </RoundedBox>
        </CanvasPortal>
      </section>
    </Container>
  );
}
