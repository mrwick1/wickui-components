import { useState, useRef, useCallback } from 'react';

export interface UseFocusProps {
  onFocus?: (event: React.FocusEvent<HTMLButtonElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLButtonElement>) => void;
}

interface UseFocusReturn {
  ref: React.RefObject<HTMLButtonElement>;
  props: {
    ['data-focused']?: boolean;
    onFocus: (event: React.FocusEvent<HTMLButtonElement>) => void;
    onBlur: (event: React.FocusEvent<HTMLButtonElement>) => void;
  };
}

export function useFocus({ onFocus, onBlur }: UseFocusProps): UseFocusReturn {
  const [focused, setFocused] = useState(false);
  const internalRef = useRef<HTMLButtonElement>(null);

  const handleFocus = useCallback(
    (event: React.FocusEvent<HTMLButtonElement>) => {
      setFocused(true);
      onFocus?.(event);
    },
    [onFocus]
  );

  const handleBlur = useCallback(
    (event: React.FocusEvent<HTMLButtonElement>) => {
      setFocused(false);
      onBlur?.(event);
    },
    [onBlur]
  );

  return {
    ref: internalRef,
    props: {
      ...(focused && { 'data-focused': focused }),
      onFocus: handleFocus,
      onBlur: handleBlur,
    },
  };
}
