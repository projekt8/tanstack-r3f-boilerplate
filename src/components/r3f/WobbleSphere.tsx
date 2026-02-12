import { useGSAP } from '@gsap/react';
import { MeshDistortMaterial } from '@react-three/drei';
import { useRef } from 'react';
import gsap from 'gsap';
import type { ComponentRef } from 'react';
import type { Mesh } from 'three';

export interface WobbleSphereProps extends React.ComponentProps<'mesh'> {
  trigger?: ScrollTrigger.Vars['trigger'];
}

const WobbleSphere = ({ trigger, ...props }: WobbleSphereProps) => {
  const meshRef = useRef<Mesh>(null!);
  const materialRef = useRef<ComponentRef<typeof MeshDistortMaterial>>(null!);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: trigger,
        start: 'top center',
        end: 'bottom top',
        scrub: 1,
      },
    });

    tl.to(materialRef.current.color, { r: 0, g: 0, b: 0 });
    tl.to(meshRef.current.scale, { x: 0.01, y: 0.01, z: 0.01 }, '<');
  });

  return (
    <mesh ref={meshRef} onClick={() => console.log('sphere clicked')} {...props}>
      <sphereGeometry args={[1, 64, 64]} />
      <MeshDistortMaterial
        ref={materialRef}
        color="#ff6345"
        attach="material"
        distort={0.4}
        speed={2}
        envMapIntensity={0.3}
        clearcoat={0.1}
        clearcoatRoughness={0.1}
        metalness={0.1}
      />
    </mesh>
  );
};

export default WobbleSphere;
