import { createFileRoute } from '@tanstack/react-router';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import type { ModelId } from '@/stores/useAnimationStore';
import { PageSection } from '@/components/layout/PageSection';
import { PageWrapper } from '@/components/layout/PageWrapper';
import ArmatureModel from '@/components/r3f/ArmatureModel';
import CanvasPortal from '@/components/r3f/CanvasPortal';
import { useAnimationStore } from '@/stores/useAnimationStore';
import { MultiSwitch } from '@/components/ui/MultiSwitch';
import FloorGrid from '@/components/r3f/FloorGrid';

export const Route = createFileRoute('/examples/character-animations')({
  head: () => ({
    meta: [
      { title: 'Character Animations | TanStack R3F Boilerplate' },
      {
        name: 'description',
        content:
          'Import rigged GLB models and control animation states with crossfade blending for fluid character movement.',
      },
    ],
  }),
  component: RouteComponent,
});

const MODEL_ID: ModelId = 'ArmatureModel';
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
      y: 250,
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
        <p className="text-neutral-300">
          Import <strong>rigged GLB models</strong> and control their <strong>animations</strong> in
          React. This example shows how to manage animation states, and seamlessly blend actions for
          fluid character movement.
        </p>
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
          target: [0, 0.75, 0],
        }}
      >
        <fog attach="fog" args={[0x0f1b27, 6, 15]} />

        <ArmatureModel />
        <FloorGrid />
      </CanvasPortal>
    </PageWrapper>
  );
}
