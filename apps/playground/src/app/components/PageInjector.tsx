import type { Slice } from '@reduxjs/toolkit';
import { isNil } from 'lodash-es';
import type { ComponentType, ReactNode } from 'react';
import { lazy, memo, Suspense, useEffect, useMemo, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import type { Saga } from 'redux-saga';

import { useDynamicStoreManager } from './DynamicStoreManager';

export interface IDynamicStoreParts {
    slice?: Slice;
    saga?: Saga;
}

export const PageInjector = memo(
    ({
        lazyComponent,
        children,
    }: {
        lazyComponent: () => Promise<ComponentType>;
        children?: ReactNode;
    }) => {
        const { addSlice, removeSlice, addSaga, removeSaga } = useDynamicStoreManager();

        const { slice, saga } = (useLoaderData() as IDynamicStoreParts | undefined) ?? {};

        const [registered, setRegistered] = useState(false);

        useEffect(() => {
            !isNil(slice) && addSlice(slice);
            !isNil(saga) && addSaga(saga);

            setRegistered(true);

            return () => {
                !isNil(slice) && removeSlice(slice);
                !isNil(saga) && removeSaga(saga);

                setRegistered(false);
            };
        }, [saga, slice, addSaga, addSlice, removeSaga, removeSlice, setRegistered]);

        const LazyComponent = useMemo(
            () => lazy(async () => ({ default: await lazyComponent() })),
            [lazyComponent],
        );

        return registered ? (
            <Suspense fallback={children}>
                <LazyComponent />
            </Suspense>
        ) : (
            children
        );
    },
);
