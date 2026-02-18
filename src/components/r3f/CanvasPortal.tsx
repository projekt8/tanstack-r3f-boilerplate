import { Suspense, createContext, useContext, useRef } from 'react';
import { suspend } from 'suspend-react';
import {
  Bounds,
  ContactShadows,
  Environment,
  OrbitControls,
  PerspectiveCamera,
  View,
} from '@react-three/drei';
import type { HTMLAttributes, RefObject } from 'react';
import type {
  BoundsProps,
  ContactShadowsProps,
  EnvironmentProps,
  OrbitControlsProps,
  PerspectiveCameraProps,
  ViewProps,
} from '@react-three/drei';
import { cn } from '@/lib/utils';
import { Loader } from '@/components/r3f/Loader';

const environmentTexture = import('@pmndrs/assets/hdri/warehouse.exr').then(
  (module) => module.default
);

interface CanvasPortalContextValue {
  containerRef: RefObject<HTMLDivElement | null>;
}

const CanvasPortalContext = createContext<CanvasPortalContextValue | null>(null);

export const useCanvasPortal = () => {
  const context = useContext(CanvasPortalContext);
  if (!context) {
    throw new Error('useCanvasPortal must be used within a CanvasPortal');
  }
  return context;
};

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
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      className={cn(
        'flex h-full min-h-[400px] w-full items-center justify-center',
        fullscreen ? 'fixed inset-0' : 'relative',
        orbitControls && 'cursor-grab active:cursor-grabbing',
        className
      )}
      {...props}
    >
      <Suspense fallback={null}>
        {loader && <Loader />}
        <View className="absolute inset-0 z-10 h-full w-full" {...view}>
          <CanvasPortalContext.Provider value={{ containerRef: ref }}>
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
                position={[0, 0.5, 10]}
                {...(typeof camera === 'object' ? camera : {})}
              />
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
              <ContactShadows
                opacity={0.3}
                blur={1.5}
                {...(typeof shadows === 'object' ? shadows : {})}
              />
            )}

            {orbitControls && (
              <OrbitControls
                makeDefault
                enablePan={false}
                enableZoom={false}
                maxPolarAngle={Math.PI / 2}
                {...(typeof orbitControls === 'object' ? orbitControls : {})}
              />
            )}
          </CanvasPortalContext.Provider>
        </View>
      </Suspense>
    </div>
  );
};

export default CanvasPortal;
