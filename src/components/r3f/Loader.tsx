import { useEffect, useState } from 'react';
import { useProgress } from '@react-three/drei';
import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export const Loader = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  const { progress, active } = useProgress();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!active && progress === 100) {
      const timeout = setTimeout(() => setLoaded(true), 500);
      return () => clearTimeout(timeout);
    }
  }, [active, progress]);

  return (
    <div
      className={cn(
        'absolute inset-0 z-10 flex h-full w-full items-center justify-center rounded-3xl transition-opacity duration-200',
        loaded && 'pointer-events-none opacity-0',
        className
      )}
      {...props}
    >
      <div className="flex h-10 w-10 animate-spin items-center justify-center rounded-full border-t-3 border-primary" />
    </div>
  );
};
