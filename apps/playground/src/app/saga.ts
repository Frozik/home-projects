import type { IModuleConstructor, TContextRef, TModuleApi } from '@frozik/utils';
import { assert, isProduction, toContextRef } from '@frozik/utils';
import type { Saga } from '@redux-saga/core';
import type { PayloadAction, Reducer, Slice, Store } from '@reduxjs/toolkit';
import { combineSlices, createAction } from '@reduxjs/toolkit';
import { isNil } from 'lodash-es';
import type { SagaIterator, Task } from 'redux-saga';
import { call, cancel, fork, takeEvery } from 'redux-saga/effects';

const SAGA_PREFIX = <const>'__SAGA__';

export interface IModuleSaga {
    <T extends IModuleConstructor<unknown>>(module: T): SagaIterator<TModuleApi<T>>;
}

export function saga(store: Store) {
    const sagaMap = new Map<Saga, Task>();
    const sagaCounterMap = new Map<Saga, number>();
    const sliceCounterMap = new Map<Slice, number>();

    const development = !isProduction();

    const getModule = getModuleSagaBuilder(toContextRef(store));

    return function* rootSaga(): SagaIterator {
        yield takeEvery(
            registerSaga.type,
            injectSaga,
            getModule,
            sagaMap,
            sagaCounterMap,
            development,
        );
        yield takeEvery(unregisterSaga.type, disposeSaga, sagaMap, sagaCounterMap, development);

        yield takeEvery(registerSlice.type, injectSlice, store, sliceCounterMap, development);
        yield takeEvery(unregisterSlice.type, disposeSlice, store, sliceCounterMap, development);
    };
}

function* injectSaga(
    getModule: IModuleSaga,
    sagaMap: Map<Saga, Task>,
    sagaCounterMap: Map<Saga, number>,
    development: boolean,
    { payload: saga }: PayloadAction<Saga>,
): SagaIterator {
    const hasSaga: boolean = yield call([sagaMap, 'has'], saga);
    const counter = ((yield call([sagaCounterMap, 'get'], saga)) as number | undefined) ?? 0;

    assert(
        (counter > 0 && hasSaga) || (counter === 0 && !hasSaga),
        'Synchronization between saga cooldown map and saga counter map is broken',
    );

    yield call([sagaCounterMap, 'set'], saga, counter + 1);

    if (counter === 0) {
        development && console.info(`Registering new saga: ${saga.name}`);

        const task: Task = yield fork(saga, getModule);

        yield call([sagaMap, 'set'], saga, task);
    }
}

function* disposeSaga(
    sagaMap: Map<Saga, Task>,
    sagaCounterMap: Map<Saga, number>,
    development: boolean,
    { payload: saga }: PayloadAction<Saga>,
): SagaIterator {
    const task: Task | undefined = yield call([sagaMap, 'get'], saga);
    const counter = ((yield call([sagaCounterMap, 'get'], saga)) as number | undefined) ?? 0;

    assert(counter > 0, 'Unregistering saga before it was registered');
    assert(!isNil(task), 'Saga cooldown task was not found');

    const newCounter = counter - 1;

    if (newCounter === 0) {
        development && console.info(`Unregistering saga: ${saga.name}`);

        yield cancel(task);

        yield call([sagaMap, 'delete'], saga);
        yield call([sagaCounterMap, 'delete'], saga);
    } else {
        yield call([sagaCounterMap, 'set'], saga, newCounter);
    }
}

function* injectSlice(
    store: Store,
    sliceCounterMap: Map<Slice, number>,
    development: boolean,
    { payload: slice }: PayloadAction<Slice>,
): SagaIterator {
    const counter = ((yield call([sliceCounterMap, 'get'], slice)) as number | undefined) ?? 0;

    yield call([sliceCounterMap, 'set'], slice, counter + 1);

    if (counter === 0) {
        development && console.info(`Registering new slice: ${slice.name}`);

        const combinedReducer: Reducer = yield call(
            combineSlices,
            ...Array.from(sliceCounterMap.keys()),
        );

        yield call([store, 'replaceReducer'], combinedReducer);
    }
}

function* disposeSlice(
    store: Store,
    sliceCounterMap: Map<Slice, number>,
    development: boolean,
    { payload: slice }: PayloadAction<Slice>,
): SagaIterator {
    const counter = ((yield call([sliceCounterMap, 'get'], slice)) as number | undefined) ?? 0;

    assert(counter > 0, 'Unregistering saga before it was registered');

    const newCounter = counter - 1;

    if (newCounter === 0) {
        development && console.info(`Unregistering slice: ${slice.name}`);

        yield call([sliceCounterMap, 'delete'], slice);

        const combinedReducer: Reducer = yield call(
            combineSlices,
            ...Array.from(sliceCounterMap.keys()),
        );

        yield call([store, 'replaceReducer'], combinedReducer);
    } else {
        yield call([sliceCounterMap, 'set'], slice, newCounter);
    }
}

function getModuleSagaBuilder(contextRef: TContextRef): IModuleSaga {
    return function* getModule<T extends IModuleConstructor<unknown>>(
        module: T,
    ): SagaIterator<TModuleApi<T>> {
        return yield call(module as (contextRef: TContextRef) => TModuleApi<T>, contextRef);
    };
}

export const registerSaga = createAction<Saga>(`${SAGA_PREFIX}/registerSaga`);
export const unregisterSaga = createAction<Saga>(`${SAGA_PREFIX}/unregisterSaga`);

export const registerSlice = createAction<Slice>(`${SAGA_PREFIX}/registerSlice`);
export const unregisterSlice = createAction<Slice>(`${SAGA_PREFIX}/unregisterSlice`);
