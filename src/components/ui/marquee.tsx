import * as React from 'react';
import { cn } from '../../lib/utils';

export interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  pauseOnHover?: boolean;
  reverse?: boolean;
  fade?: boolean;
}

export const Marquee = React.forwardRef<HTMLDivElement, MarqueeProps>(
  ({ className, children, pauseOnHover, reverse, fade, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('group flex gap-6 overflow-hidden', className)}
        {...props}
      >
        <div
          className={cn(
            'flex min-width-full shrink-0 items-center justify-around gap-6',
            'animate-[marquee_var(--duration,40s)_linear_infinite]',
            reverse && 'animation-direction-reverse',
            pauseOnHover && 'group-hover:animation-play-state-paused'
          )}
        >
          {children}
        </div>
        <div
          aria-hidden
          className={cn(
            'flex min-width-full shrink-0 items-center justify-around gap-6',
            'animate-[marquee_var(--duration,40s)_linear_infinite]',
            reverse && 'animation-direction-reverse',
            pauseOnHover && 'group-hover:animation-play-state-paused'
          )}
        >
          {children}
        </div>
      </div>
    );
  }
);

Marquee.displayName = 'Marquee';