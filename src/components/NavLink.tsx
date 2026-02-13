import { Link, type LinkComponentProps } from '@tanstack/react-router';
import { cn } from '@/lib/utils';

export const NavLink = ({ children, className, ...props }: LinkComponentProps) => {
  return (
    <Link
      className={cn(
        [
          'relative z-10 inline-flex items-center justify-center gap-2 font-medium text-white transition-colors duration-300',
          'after:absolute after:right-0 after:-bottom-1 after:left-0 after:h-0.5 after:scale-x-0 after:bg-gradient-primary after:transition-transform after:duration-300 after:ease-out after:content-[""] hover:after:scale-x-100',
        ],
        className
      )}
      inactiveProps={{
        className: 'text-white/70',
      }}
      {...props}
    >
      {children}
    </Link>
  );
};
