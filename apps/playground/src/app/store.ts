import { isProduction } from '@frozik/utils';
import createSagaMiddleware from '@redux-saga/core';
import type { EnhancedStore, Middleware, Slice, Tuple, UnknownAction } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import type { Saga } from 'redux-saga';

import { commonSlice } from './commonSlice';
import { registerSaga, registerSlice, saga, unregisterSaga, unregisterSlice } from './saga';

export function createStore<TState extends {}>(
    preloadedState?: Partial<TState>,
): {
    store: EnhancedStore<TState>;
    addSlice: (slice: Slice) => void;
    removeSlice: (slice: Slice) => void;
    addSaga: (saga: Saga) => void;
    removeSaga: (saga: Saga) => void;
} {
    const sagaMiddleware = createSagaMiddleware<TState>();

    const store = configureStore<TState, UnknownAction, Tuple<Middleware<TState>[]>>({
        reducer: () => ({}) as TState,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: [
                        registerSlice.type,
                        unregisterSlice.type,
                        registerSaga.type,
                        unregisterSaga.type,
                    ],
                },
            }).concat(sagaMiddleware),
        preloadedState: preloadedState as TState,
        devTools: !isProduction(),
    }) as EnhancedStore<TState>;

    sagaMiddleware.run(saga(store));

    setupListeners(store.dispatch);

    store.dispatch(registerSlice(commonSlice));

    return {
        store,
        addSlice(slice: Slice) {
            store.dispatch(registerSlice(slice));
        },
        removeSlice(slice: Slice) {
            store.dispatch(unregisterSlice(slice));
        },
        addSaga(saga: Saga) {
            store.dispatch(registerSaga(saga));
        },
        removeSaga(saga: Saga) {
            store.dispatch(unregisterSaga(saga));
        },
    };
}
