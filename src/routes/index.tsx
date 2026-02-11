import { createFileRoute } from '@tanstack/react-router';
import { Route as RouteIcon, Server, Shield, Sparkles, Waves, Zap } from 'lucide-react';
import { Container } from '@/components/Container';

export const Route = createFileRoute('/')({ component: App });

function App() {
  const features = [
    {
      icon: <Zap className="h-12 w-12 text-cyan-400" />,
      title: 'Powerful Server Functions',
      description:
        'Write server-side code that seamlessly integrates with your client components. Type-safe, secure, and simple.',
    },
    {
      icon: <Server className="h-12 w-12 text-cyan-400" />,
      title: 'Flexible Server Side Rendering',
      description:
        'Full-document SSR, streaming, and progressive enhancement out of the box. Control exactly what renders where.',
    },
    {
      icon: <RouteIcon className="h-12 w-12 text-cyan-400" />,
      title: 'API Routes',
      description:
        'Build type-safe API endpoints alongside your application. No separate backend needed.',
    },
    {
      icon: <Shield className="h-12 w-12 text-cyan-400" />,
      title: 'Strongly Typed Everything',
      description:
        'End-to-end type safety from server to client. Catch errors before they reach production.',
    },
    {
      icon: <Waves className="h-12 w-12 text-cyan-400" />,
      title: 'Full Streaming Support',
      description:
        'Stream data from server to client progressively. Perfect for AI applications and real-time updates.',
    },
    {
      icon: <Sparkles className="h-12 w-12 text-cyan-400" />,
      title: 'Next Generation Ready',
      description:
        'Built from the ground up for modern web applications. Deploy anywhere JavaScript runs.',
    },
  ];

  return (
    <Container className="flex flex-col gap-12">
      <section className="relative mx-auto max-w-5xl text-center">
        <div className="flex items-center justify-center gap-4">
          <h1 className="uppercase">
            tanstack start{' '}
            <span className="block bg-linear-to-r from-cyan-400 to-blue-400 bg-clip-text text-9xl text-transparent">
              &
            </span>{' '}
            more
          </h1>
        </div>
        <p className="mb-4 text-2xl md:text-3xl">
          The framework for next generation web experiences
        </p>
        <p className="text-gray-300">
          Full-stack framework powered by TanStack Router for React and Solid. Build modern
          applications with server functions, streaming, and type safety.
        </p>
      </section>

      <section className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl border border-slate-700 bg-slate-800/50 p-6 backdrop-blur-sm transition duration-300 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10"
            >
              <div className="flex items-center gap-4">
                <div className="mb-4">{feature.icon}</div>
                <h2 className="mb-3 font-sans text-2xl">{feature.title}</h2>
              </div>
              <p className="leading-relaxed text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
}
