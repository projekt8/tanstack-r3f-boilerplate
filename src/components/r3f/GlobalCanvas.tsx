import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Preload, View } from '@react-three/drei';
import type { CanvasProps } from '@react-three/fiber';

const GlobalCanvas = ({ children, ...props }: CanvasProps) => {
  const [eventSource, setEventSource] = useState<HTMLElement | undefined>(undefined);

  useEffect(() => {
    setEventSource(document.body);
  }, []);

  return (
    <Canvas
      dpr={[1, 2]}
      style={{
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
      eventSource={eventSource}
      eventPrefix="client"
      {...props}
    >
      <Suspense fallback={null}>
        <View.Port />
        {children}
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default GlobalCanvas;
