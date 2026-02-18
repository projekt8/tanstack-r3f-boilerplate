import { useRef, useState } from 'react';
import { MathUtils } from 'three';
import { useFrame } from '@react-three/fiber';
import { Environment, Instance, Instances, PerspectiveCamera } from '@react-three/drei';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import type { InstancedMesh, Object3D } from 'three';

const particles = Array.from({ length: 150 }, () => ({
  factor: MathUtils.randInt(20, 100),
  speed: MathUtils.randFloat(0.01, 0.75),
  xFactor: MathUtils.randFloatSpread(40),
  yFactor: MathUtils.randFloatSpread(10),
  zFactor: MathUtils.randFloatSpread(10),
}));

export default function SpheresBackground() {
  return (
    <>
      <PerspectiveCamera makeDefault fov={45} position={[0, 5, 35]} />
      <fog attach="fog" args={['#ff6345', 25, -5]} />
      <ambientLight intensity={1} />

      <Bubbles />

      <Environment preset="city" />
    </>
  );
}

function Bubbles() {
  const meshRef = useRef<InstancedMesh>(null!);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.5,
      },
    });

    tl.to(meshRef.current.scale, { x: 0.75, y: 0.75, z: 0.75 });
    tl.to(meshRef.current.position, { y: -5 }, '<');
  });

  return (
    <Instances
      ref={meshRef}
      limit={particles.length}
      castShadow
      receiveShadow
      position={[0, 2.5, 0]}
    >
      <sphereGeometry args={[0.45, 64, 64]} />
      <meshStandardMaterial roughness={1} color="#28394a" />
      {particles.map((data, i) => (
        <Bubble key={i} {...data} />
      ))}
    </Instances>
  );
}

function Bubble({
  factor,
  speed,
  xFactor,
  yFactor,
  zFactor,
}: {
  factor: number;
  speed: number;
  xFactor: number;
  yFactor: number;
  zFactor: number;
}) {
  const ref = useRef<Object3D>(null!);
  const [scaleMultiplier, setScaleMultiplier] = useState(0);

  // Animate scale from 0 to 1 on mount
  useGSAP(() => {
    gsap.to(
      { value: 0 },
      {
        value: 1,
        duration: 1.5,
        ease: 'back.out(1.7)',
        onUpdate: function () {
          setScaleMultiplier(this.targets()[0].value);
        },
      }
    );
  }, []);

  useFrame((state) => {
    const t = factor + state.clock.elapsedTime * (speed / 5);
    const wobbleScale = Math.max(1.5, Math.cos(t) * 5);
    ref.current.scale.setScalar(wobbleScale * scaleMultiplier);
    ref.current.position.set(
      Math.cos(t) +
        Math.sin(t * 1) / 10 +
        xFactor +
        Math.cos((t / 10) * factor) +
        (Math.sin(t * 1) * factor) / 10,
      Math.sin(t) +
        Math.cos(t * 2) / 10 +
        yFactor +
        Math.sin((t / 10) * factor) +
        (Math.cos(t * 2) * factor) / 10,
      Math.sin(t) +
        Math.cos(t * 2) / 10 +
        zFactor +
        Math.cos((t / 10) * factor) +
        (Math.sin(t * 3) * factor) / 4
    );
  });
  return <Instance ref={ref} />;
}
