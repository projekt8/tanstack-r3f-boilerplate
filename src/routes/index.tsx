import { Suspense, lazy } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  Move3D,
  MoveIcon,
  Rocket,
  Route as RouteIcon,
  Server,
  Shield,
  Sparkles,
  Waves,
  Zap,
} from 'lucide-react';
import { Container } from '@/components/Container';

const SpheresBackground = lazy(() => import('@/components/r3f/SpheresBackground'));

export const Route = createFileRoute('/')({ component: HomePage });

const features = [
  {
    icon: <Sparkles className="size-8" />,
    title: 'Next Generation Ready',
    description:
      'Built from the ground up for modern web applications. Deploy anywhere JavaScript runs.',
  },
  {
    icon: <Shield className="size-8" />,
    title: 'Strongly Typed Everything',
    description:
      'End-to-end type safety from server to client. Catch errors before they reach production.',
  },
  {
    icon: <Server className="size-8" />,
    title: 'Flexible Server Side Rendering',
    description:
      'Full-document SSR, streaming, and progressive enhancement out of the box. Control exactly what renders where.',
  },
  {
    icon: <Rocket className="size-8" />,
    title: 'Optimized for Performance',
    description: 'Fastest possible performance with zero configuration.',
  },
  {
    icon: <Move3D className="size-8" />,
    title: 'Immersive 3D Experiences',
    description: 'Build 3D applications with ease. Powered by React Three Fiber.',
  },
  {
    icon: <MoveIcon className="size-8" />,
    title: 'GSAP Animations & Smooth Scroll',
    description: 'Create stunning animations with GSAP, the state of the art animation library.',
  },
  {
    icon: <Waves className="size-8" />,
    title: 'Full Streaming Support',
    description:
      'Stream data from server to client progressively. Perfect for AI applications and real-time updates.',
  },
  {
    icon: <RouteIcon className="size-8" />,
    title: 'API Routes',
    description:
      'Build type-safe API endpoints alongside your application. No separate backend needed.',
  },
  {
    icon: <Zap className="size-8" />,
    title: 'Powerful Server Functions',
    description:
      'Write server-side code that seamlessly integrates with your client components. Type-safe, secure, and simple.',
  },
];

function HomePage() {
  return (
    <>
      <Suspense fallback={null}>
        <SpheresBackground />
      </Suspense>

      <Container className="relative flex flex-col gap-12">
        <section className="relative mx-auto max-w-5xl text-center">
          <div className="flex items-center justify-center gap-4">
            <h1 className="uppercase">
              Tanstack Start <span className="text-gradient-primary block text-8xl">&</span>
              <small>more</small>
            </h1>
          </div>
          <p className="mb-4 text-2xl md:text-3xl">
            The boilerplate for next generation web experiences
          </p>
          <p className="text-gray-300">
            Full-stack framework powered by TanStack Start for React. Build modern applications with
            server functions, streaming, and type safety.
          </p>
        </section>

        <section className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border border-slate-700 bg-slate-800/50 p-6 backdrop-blur-lg transition duration-300 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10"
              >
                <div className="mb-4 flex items-center gap-4">
                  <div className="bg-gradient-primary rounded-full p-3">{feature.icon}</div>
                  <h2 className="mb-0 font-sans text-2xl">{feature.title}</h2>
                </div>
                <p className="leading-relaxed text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
      </Container>
    </>
  );
}
