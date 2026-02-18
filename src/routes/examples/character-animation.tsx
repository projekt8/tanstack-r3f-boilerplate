import { Grid } from '@react-three/drei';
import { createFileRoute } from '@tanstack/react-router';
import { PageSection } from '@/components/layout/PageSection';
import { PageWrapper } from '@/components/layout/PageWrapper';
import ArmatureModel from '@/components/r3f/ArmatureModel';
import CanvasPortal from '@/components/r3f/CanvasPortal';

export const Route = createFileRoute('/examples/character-animation')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <PageWrapper>
      <PageSection width="narrow">
        <div className="flex items-center justify-center gap-4 text-shadow-black/30 text-shadow-lg">
          <h1 className="uppercase">
            Imported <br /> Models
            <span className="block text-gradient-primary text-8xl text-shadow-none">&</span>
            Animations
          </h1>
        </div>
        <p className="mb-4 text-xl font-medium md:text-2xl">
          Bring your 3D characters to life with skeletal animation
        </p>
        <p className="text-neutral-300">
          Import <strong>rigged GLB models</strong> and control their{' '}
          <strong>skeletal animations</strong> in React. This example demonstrates how to manage
          animation states, and seamlessly blend actions for fluid character movement—delivering a
          polished, interactive 3D experience.
        </p>
      </PageSection>

      <PageSection width="full">
        <CanvasPortal
          fullscreen
          camera={{
            position: [0, 1, 8],
          }}
          environment
          lights
          shadows={{ opacity: 0.6 }}
          orbitControls={{
            minPolarAngle: Math.PI / 4,
            maxPolarAngle: Math.PI / 2,
            target: [0, 1.2, 0],
          }}
        >
          <fog attach="fog" args={[0x0f1b27, 6, 15]} />

          <ArmatureModel />
          <Grid
            args={[20, 20]}
            position={[0, -0.001, 0]}
            cellSize={0.5}
            cellThickness={0.5}
            cellColor="#6f6f6f"
            sectionSize={3}
            sectionThickness={1}
            sectionColor="#2080ff"
            fadeDistance={15}
            fadeStrength={1}
            followCamera={false}
            infiniteGrid={true}
          />
        </CanvasPortal>
      </PageSection>
    </PageWrapper>
  );
}
