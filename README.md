# TanStack R3F Boilerplate

A modern, high-performance boilerplate built for the next generation of web experiences. Combining the power of **TanStack Start** for full-stack capabilities, **React Three Fiber** for immersive 3D content, and **GSAP** for award-winning animations.

## 🚀 Features

- **[TanStack Start](https://tanstack.com/start)**: Full-stack React framework with SSR, streaming, and server functions.
- **[React Three Fiber](https://docs.pmnd.rs/react-three-fiber)**: The standard for 3D on the web, powered by Three.js.
- **[GSAP](https://gsap.com/)**: Professional-grade animation library for complex, high-performance animations.
- **[Lenis](https://lenis.darkroom.engineering/)**: Smooth scrolling for a premium feel.
- **[Tempus](https://github.com/darkroomengineering/tempus)**: A single simplified rAF loop for smooth, synchronized animations across GSAP, Lenis, and Three.js.
- **[Zustand](https://zustand.docs.pmnd.rs/)**: Lightweight state management for global store (e.g. animation control) without boilerplate.
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
git clone https://github.com/projekt8/tanstack-r3f-boilerplate.git
cd tanstack-r3f-boilerplate
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📜 Scripts

| Command                   | Description                                    |
| ------------------------- | ---------------------------------------------- |
| `npm run dev`             | Start development server on port 3000          |
| `npm run build`           | Build for production                           |
| `npm run preview`         | Preview production build locally               |
| `npm run test`            | Run tests (Vitest)                             |
| `npm run lint`            | Lint with ESLint                               |
| `npm run lint:fix`        | Lint and auto-fix                              |
| `npm run format`          | Check formatting (Prettier)                    |
| `npm run format:fix`      | Auto-format all files                          |
| `npm run check`           | Lint + format in one pass                      |
| `npm run optimize:models` | Optimize 3D models and generate R3F components |

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
│   ├── 📂 stores          # Zustand state stores (e.g. useAnimationStore)
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
- **`src/stores`**: [Zustand](https://zustand.docs.pmnd.rs/) stores for global state (e.g. `useAnimationStore` for model animation control).
- **`src/styles`**: Contains `index.css` (Tailwind v4 setup), `fonts.css`, and `lenis.css` (smooth scrolling).

## 🗃️ State Management (Zustand)

Global state is handled with [Zustand](https://zustand.docs.pmnd.rs/). Stores live in `src/stores/`. The boilerplate includes `useAnimationStore` for controlling 3D model animations from anywhere in the app (see [Animation System](#-animation-system)). Add new stores with `create()` and use `useShallow` from `zustand/react/shallow` when selecting multiple fields to avoid unnecessary re-renders.

## 🧊 3D Asset Workflow

This boilerplate includes a powerful automated pipeline for optimizing 3D models and generating React components using `gltfjsx`.

### How to use:

1. **Place your raw `.glb` files** in `src/assets/3d`.
2. **Run the optimization script**:

   ```bash
   npm run optimize:models
   ```

3. **What happens next:**
   - **Optimization**: Files are compressed (Draco), textures are resized (to 1024px), and instances are created for repeated geometry.
   - **Output**: Optimized `.glb` files are saved to `public/assets/3d`.
   - **Components**: TypeScript-ready React components are generated in `src/components/r3f`.
   - **Auto-Fixes**: The script automatically fixes paths to point to `/assets/3d/` and resolves common TypeScript errors in the generated code.

4. **Use in your app**:

   ```tsx
   import { Canvas } from '@react-three/fiber';
   import { ModelComponentName } from '@/components/r3f/ModelComponentName';

   export default function Scene() {
     return (
       <Canvas>
         <ModelComponentName />
       </Canvas>
     );
   }
   ```

## 💃 Animation System

Build complex, interactive 3D experiences with ease using our centralized animation system.

### 1. Hook up your model

Use the `useModelAnimation` hook in your GLTF component to register it with the store. This automatically handles mounting, unmounting, and crossfading.

```tsx
// src/components/r3f/MyModel.tsx
import { useModelAnimation } from '@/hooks/useModelAnimation';

export default function Model(props) {
  const { actions } = useAnimations(animations, group);

  // Connect to store: Unique ID, actions, default animation
  useModelAnimation('MyModel', actions, 'Idle');

  return <group ... />
}
```

### 2. Control from anywhere

Trigger animations from any component in your app (UI, scroll triggers, etc.) using the Zustand store `useAnimationStore`.

```tsx
import { useAnimationStore } from '@/stores/useAnimationStore';

function Controls() {
  const { setAnimation } = useAnimationStore();

  return <button onClick={() => setAnimation('MyModel', 'Run')}>Run</button>;
}
```

## 🚢 Deployment

The project ships with a GitHub Actions workflow (`.github/workflows/deploy.yml`) that builds and deploys to **GitHub Pages** on every push to `main`.

The workflow sets `VITE_BASE_PATH=/<repo-name>/` so that assets and links resolve correctly when the app is served from a repository subpath (e.g. `https://username.github.io/tanstack-r3f-boilerplate/`). If you deploy to a custom domain at the root, remove or override this variable.

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for details on how to get started, including guidelines for LLMs.
