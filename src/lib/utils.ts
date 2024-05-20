/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
// utils.ts
import { Ref, MutableRefObject } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function mergeRefs<T>(...refs: Array<Ref<T> | undefined>): Ref<T> {
  return (value: T) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(value);
      } else if (ref != null) {
        (ref as MutableRefObject<T | null>).current = value;
      }
    });
  };
}

function isFunction(val: any): val is Function {
  return typeof val === 'function';
}

function flattenProps<T extends Record<string, any>>(
  propsList: Array<T | T[]>
): T[] {
  const flatProps: T[] = [];
  for (const props of propsList) {
    if (Array.isArray(props)) {
      flatProps.push(...props);
    } else {
      flatProps.push(props);
    }
  }
  return flatProps;
}

export function mergeProps<T extends Record<string, any>>(
  ...propsList: Array<T | T[]>
): T {
  const flatProps = flattenProps(propsList);
  const result: Partial<T> = {};

  // Merge all provided props
  for (const props of flatProps) {
    for (const key in props) {
      if (Object.prototype.hasOwnProperty.call(props, key)) {
        const existingProp = result[key];
        const newProp = props[key];

        if (isFunction(newProp) && isFunction(existingProp)) {
          // Combine function properties
          result[key] = ((...args: any[]) => {
            existingProp(...args);
            newProp(...args);
          }) as any;
        } else {
          // Override with new property
          result[key] = newProp;
        }
      }
    }
  }

  return result as T;
}
