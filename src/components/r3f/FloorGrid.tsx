import { Grid } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import type { Mesh } from 'three';
import { useAnimationStore } from '@/stores/useAnimationStore';

export default function FloorGrid() {
  const gridRef = useRef<Mesh>(null);
  const currentAnimation = useAnimationStore((s) => s.models['ArmatureModel']?.currentAnimation);

  useFrame((_, delta) => {
    if (gridRef.current && currentAnimation === 'Running') {
      gridRef.current.position.z = (gridRef.current.position.z - delta * 3.8) % 3;
    }
  });

  return (
    <Grid
      ref={gridRef}
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
  );
}
