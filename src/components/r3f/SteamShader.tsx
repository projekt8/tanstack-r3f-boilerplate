import { useMemo, useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { DoubleSide, PlaneGeometry, RepeatWrapping, TextureLoader } from 'three';
import type { Mesh, ShaderMaterial, Texture } from 'three';
import noiseTextureUrl from '@/assets/noiseTexture.png';
import vertexShader from '@/shader/steam.vert';
import fragmentShader from '@/shader/steam.frag';

interface SteamShaderProps {
  position?: [number, number, number];
  scale?: number;
  size?: [number, number, number]; // [width, height, depth]
  windStrength?: number;
}

export const SteamShader = ({
  position = [-0.1, 1.05, 0],
  size = [0.8, 1.5, 0.8],
  windStrength = 0.35,
}: SteamShaderProps) => {
  const meshRef = useRef<Mesh>(null);

  // Load the Perlin noise texture from public folder
  const texture = useLoader(TextureLoader, noiseTextureUrl) as Texture;

  // Configure texture wrapping (only once)
  useMemo(() => {
    texture.wrapS = RepeatWrapping;
    texture.wrapT = RepeatWrapping;
  }, [texture]);

  // Create geometry with transformations
  const geometry = useMemo(() => {
    const planeGeometry = new PlaneGeometry(1, 1, 16, 64);
    planeGeometry.translate(position[0], position[1], position[2]);
    planeGeometry.scale(size[0], size[1], size[2]);
    planeGeometry.rotateY(1.9);
    return planeGeometry;
  }, [size]);

  // ensure the uniforms object has a stable reference
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPerlinTexture: { value: texture },
      uWindStrength: { value: windStrength },
    }),
    [texture, windStrength]
  );

  // Animate the shader
  useFrame((state) => {
    if (meshRef.current?.material) {
      const material = meshRef.current.material as ShaderMaterial;
      material.uniforms.uTime.value = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        side={DoubleSide}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
};
