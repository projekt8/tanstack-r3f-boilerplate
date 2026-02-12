import { Suspense, useEffect, useState } from 'react';
import { suspend } from 'suspend-react';
import {
  Bounds,
  ContactShadows,
  Environment,
  OrbitControls,
  PerspectiveCamera,
  View,
  useProgress,
} from '@react-three/drei';
import type { HTMLAttributes } from 'react';
import type {
  BoundsProps,
  ContactShadowsProps,
  OrbitControlsProps,
  PerspectiveCameraProps,
  ViewProps,
} from '@react-three/drei';
import { cn } from '@/lib/utils';

const environmentTexture = import('@pmndrs/assets/hdri/warehouse.exr').then(
  (module) => module.default
);

export interface CanvasPortalProps extends HTMLAttributes<HTMLDivElement> {
  shadows?: boolean | ContactShadowsProps;
  orbitControls?: boolean | OrbitControlsProps;
  camera?: PerspectiveCameraProps;
  loader?: boolean;
  viewProps?: ViewProps;
  boundsProps?: BoundsProps;
}

const CanvasPortal = ({
  children,
  className,
  shadows = true,
  orbitControls = true,
  camera = { fov: 30, position: [3, 2.5, 5] },
  loader = true,
  viewProps,
  boundsProps,
  ...props
}: CanvasPortalProps) => {
  const { progress, active } = useProgress();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!active && progress === 100) {
      const timeout = setTimeout(() => setLoaded(true), 300);
      return () => clearTimeout(timeout);
    }
  }, [active, progress]);

  return (
    <div
      className={cn(
        'relative flex h-full min-h-[400px] w-full items-center justify-center',
        loader &&
          !loaded &&
          'before:absolute before:size-10 before:rounded-full before:border-3 before:border-white/20 before:opacity-100 before:transition-opacity before:duration-200 before:content-[""]',
        loader &&
          !loaded &&
          'after:absolute after:size-10 after:animate-spin after:rounded-full after:border-t-3 after:border-primary after:opacity-100 after:transition-opacity after:duration-200 after:content-[""]',
        loader && loaded && 'before:opacity-0 after:opacity-0',
        orbitControls && 'cursor-grab active:cursor-grabbing',
        className
      )}
      {...props}
    >
      <View className="h-full w-full" {...viewProps}>
        <ambientLight intensity={0.5} />
        <pointLight position={[0, 0, -15]} intensity={1} color="#ff6345" />
        <Environment files={suspend(environmentTexture) as string} />

        <PerspectiveCamera makeDefault {...camera} />

        <Suspense fallback={null}>
          <Bounds fit observe clip margin={1.45} maxDuration={1} {...boundsProps}>
            {children}
          </Bounds>

          {shadows && (
            <ContactShadows opacity={0.5} {...(typeof shadows === 'object' ? shadows : {})} />
          )}

          {orbitControls && (
            <OrbitControls
              makeDefault
              enablePan={false}
              enableZoom={false}
              maxPolarAngle={Math.PI / 2}
              autoRotate
              autoRotateSpeed={-1}
              {...(typeof orbitControls === 'object' ? orbitControls : {})}
            />
          )}
        </Suspense>
      </View>
    </div>
  );
};

export default CanvasPortal;
