import { useState, useRef, useCallback } from 'react';

export interface UseButtonProps {
  onClick?: (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLButtonElement>
  ) => void;
  onMouseDown?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseUp?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
  onKeyUp?: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
  isDisabled?: boolean;
}

interface UseButtonReturn {
  ref: React.RefObject<HTMLButtonElement>;
  props: {
    role: string;
    tabIndex: number;
    'aria-disabled'?: boolean;
    'aria-pressed'?: boolean;
    onClick: (
      event:
        | React.MouseEvent<HTMLButtonElement>
        | React.KeyboardEvent<HTMLButtonElement>
    ) => void;
    onMouseDown: (event: React.MouseEvent<HTMLButtonElement>) => void;
    onMouseUp: (event: React.MouseEvent<HTMLButtonElement>) => void;
    onKeyDown: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
    onKeyUp: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
  };
}

export function useButton({
  onClick,
  onMouseDown,
  onMouseUp,
  onKeyDown,
  onKeyUp,
  isDisabled,
}: UseButtonProps): UseButtonReturn {
  const [pressed, setPressed] = useState(false);
  const internalRef = useRef<HTMLButtonElement>(null);

  const handleMouseDown = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (!isDisabled) {
        setPressed(true);
        onMouseDown?.(event);
      }
    },
    [isDisabled, onMouseDown]
  );

  const handleMouseUp = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (!isDisabled) {
        setPressed(false);
        onMouseUp?.(event);
      }
    },
    [isDisabled, onMouseUp]
  );

  const handleClick = useCallback(
    (
      event:
        | React.MouseEvent<HTMLButtonElement>
        | React.KeyboardEvent<HTMLButtonElement>
    ) => {
      if (!isDisabled && onClick) {
        onClick(event);
      }
    },
    [isDisabled, onClick]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (!isDisabled && (event.key === 'Enter' || event.key === ' ')) {
        setPressed(true);
        onKeyDown?.(event);
        if (event.key === ' ' || event.key === 'Enter') {
          event.preventDefault(); // Prevent scrolling when space is pressed
          onClick?.(event);
        }
      }
    },
    [isDisabled, onKeyDown, onClick]
  );

  const handleKeyUp = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (!isDisabled && (event.key === 'Enter' || event.key === ' ')) {
        setPressed(false);
        onKeyUp?.(event);
      }
    },
    [isDisabled, onKeyUp]
  );

  return {
    ref: internalRef,
    props: {
      role: 'button',
      tabIndex: isDisabled ? -1 : 0, // Ensure button is focusable when not disabled
      ...(isDisabled && { 'aria-disabled': true }),
      ...(pressed && { 'aria-pressed': pressed }),
      onClick: handleClick,
      onMouseDown: handleMouseDown,
      onMouseUp: handleMouseUp,
      onKeyDown: handleKeyDown,
      onKeyUp: handleKeyUp,
    },
  };
}
