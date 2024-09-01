import type { TContextRef } from '@frozik/utils';
import { useEffect, useMemo } from 'react';

import { useContextRef } from './useContextRef';
import { useSyncState } from './useSyncState';

export function useAsyncModule<R>(constructor: (ref: TContextRef) => Promise<R>): R | undefined {
    const ref = useContextRef();

    const modulePromise = useMemo(() => constructor(ref), [constructor, ref]);

    const [module, setModule] = useSyncState<R | undefined>(undefined, [modulePromise]);

    useEffect(() => void modulePromise.then(setModule), [modulePromise, setModule]);

    return module;
}
