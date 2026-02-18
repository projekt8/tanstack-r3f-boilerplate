import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface MultiSwitchProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Controlled active index */
  value?: number;
  /** Called when the active index changes */
  onChange?: (index: number) => void;
  /** Default active index for uncontrolled usage */
  defaultValue?: number;
  /** Array of items to render. Can be strings or objects with label and onClick. */
  items: Array<string | { label: string; onClick?: () => void }>;
}

export const MultiSwitch = ({
  className,
  value,
  onChange,
  defaultValue = 0,
  items,
  ...props
}: MultiSwitchProps) => {
  const controlled = value !== undefined;
  const [internalIndex, setInternalIndex] = useState(defaultValue);
  const activeIndex = controlled ? value : internalIndex;

  const containerRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<Array<HTMLButtonElement | null>>([]);

  const handleItemClick = (index: number, itemOnClick?: () => void) => {
    if (!controlled) setInternalIndex(index);
    onChange?.(index);
    itemOnClick?.();
  };

  useGSAP(
    () => {
      const activeEl = itemsRef.current[activeIndex];
      const container = containerRef.current;

      // Initial state setup or if elements aren't ready
      if (!activeEl || !container) return;

      const containerRect = container.getBoundingClientRect();
      const activeRect = activeEl.getBoundingClientRect();

      const targetX = activeRect.left - containerRect.left;
      const targetWidth = activeRect.width;

      gsap.to(indicatorRef.current, {
        x: targetX,
        width: targetWidth,
        duration: 0.3,
        ease: 'power2.out',
      });
    },
    { dependencies: [activeIndex, items], scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative inline-flex items-center rounded-full border border-neutral-700 bg-neutral-800/80 p-2',
        className
      )}
      role="radiogroup"
      {...props}
    >
      {/* Sliding indicator */}
      <div
        ref={indicatorRef}
        className="pointer-events-none absolute inset-y-2 left-0 rounded-full bg-gradient-primary shadow-sm"
      />
      {items.map((item, index) => {
        const label = typeof item === 'string' ? item : item.label;
        const onClick = typeof item === 'object' ? item.onClick : undefined;
        const isActive = activeIndex === index;

        return (
          <button
            key={index}
            ref={(el) => {
              itemsRef.current[index] = el;
            }}
            role="radio"
            aria-checked={isActive}
            className={cn(
              'relative z-10 cursor-pointer rounded-full px-5 py-2 font-medium transition-colors duration-200',
              isActive ? 'text-white' : 'text-white/70 hover:text-white/80'
            )}
            onClick={() => handleItemClick(index, onClick)}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};
