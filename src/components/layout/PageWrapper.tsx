import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export const PageWrapper = ({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <main
      className={cn('z-10 grid grid-cols-1 gap-20 py-16 pt-25 md:py-25 md:pt-36', className)}
      {...props}
    >
      {children}
    </main>
  );
};
