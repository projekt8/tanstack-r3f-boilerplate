import { Link } from '@tanstack/react-router';
import type { LinkComponentProps } from '@tanstack/react-router';
import { cn } from '@/lib/utils';

export const NavLink = ({ children, className, ...props }: LinkComponentProps) => {
  return (
    <Link
      className={cn(
        [
          'relative z-10 flex items-center gap-4 overflow-hidden rounded-full leading-none font-semibold transition-colors duration-300 text-shadow-black/10 text-shadow-md',
          'after:absolute after:inset-0 after:-z-10 after:origin-left after:-translate-x-full after:rounded-full after:bg-gradient-primary after:transition-transform after:duration-300 after:ease-out after:content-[""] hover:after:translate-x-0',
        ],
        className
      )}
      activeProps={{
        className: 'after:translate-x-0',
      }}
      {...props}
    >
      {children}
    </Link>
  );
};
