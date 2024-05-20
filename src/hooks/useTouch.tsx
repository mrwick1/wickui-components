import { useState, useRef, useCallback } from 'react';

export interface UseTouchProps {
  onTouchStart?: (event: React.TouchEvent<HTMLButtonElement>) => void;
  onTouchEnd?: (event: React.TouchEvent<HTMLButtonElement>) => void;
}

interface UseTouchReturn {
  ref: React.RefObject<HTMLButtonElement>;
  props: {
    ['data-touched']?: boolean;
    onTouchStart: (event: React.TouchEvent<HTMLButtonElement>) => void;
    onTouchEnd: (event: React.TouchEvent<HTMLButtonElement>) => void;
  };
}

export function useTouch({
  onTouchStart,
  onTouchEnd,
}: UseTouchProps): UseTouchReturn {
  const [touched, setTouched] = useState(false);
  const internalRef = useRef<HTMLButtonElement>(null);

  const handleTouchStart = useCallback(
    (event: React.TouchEvent<HTMLButtonElement>) => {
      setTouched(true);
      onTouchStart?.(event);
    },
    [onTouchStart]
  );

  const handleTouchEnd = useCallback(
    (event: React.TouchEvent<HTMLButtonElement>) => {
      setTouched(false);
      onTouchEnd?.(event);
    },
    [onTouchEnd]
  );

  return {
    ref: internalRef,
    props: {
      ...(touched && { 'data-touched': touched }),
      onTouchStart: handleTouchStart,
      onTouchEnd: handleTouchEnd,
    },
  };
}
