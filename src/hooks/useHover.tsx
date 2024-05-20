import { useState, useRef, useCallback } from 'react';

export interface UseHoverProps {
  onHoverStart?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onHoverEnd?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

interface UseHoverReturn {
  ref: React.RefObject<HTMLButtonElement>;
  props: {
    ['data-hovered']?: boolean;
    onMouseEnter: (event: React.MouseEvent<HTMLButtonElement>) => void;
    onMouseLeave: (event: React.MouseEvent<HTMLButtonElement>) => void;
  };
}

export function useHover({
  onHoverStart,
  onHoverEnd,
}: UseHoverProps): UseHoverReturn {
  const [hovered, setHovered] = useState(false);
  const internalRef = useRef<HTMLButtonElement>(null);

  const handleMouseEnter = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setHovered(true);
      onHoverStart?.(event);
    },
    [onHoverStart]
  );

  const handleMouseLeave = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setHovered(false);
      onHoverEnd?.(event);
    },
    [onHoverEnd]
  );

  return {
    ref: internalRef,
    props: {
      ...(hovered && { 'data-hovered': hovered }),
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
    },
  };
}
