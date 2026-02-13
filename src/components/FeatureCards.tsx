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

const features = [
  {
    icon: <Rocket className="size-7" />,
    title: 'Optimized for Pagespeed',
    description: 'Fastest possible pagespeed performance with zero configuration.',
  },
  {
    icon: <Move3D className="size-7" />,
    title: 'Immersive 3D Experiences',
    description: 'Build 3D applications with ease. Powered by React Three Fiber.',
  },
  {
    icon: <MoveIcon className="size-7" />,
    title: 'GSAP Animations & Smooth Scroll',
    description: 'Create stunning animations with GSAP, the state of the art animation library.',
  },
  {
    icon: <Sparkles className="size-7" />,
    title: 'Next Generation Ready',
    description:
      'Built from the ground up for modern web applications. Deploy anywhere JavaScript runs.',
  },
  {
    icon: <Shield className="size-7" />,
    title: 'Strongly Typed Everything',
    description:
      'End-to-end type safety from server to client. Catch errors before they reach production.',
  },
  {
    icon: <Server className="size-7" />,
    title: 'Flexible Server Side Rendering',
    description:
      'Full-document SSR, streaming, and progressive enhancement out of the box. Control exactly what renders where.',
  },
  {
    icon: <Waves className="size-7" />,
    title: 'Full Streaming Support',
    description:
      'Stream data from server to client progressively. Perfect for AI applications and real-time updates.',
  },
  {
    icon: <RouteIcon className="size-7" />,
    title: 'API Routes',
    description:
      'Build type-safe API endpoints alongside your application. No separate backend needed.',
  },
  {
    icon: <Zap className="size-7" />,
    title: 'Powerful Server Functions',
    description:
      'Write server-side code that seamlessly integrates with your client components. Type-safe, secure, and simple.',
  },
];

export const FeatureCards = () => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {features.map((feature) => (
        <div
          key={feature.title}
          className="rounded-xl border border-neutral-700 bg-neutral-800/50 p-6 backdrop-blur-lg transition duration-300 hover:border-accent/50 hover:shadow-lg hover:shadow-primary/10"
        >
          <div className="mb-4 flex items-center gap-4">
            <div className="rounded-full bg-gradient-primary p-3">{feature.icon}</div>
            <h2 className="mb-0 font-sans text-xl leading-tight">{feature.title}</h2>
          </div>
          <p className="leading-relaxed text-neutral-400">{feature.description}</p>
        </div>
      ))}
    </div>
  );
};
