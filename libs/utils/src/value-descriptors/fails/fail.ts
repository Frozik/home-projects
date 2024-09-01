import type { TStructurallyCloneable } from '@frozik/types';

import type { TFailConstructor } from './defs';
import { FAIL_TAG } from './defs';

const prefixSet = new Set<string>();

export const Fail: TFailConstructor = ((code: string, meta?: TStructurallyCloneable) => {
    return {
        tag: FAIL_TAG,
        code,
        meta,
    };
}) as unknown as TFailConstructor;

export function FailFactory<P extends string>(prefix: P): TFailConstructor<P> {
    if (prefixSet.has(prefix)) {
        throw new Error(`Prefix ${prefix} already used`);
    }

    prefixSet.add(prefix);

    return ((code: unknown, meta: TStructurallyCloneable) =>
        Fail(`[${prefix}]: ${code}`, meta)) as TFailConstructor<P>;
}
