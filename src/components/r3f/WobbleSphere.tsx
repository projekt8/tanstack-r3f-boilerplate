import { useGSAP } from '@gsap/react';
import { MeshDistortMaterial } from '@react-three/drei';
import { useRef } from 'react';
import gsap from 'gsap';
import type { ComponentProps, ComponentRef } from 'react';
import type { Mesh } from 'three';
import { useCanvasPortal } from '@/components/r3f/CanvasPortal';

export interface WobbleSphereProps extends React.ComponentProps<'mesh'> {
  trigger?: ScrollTrigger.Vars['trigger'];
}

const WobbleSphere = (props: ComponentProps<'mesh'>) => {
  const meshRef = useRef<Mesh>(null!);
  const materialRef = useRef<ComponentRef<typeof MeshDistortMaterial>>(null!);

  const { containerRef } = useCanvasPortal();

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
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
      <sphereGeometry args={[1, 48, 48]} />
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
