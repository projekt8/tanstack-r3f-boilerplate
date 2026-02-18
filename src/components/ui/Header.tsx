import { useEffect, useState } from 'react';
import { Link, useLocation } from '@tanstack/react-router';
import { useLenis } from 'lenis/react';
import {
  HandMetalIcon,
  HomeIcon,
  MenuIcon,
  MonitorSmartphoneIcon,
  SparklesIcon,
} from 'lucide-react';
import Logo from '@/assets/tanstack-r3f-logo.svg?react';
import IconGitHub from '@/assets/github.svg?react';
import { cn } from '@/lib/utils';
import { NavLink } from '@/components/ui/NavLink';

export const Header = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useLenis(
    (lenis) => {
      if (open) {
        lenis.stop();
      } else {
        lenis.start();
      }
    },
    [open]
  );

  return (
    <header className="fixed z-50 flex w-full items-center justify-between bg-black px-4 py-1 font-medium md:px-8 md:py-4">
      <div className="z-50 flex items-center gap-1 sm:gap-6">
        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          className="size-10 cursor-pointer focus-visible:outline-none"
        >
          <MenuIcon
            className={cn(
              'size-6 duration-300 md:size-8 [&>path]:origin-center [&>path]:transition-transform',
              open &&
                'scale-125 rotate-45 text-accent [&>path:first-child]:-translate-x-[29%] [&>path:first-child]:rotate-90 [&>path:last-child]:-translate-y-[29%] [&>path:nth-child(2)]:scale-0'
            )}
          />
        </button>
        <Link to="/" aria-label="TANSTACK">
          <Logo className="h-4 w-auto md:h-5" />
        </Link>
      </div>
      <a
        href="https://github.com/projekt8/tanstack-r3f-boilerplate"
        target="_blank"
        rel="noreferrer"
        className={cn([
          'relative z-50 inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-white p-1 font-medium text-black transition-all duration-300 sm:p-1.5',
          'hover:text-white focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50',
          'after:absolute after:inset-0 after:-z-1 after:origin-left after:-translate-x-[105%] after:scale-105 after:rounded-full after:bg-gradient-primary after:transition-all after:duration-300 after:content-[""] hover:after:translate-x-0',
        ])}
      >
        <IconGitHub className="size-5 sm:size-6" />
        <span className="mr-1 text-sm sm:mr-2 sm:text-base">GitHub</span>
      </a>

      <nav
        className={cn(
          'fixed top-0 left-0 z-40 h-full w-full bg-black/80 backdrop-blur-lg transition-transform duration-300 ease-out',
          open ? 'translate-x-0' : '-translate-x-[105%]'
        )}
      >
        <ul className="flex h-full w-full flex-col gap-4 bg-black/50 px-6 py-3 pt-25! sm:max-w-xs md:px-8 md:py-4">
          <li>
            <NavLink to="/">
              <span className="rounded-full bg-gradient-primary p-2">
                <HomeIcon className="size-5" />
              </span>
              Home
            </NavLink>
          </li>
          <li className="mt-8 -mb-1 font-bold uppercase">Examples</li>
          <li>
            <NavLink to="/examples/responsive-3d-elements">
              <span className="rounded-full bg-gradient-primary p-2">
                <MonitorSmartphoneIcon className="size-5" />
              </span>
              Responsive Scenes
            </NavLink>
          </li>
          <li>
            <NavLink to="/examples/custom-glsl-shader">
              <span className="rounded-full bg-gradient-primary p-2">
                <SparklesIcon className="size-5" />
              </span>
              Custom GLSL Shader
            </NavLink>
          </li>
          <li>
            <NavLink to="/examples/character-animations">
              <span className="rounded-full bg-gradient-primary p-2">
                <HandMetalIcon className="size-5" />
              </span>
              Character Animations
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
