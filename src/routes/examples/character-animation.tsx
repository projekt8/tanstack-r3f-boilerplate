import { Grid } from '@react-three/drei';
import { createFileRoute } from '@tanstack/react-router';
import { PageSection } from '@/components/layout/PageSection';
import { PageWrapper } from '@/components/layout/PageWrapper';
import ArmatureModel from '@/components/r3f/ArmatureModel';
import CanvasPortal from '@/components/r3f/CanvasPortal';
import { useAnimationStore } from '@/stores/useAnimationStore';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { MultiSwitch } from '@/components/ui/MultiSwitch';

export const Route = createFileRoute('/examples/character-animation')({
  component: RouteComponent,
});

const MODEL_ID = 'ArmatureModel';
const ANIMATIONS = ['Idle', 'Running'] as const;

function RouteComponent() {
  const currentAnimation = useAnimationStore((s) => s.models[MODEL_ID]?.currentAnimation);
  const setAnimation = useAnimationStore((s) => s.setAnimation);

  const activeIndex = ANIMATIONS.indexOf(
    (currentAnimation as (typeof ANIMATIONS)[number]) ?? 'Idle'
  );

  useGSAP(() => {
    gsap.from('#character-animation-canvas', {
      scrollTrigger: {
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      },
      y: 300,
    });
  });

  return (
    <PageWrapper>
      <PageSection width="narrow">
        <div className="flex items-center justify-center gap-4 text-shadow-black/30 text-shadow-lg">
          <h1 className="uppercase">
            Models
            <span className="block text-gradient-primary text-8xl text-shadow-none">&</span>
            Animations
          </h1>
        </div>
        <p className="mb-4 text-xl font-medium md:text-2xl">
          Bring your 3D models to life with skeletal animation
        </p>
        <p className="text-neutral-300">
          Import <strong>rigged GLB models</strong> and control their{' '}
          <strong>skeletal animations</strong> in React. This example demonstrates how to manage
          animation states, and seamlessly blend actions for fluid character movement.
        </p>

        <div></div>
      </PageSection>

      <div className="z-10 mx-auto mt-[60vh] flex items-center justify-center gap-4">
        <MultiSwitch
          items={ANIMATIONS.map((anim) => ({
            label: anim,
            onClick: () => setAnimation(MODEL_ID, anim),
          }))}
          value={activeIndex}
          onChange={(index: number) => {
            const anim = ANIMATIONS[index];
            if (anim) setAnimation(MODEL_ID, anim);
          }}
        />
      </div>

      <CanvasPortal
        id="character-animation-canvas"
        fullscreen
        camera={{
          position: [0, 1, 8],
        }}
        environment
        lights
        shadows={{ opacity: 0.6 }}
        orbitControls={{
          autoRotate: true,
          autoRotateSpeed: -0.5,
          minPolarAngle: Math.PI / 4,
          maxPolarAngle: Math.PI / 2,
          target: [0, 0.8, 0],
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
    </PageWrapper>
  );
}
