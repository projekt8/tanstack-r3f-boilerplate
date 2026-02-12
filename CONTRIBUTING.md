# Contributing to React Three Fiber + TanStack Boilerplate

Thank you for your interest in contributing! We appreciate your help in making this project better.

## 🛠️ Getting Started

1.  **Fork the repository** on GitHub.
2.  **Clone your fork** locally:
    ```bash
    git clone https://github.com/your-username/react-three-fiber-tanstack-boilerplate.git
    cd react-three-fiber-tanstack-boilerplate
    ```
3.  **Install dependencies**:
    ```bash
    npm install
    ```
4.  **Create a new branch** for your feature or fix:
    ```bash
    git checkout -b feature/amazing-feature
    # or
    git checkout -b fix/nasty-bug
    ```

## 📏 Branch Naming

Please use the following convention for branch names:

- `feature/`: For new features (e.g., `feature/add-dark-mode`)
- `fix/`: For bug fixes (e.g., `fix/header-alignment`)
- `docs/`: For documentation changes (e.g., `docs/update-readme`)
- `refactor/`: For code refactoring (e.g., `refactor/header-component`)

## 🚀 Pull Request Process

1.  Ensure your code follows the project's style guidelines.
2.  Run tests to make sure everything is working:
    ```bash
    npm run test
    ```
3.  Run linting and formatting checks:
    ```bash
    npm run check
    ```
4.  Commit your changes with descriptive commit messages.
5.  Push your branch to GitHub:
    ```bash
    git push origin feature/amazing-feature
    ```
6.  Open a Pull Request against the `main` branch.

## 🐛 Reporting Bugs & Requesting Features

Please use the [GitHub Issues](https://github.com/your-username/react-three-fiber-tanstack-boilerplate/issues) tracker to report bugs or request new features. Be sure to include as much detail as possible.

---

# 🤖 Context for LLMs

If you are an AI assistant helping a developer with this project, here is some context to help you understand the codebase.

## Project Summary

This is a high-performance web application boilerplate designed for building immersive 3D experiences. It combines full-stack capabilities with advanced 3D rendering and professional-grade animations.

## Tech Stack Details

- **Framework**: [TanStack Start](https://tanstack.com/start) (React framework for SSR and streaming).
- **Routing**: [TanStack Router](https://tanstack.com/router) (File-based routing in `src/routes`).
- **3D Engine**: [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) (Declarative Three.js).
- **Animation**:
  - [GSAP](https://gsap.com/) (Greensock Animation Platform) is used for complex animations.
  - [Tempus](https://github.com/darkroomengineering/tempus) manages the animation loop for synchronization.
  - [Lenis](https://lenis.darkroom.engineering/) handles smooth scrolling.
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (configured in `src/styles/index.css`).
- **Build Tool**: [Vite](https://vitejs.dev/).
- **Language**: TypeScript.

## Key Architectural Decisions

- **File-Based Routing**: Routes are defined in `src/routes`. `__root.tsx` acts as the main layout.
- **R3F Canvas**: The 3D scene is often rendered via a portal (`CanvasPortal.tsx`) to allow it to exist outside the normal document flow if needed, or as a background layer.
- **Animation Loop**: We strictly use `Tempus` to manage requestAnimationFrame loops. GSAP and Lenis are synchronized via Tempus to ensure frame-perfect animations without jitter.
- **Server Functions**: We use TanStack Start's server functions for backend logic, ensuring type safety from server to client.

## Code Style

- **Functional Components**: All React components are functional.
- **Hooks**: We rely heavily on hooks (custom and built-in) for logic reuse.
- **Strong Typing**: strict TypeScript usage is enforced. Avoid `any`.
- **Tailwind**: Utility classes are preferred over custom CSS, except for complex animations or specific WebGL needs.
