'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion, type HTMLMotionProps } from 'framer-motion';

import { cn, EASE } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium ring-offset-bg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue/60 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none',
  {
    variants: {
      variant: {
        primary:
          'text-white bg-[linear-gradient(135deg,hsl(var(--accent-blue))_0%,hsl(var(--accent-purple))_100%)] shadow-glow hover:shadow-glow-lg',
        secondary:
          'bg-bg-elevated/70 text-fg border border-border hover:bg-bg-elevated hover:border-accent-blue/50',
        ghost: 'text-fg-muted hover:text-fg hover:bg-bg-elevated/60',
        outline:
          'border border-accent-blue/40 text-fg hover:border-accent-blue hover:shadow-glow bg-transparent'
      },
      size: {
        sm: 'h-9 px-4 text-xs',
        md: 'h-11 px-6',
        lg: 'h-14 px-8 text-base'
      }
    },
    defaultVariants: { variant: 'primary', size: 'md' }
  }
);

export interface ButtonProps
  extends Omit<HTMLMotionProps<'button'>, 'children'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  children?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    if (asChild) {
      // When asChild is true, render via Slot — no motion (Slot needs a single child)
      return (
        <Slot
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ref={ref as any}
          className={cn(buttonVariants({ variant, size, className }))}
        >
          {children}
        </Slot>
      );
    }
    return (
      <motion.button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.25, ease: EASE }}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
