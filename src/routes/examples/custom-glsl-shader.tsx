import { createFileRoute } from '@tanstack/react-router';
import { Container } from '@/components/Container';
import CanvasPortal from '@/components/r3f/CanvasPortal';
import { SteamShader } from '@/components/r3f/SteamShader';
import CoffeeMugModel from '@/components/r3f/CoffeeMugModel';

export const Route = createFileRoute('/examples/custom-glsl-shader')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Container className="flex flex-col gap-25">
      <section className="relative mx-auto max-w-3xl text-center">
        <div className="flex items-center justify-center gap-4 text-shadow-black/30 text-shadow-lg">
          <h1 className="uppercase">
            Imported <br /> Models
            <span className="block text-gradient-primary text-8xl text-shadow-none">&</span>
            Shaders
          </h1>
        </div>
        <p className="mb-4 text-xl font-medium md:text-2xl">
          Enhance your 3D scenes with custom shaders and optimized assets
        </p>
        <p className="text-neutral-300">
          Learn to enhance your <strong>imported GLB models</strong> with powerful{' '}
          <strong>custom GLSL shaders</strong>. By combining optimized 3D assets with programmable
          graphics, you can achieve unique visual effects like the procedural steam shown below, all
          while maintaining excellent performance in your React application.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <section className="flex flex-col justify-center">
          <div className="flex gap-4 text-shadow-black/30 text-shadow-lg">
            <h2>
              GLSL Ready & <span className="text-gradient-primary">Optimized GLB</span>
            </h2>
          </div>
          <p className="text-gray-300">
            Ready for advanced graphics, the project's <strong>GLSL setup</strong> supports direct
            import of vertex and fragment shaders. This enables the creation of high-performance,
            custom materials and effects integrated seamlessly into the scene.
          </p>
          <p className="text-gray-300">
            The workflow also includes a <strong>Model Optimizer</strong>. This tool compresses raw
            3D models into optimized GLB files and generates ready-to-use React components, ensuring
            your assets are performant and easy to implement.
          </p>
        </section>
        <CanvasPortal
          camera={{
            position: [0, 2.8, 10],
          }}
          environment
          lights
          shadows={{ opacity: 0.6 }}
          loader
          bounds={{
            margin: 1.2,
          }}
          className="md:min-h-[600px]"
        >
          <group>
            <CoffeeMugModel />
            <SteamShader />
          </group>
        </CanvasPortal>
      </section>
    </Container>
  );
}
