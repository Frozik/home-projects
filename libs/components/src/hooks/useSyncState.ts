import { isFunction, noop } from 'lodash-es';
import type { DependencyList } from 'react';
import { useMemo, useSyncExternalStore } from 'react';

export function useSyncState<T>(
    seed: T,
    deps: DependencyList,
): [T, (v: T | ((v: T) => T)) => void] {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const store = useMemo(() => createStore(seed), deps);
    return [useSyncExternalStore(store.subscribe, store.getSnapshot), store.setValue];
}

function createStore<T>(seed: T) {
    let value = seed;
    let trigger = noop;

    return {
        subscribe(onStoreChange: () => void) {
            trigger = onStoreChange;
            return () => (trigger = noop);
        },
        getSnapshot() {
            return value;
        },
        setValue(v: T | ((v: T) => T)) {
            value = isFunction(v) ? v(value) : v;
            trigger();
        },
    };
}
