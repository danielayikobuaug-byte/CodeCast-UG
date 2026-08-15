'use client';

import { useMemo, useRef } from 'react';

/**
 * Custom hook to memoize a Firebase reference or query.
 * Firebase SDK objects (DocumentReference, Query, etc.) are often new instances on every creation.
 * This hook ensures that the instance remains the same if dependencies haven't changed.
 */
export function useMemoFirebase<T>(factory: () => T, deps: any[]): T {
  const ref = useRef<T | null>(null);
  const prevDeps = useRef<any[]>([]);

  const changed = !deps.every((dep, i) => dep === prevDeps.current[i]);

  if (changed || ref.current === null) {
    ref.current = factory();
    prevDeps.current = deps;
  }

  return ref.current!;
}
