import { Link } from '@tanstack/react-router';
import Logo from '@/assets/tanstack-r3f-logo.svg?react';
import IconGitHub from '@/assets/github.svg?react';
import { cn } from '@/lib/utils';

export const Header = () => {
  return (
    <header className="z-50 flex items-center justify-between bg-black px-4 py-3 md:px-8 md:py-4">
      <Link to="/" aria-label="TANSTACK">
        <Logo className="h-4 w-auto md:h-5" />
      </Link>
      <nav>
        <ul className="flex items-center gap-8">
          {/* <li className="hidden sm:block">
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/examples/responsive-3d-elements">Examples</Link>
          </li> */}
          <li>
            <a
              href="https://github.com/projekt8/react-three-fiber-tanstack-boilerplate"
              target="_blank"
              rel="noreferrer"
              className={cn([
                'relative z-10 inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-white p-1 font-medium text-black transition-all duration-300 sm:p-1.5',
                'hover:text-white focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50',
                'after:absolute after:inset-0 after:-z-1 after:origin-left after:-translate-x-[105%] after:scale-105 after:rounded-full after:bg-gradient-primary after:transition-all after:duration-300 after:content-[""] hover:after:translate-x-0',
              ])}
            >
              <IconGitHub className="size-5 sm:size-6" />
              <span className="mr-1 text-sm sm:mr-2 sm:text-base">GitHub</span>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};
