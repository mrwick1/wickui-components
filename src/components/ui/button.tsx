import React, { forwardRef } from 'react';

import { cn, mergeRefs } from '../../lib/utils';
import { useButton, UseButtonProps } from '../../hooks/useButton';
import { useHover, UseHoverProps } from '../../hooks/useHover';
import { useTouch, UseTouchProps } from '../../hooks/useTouch';
import { useFocus, UseFocusProps } from '../../hooks/useFocus';
import { cva, type VariantProps } from 'class-variance-authority';

interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>,
    UseButtonProps,
    VariantProps<typeof buttonVariants>,
    UseHoverProps,
    UseTouchProps,
    UseFocusProps {
  children?: React.ReactNode;
  asChild?: boolean;
  className?: string;
}

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { size, variant, className } = props;
  const { ref: buttonRef, props: buttonProps } = useButton({ ...props });
  const { ref: hoverRef, props: hoverProps } = useHover({ ...props });
  const { ref: touchRef, props: touchProps } = useTouch({ ...props });
  const { ref: focusRef, props: focusProps } = useFocus({ ...props });
  const Comp = 'button';

  const combinedProps = {
    ...props,
    ...touchProps,
    ...buttonProps,
    ...hoverProps,
    ...focusProps,
  };

  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      {...combinedProps}
      ref={mergeRefs(ref, buttonRef, hoverRef, touchRef, focusRef)}
    >
      {props.children}
    </Comp>
  );
});

Button.displayName = 'Button';

export default Button;
