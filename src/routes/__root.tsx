import interFont from '@fontsource-variable/inter/files/inter-latin-wght-normal.woff2?url';
import playfairFont from '@fontsource-variable/playfair-display/files/playfair-display-latin-wght-normal.woff2?url';

import { ReactTempus } from 'tempus/react';
import { TanStackDevtools } from '@tanstack/react-devtools';
import { HeadContent, Link, Scripts, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import appCss from '@/styles/index.css?url';
import { SmoothScroll } from '@/components/SmoothScroll';
import Header from '@/components/Header';
import { Footer } from '@/components/Footer';

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'TanStack Start Starter',
      },
      {
        name: 'description',
        content: 'TanStack Start Starter',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
      {
        rel: 'icon',
        href: '/favicon.svg',
        type: 'image/svg+xml',
      },
      {
        rel: 'preload',
        href: interFont,
        as: 'font',
        type: 'font/woff2',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'preload',
        href: playfairFont,
        as: 'font',
        type: 'font/woff2',
        crossOrigin: 'anonymous',
      },
    ],
  }),

  shellComponent: RootDocument,
  notFoundComponent: NotFound,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="grid min-h-dvh grid-rows-[auto_1fr_auto]">
        <Header />

        <main className="py-10 md:py-20">{children}</main>

        <Footer />

        <SmoothScroll />
        <ReactTempus patch />

        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  );
}

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      <h1 className="mb-4">404 - Not Found</h1>
      <p className="mb-8 text-xl">The page you are looking for does not exist.</p>
      <Link to="/" className="text-blue-400 hover:text-blue-300 hover:underline">
        Go Home
      </Link>
    </div>
  );
}
