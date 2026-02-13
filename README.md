# TanStack Start + React Three Fiber Boilerplate

A modern, high-performance boilerplate built for the next generation of web experiences. Combining the power of **TanStack Start** for full-stack capabilities, **React Three Fiber** for immersive 3D content, and **GSAP** for award-winning animations.

## 🚀 Features

- **[TanStack Start](https://tanstack.com/start)**: Full-stack React framework with SSR, streaming, and server functions.
- **[React Three Fiber](https://docs.pmnd.rs/react-three-fiber)**: The standard for 3D on the web, powered by Three.js.
- **[GSAP](https://gsap.com/)**: Professional-grade animation library for complex, high-performance animations.
- **[Lenis](https://lenis.darkroom.engineering/)**: Smooth scrolling for a premium feel.
- **[Tempus](https://github.com/darkroomengineering/tempus)**: A single simplified rAF loop for smooth, synchronized animations across GSAP, Lenis, and Three.js.
- **[Tailwind CSS v4](https://tailwindcss.com/)**: Utility-first CSS framework for rapid UI development.
- **[TypeScript](https://www.typescriptlang.org/)**: Strongly typed for better developer experience and code quality.
- **[Vite](https://vitejs.dev/)**: Next-generation frontend tooling.

## 🛠️ Getting Started

### Prerequisites

- Node.js (v24.8.0 or higher recommended)
- npm, pnpm, or bun

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/your-username/react-three-fiber-tanstack-boilerplate.git
cd react-three-fiber-tanstack-boilerplate
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

The project follows a standard Vite + React application structure with specific conventions for TanStack Router and React Three Fiber.

```text
├── 📂 src
│   ├── 📂 assets          # Static assets (images, SVGs)
│   ├── 📂 components      # Reusable UI components
│   │   ├── 📂 r3f         # React Three Fiber 3D components
│   │   └── ...            # General UI components (Header, Footer, etc.)
│   ├── 📂 data            # Static data files
│   ├── 📂 lib             # Utilities and helpers
│   ├── 📂 routes          # TanStack Router file-based system
│   │   ├── __root.tsx     # Root layout wrapper
│   │   ├── index.tsx      # Landing page
│   │   └── 📂 examples    # Example feature routes
│   ├── 📂 styles          # Global styles & Tailwind config
│   │   ├── index.css      # Main stylesheet
│   │   └── ...
│   ├── router.tsx         # Router instance configuration
│   └── routeTree.gen.ts   # Auto-generated route definitions (DO NOT EDIT)
├── .nvmrc                 # Node version configuration
├── package.json           # Project dependencies and scripts
└── vite.config.ts         # Vite configuration
```

### Key Directories

- **`src/routes`**: The heart of the application's file-based routing.
- **`src/components/r3f`**: Dedicated folder for 3D-specific components to keep them separate from standard DOM UI.
- **`src/styles`**: Contains `index.css` (Tailwind v4 setup), `fonts.css`, and `lenis.css` (smooth scrolling).

## 📜 Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run preview`: Previews the production build locally.
- `npm run test`: Runs tests using Vitest.
- `npm run lint`: Runs ESLint.
- `npm run format`: Runs Prettier to format code.
- `npm run check`: checks for formatting and linting issues.

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for details on how to get started, including guidelines for LLMs.
