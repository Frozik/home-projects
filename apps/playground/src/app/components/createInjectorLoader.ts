import { assert } from '@frozik/utils';
import type { Slice } from '@reduxjs/toolkit';
import { isNil } from 'lodash-es';
import type { Saga } from 'redux-saga';

import type { IDynamicStoreParts } from './PageInjector';

export function createInjectorLoader({
    sliceResolver,
    sagaResolver,
}: {
    sliceResolver?: () => Promise<Slice>;
    sagaResolver?: () => Promise<Saga>;
}): () => Promise<IDynamicStoreParts> {
    assert(
        !isNil(sliceResolver) || !isNil(sagaResolver),
        'Either sliceResolver or sagaResolver must be provided',
    );

    return () =>
        Promise.all([
            isNil(sliceResolver) ? Promise.resolve(undefined) : sliceResolver(),
            isNil(sagaResolver) ? Promise.resolve(undefined) : sagaResolver(),
        ]).then(([slice, saga]) => ({ slice, saga }));
}
