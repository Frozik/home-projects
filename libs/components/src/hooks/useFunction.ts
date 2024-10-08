import { useCallback, useRef } from 'react';

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
export function useFunction<T extends (...args: any[]) => any>(handler: T): T {
    const ref = useRef<T>(handler);

    ref.current = handler;

    // eslint-disable-next-line react-hooks/exhaustive-deps
    return useCallback(((...args) => ref.current(...args)) as T, []);
}
