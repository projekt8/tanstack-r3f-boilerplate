# Context for AI Agents & LLMs

This file (`AGENTS.md`) is the **Unified Source of Truth** for all AI assistants (Cursor, Windsurf, Copilot, etc.) working on this project.

## 1. Project Overview

**TanStack R3F Boilerplate** is a high-performance web application designed for immersive 3D experiences. It combines full-stack rendering with advanced 3D graphics and professional-grade animations.

### Core Philosophy

- **Performance First**: 3D and DOM must run smoothly (60fps+).
- **Type Safety**: Strict TypeScript everywhere.
- **Modern Standards**: React 19, Tailwind v4, TanStack Start.

## 2. Tech Stack (Critical Versions)

You **MUST** respect these versions. Do not hallucinate older API usages.

- **Framework**: [TanStack Start](https://tanstack.com/start) (v1.132+)
- **Routing**: [TanStack Router](https://tanstack.com/router) (File-based in `src/routes`)
- **React**: v19.2.0 (Use React 19 features like `use`, `actions`, but avoid experimental unless specified)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (No `postcss.config.js` needed, uses `@theme` in CSS)
- **3D Engine**: [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) (v9) + Three.js (v0.182)
- **Animation**:
  - **GSAP** (v3.14): Complex timeline-based animations.
  - **Tempus**: strict animation loop synchronization.
  - **Lenis**: Smooth scrolling.

## 3. Architecture & Patterns

### Directory Structure

```
src/
├── components/   # Reusable UI & 3D components
├── routes/       # File-based routing (TanStack Router)
├── styles/       # Global styles (Tailwind v4 Setup)
├── lib/          # Utilities & helpers
└── assets/       # Static assets
```

### Routing (TanStack Router)

- Use `createFileRoute` for type-safe routes.
- `__root.tsx` is the layout wrapper.
- **Server Functions**: Use `createServerFn` for backend logic.

### 3D Rendering (R3F)

- **Canvas Portal**: Use `src/components/r3f/CanvasPortal.tsx` for 3D views. It wraps `@react-three/drei`'s `View` to allow rendering 3D content into any DOM node efficiently. It supports props for `orbitControls`, `environment`, `shadows`, and `camera` setup out of the box.
- **Suspense**: Always wrap 3D content in `<Suspense>`.
- **Performance & Optimization**:
  - **Instancing**: Use `instancedMesh` for repeated objects (avoid >1000 draw calls).
  - **Re-use**: Define Geometries and Materials globally or memoize them. Do NOT recreate them in render loops.
  - **On-Demand**: Use `frameloop="demand"` for static scenes to save battery.
  - **Object Pooling**: Avoid `new THREE.Vector3()` in `useFrame`. Create reusable scratch objects outside the loop.
  - **Movement Regression**: Temporarily reduce quality (pixel ratio) during movement for responsiveness.
- **Pitfalls to AVOID**:
  - **NO `setState` in Loops**: Never update React state in `useFrame` or fast events (pointer move). Mutate refs instead.
  - **Visibility vs Unmount**: Toggle `visible={false}` instead of conditional rendering (`{show && <Mesh />}`) to avoid expensive re-mounting.
  - **Reactive Fast State**: Don't bind fast-changing store state (Zustand/Redux) directly. Read transient state in `useFrame` via `api.getState()`.

### Animation Loop

- **NEVER** use `requestAnimationFrame` directly.
- **ALWAYS** use `Tempus` or `useFrame` (R3F) for loops to ensure sync.

## 4. Coding Rules

### TypeScript

- **Strict Mode**: Enabled. No `any`.
- **Imports**: Use `@/` alias for `src/`.
- **Props**: Define strictly typed interfaces.

### Styling (Tailwind v4)

- **Zero Runtime**: Use utility classes.
- **Theme**: Defined in `src/styles/index.css` using CSS variables (`--color-*`).
- **Dynamic**: Use the `cn` utility from `src/lib/utils.ts` for conditional classes.

### Best Practices

1.  **Functional Components**: No class components.
2.  **Hooks**: Custom hooks for logic extraction.
3.  **Assets**: Do **NOT** use placeholder names/urls. If you need an image, ask the user to generate it or use a solid color div temporarily.
4.  **No Hallucinations**: Verify import paths.

## 5. Tool Instructions

### Antigravity / General Agents

- If you are reading this via `CONTRIBUTING.md`, you are doing it right.
- Follow the rules above strictly.

### Cursor / Windsurf

- This file is auto-loaded by your specific rule files.
