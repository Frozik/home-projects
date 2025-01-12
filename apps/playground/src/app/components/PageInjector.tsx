import { useSyncState } from '@frozik/components';
import type { Slice } from '@reduxjs/toolkit';
import { isNil } from 'lodash-es';
import type { ComponentType, FunctionComponent, ReactNode } from 'react';
import { lazy, memo, Suspense, useEffect, useMemo } from 'react';
import { useLoaderData } from 'react-router-dom';
import type { Saga } from 'redux-saga';

import { useDynamicStoreManager } from './DynamicStoreManager';

export interface IDynamicStoreParts {
    slice?: Slice;
    saga?: Saga;
}

function RawPageInjector<T extends ComponentType>({
    lazyComponent,
    children,
}: {
    lazyComponent: () => Promise<T>;
    children?: ReactNode;
}) {
    const { addSlice, removeSlice, addSaga, removeSaga } = useDynamicStoreManager();
    const { slice, saga } = (useLoaderData() as IDynamicStoreParts | undefined) ?? {};
    const [registered, setRegistered] = useSyncState(false, [lazyComponent]);

    useEffect(() => {
        if (!isNil(slice)) {
            addSlice(slice);
        }
        if (!isNil(saga)) {
            addSaga(saga);
        }

        setRegistered(true);

        return () => {
            if (!isNil(slice)) {
                removeSlice(slice);
            }
            if (!isNil(saga)) {
                removeSaga(saga);
            }

            setRegistered(false);
        };
    }, [saga, slice, addSaga, addSlice, removeSaga, removeSlice, setRegistered]);

    const LazyComponent = useMemo(
        () =>
            lazy(() =>
                lazyComponent().then((Component: ComponentType) => ({ default: Component })),
            ),
        [lazyComponent],
    );

    return registered ? (
        <Suspense fallback={children}>
            <LazyComponent />
        </Suspense>
    ) : (
        children
    );
}

export const PageInjector: typeof RawPageInjector = memo(RawPageInjector as FunctionComponent);
