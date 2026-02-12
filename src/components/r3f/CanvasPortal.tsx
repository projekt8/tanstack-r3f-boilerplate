import { Suspense } from 'react';
import { suspend } from 'suspend-react';
import {
  Bounds,
  ContactShadows,
  Environment,
  OrbitControls,
  PerspectiveCamera,
  View,
} from '@react-three/drei';
import type { HTMLAttributes } from 'react';
import type {
  BoundsProps,
  ContactShadowsProps,
  EnvironmentProps,
  OrbitControlsProps,
  PerspectiveCameraProps,
  ViewProps,
} from '@react-three/drei';
import { cn } from '@/lib/utils';

const environmentTexture = import('@pmndrs/assets/hdri/warehouse.exr').then(
  (module) => module.default
);

export interface CanvasPortalProps extends HTMLAttributes<HTMLDivElement> {
  view?: ViewProps;
  loader?: boolean;
  bounds?: boolean | BoundsProps;
  camera?: boolean | PerspectiveCameraProps;
  orbitControls?: boolean | OrbitControlsProps;
  environment?: boolean | EnvironmentProps;
  shadows?: boolean | ContactShadowsProps;
  lights?: boolean;
  fullscreen?: boolean;
}

const CanvasPortal = ({
  children,
  className,
  view,
  loader = false,
  bounds = false,
  camera = false,
  orbitControls = false,
  shadows = false,
  environment = false,
  lights = false,
  fullscreen = false,
  ...props
}: CanvasPortalProps) => {
  return (
    <div
      className={cn(
        'relative flex h-full min-h-[400px] w-full items-center justify-center',
        fullscreen && 'fixed inset-0 h-full w-full',
        loader &&
          'before:absolute before:size-10 before:rounded-full before:border-3 before:border-white/20 before:opacity-100 before:transition-opacity before:duration-200 before:content-[""]',
        loader &&
          'after:absolute after:size-10 after:animate-spin after:rounded-full after:border-t-3 after:border-primary after:opacity-100 after:transition-opacity after:duration-200 after:content-[""]',
        loader && 'before:opacity-0 after:opacity-0',
        orbitControls && 'cursor-grab active:cursor-grabbing',
        className
      )}
      {...props}
    >
      <Suspense fallback={null}>
        <View className="absolute inset-0 z-10 h-full w-full" {...view}>
          {lights && (
            <>
              <ambientLight intensity={0.5} />
              <pointLight position={[0, 0, -15]} intensity={1} color="#ff6345" />
            </>
          )}

          {environment && (
            <Environment
              files={suspend(environmentTexture) as string}
              {...(typeof environment === 'object' ? environment : {})}
            />
          )}

          {camera && (
            <PerspectiveCamera
              makeDefault
              fov={30}
              position={[3, 2.5, 5]}
              {...(typeof camera === 'object' ? camera : {})}
            >
              {children}
            </PerspectiveCamera>
          )}

          {bounds ? (
            <Bounds
              fit
              observe
              clip
              margin={1.4}
              maxDuration={1}
              {...(typeof bounds === 'object' ? bounds : {})}
            >
              {children}
            </Bounds>
          ) : (
            children
          )}

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
        </View>
      </Suspense>
    </div>
  );
};

export default CanvasPortal;
