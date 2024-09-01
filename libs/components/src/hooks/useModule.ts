import type { TContextRef } from '@frozik/utils';
import { useMemo } from 'react';

import { useContextRef } from './useContextRef';

export function useModule<R>(constructor: (ref: TContextRef) => R): R {
    const ref = useContextRef();

    return useMemo(() => constructor(ref), [constructor, ref]);
}
