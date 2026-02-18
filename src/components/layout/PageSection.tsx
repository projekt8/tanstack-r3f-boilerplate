import { cva } from 'class-variance-authority';
import type { VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export const pageSectionVariants = cva('', {
  variants: {
    width: {
      default: 'mx-auto w-full max-w-7xl px-6 md:px-8',
      narrow: 'mx-auto w-full max-w-3xl gap-4 px-6 md:px-8',
      full: 'w-full',
    },
    layout: {
      default: 'text-center',
      '2cols': 'grid grid-cols-1 gap-8 text-left md:grid-cols-2',
      '3cols': 'grid grid-cols-1 gap-8 text-left md:grid-cols-3',
    },
  },
  defaultVariants: {
    width: 'default',
    layout: 'default',
  },
});

export interface PageSectionProps
  extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof pageSectionVariants> {}

export const PageSection = ({ children, className, width, layout, ...props }: PageSectionProps) => {
  return (
    <section className={cn(pageSectionVariants({ width, layout }), className)} {...props}>
      {children}
    </section>
  );
};
