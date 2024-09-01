import type { ISO } from '@frozik/types';
import type { TValueDescriptor } from '@frozik/utils';
import {
    convertErrorToFail,
    createSyncedValueDescriptor,
    createUnsyncedValueDescriptor,
    EMPTY_VD,
    isFailValueDescriptor,
    isSyncedValueDescriptor,
    iterateObservable,
    matchValueDescriptor,
} from '@frozik/utils';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { SagaIterator } from 'redux-saga';
import { call, fork, put, takeEvery } from 'redux-saga/effects';

import type { IModuleSaga } from '../../../app/saga';
import type { IGeneration } from '../defs';
import type { TModuleIndexDBGenerations } from '../modules/ModuleIndexDBGenerations';
import { ModuleIndexDBGenerations } from '../modules/ModuleIndexDBGenerations';
import {
    addCompetitionRun,
    loadCompetition,
    setCompetitionsList,
    setCurrentCompetition,
} from '../pendulumSlice';

export function* generationsSaga(getModule: IModuleSaga): SagaIterator {
    const module: TModuleIndexDBGenerations = yield call(getModule, ModuleIndexDBGenerations);

    yield fork(syncLastCompetitionsStart, module);

    yield takeEvery(addCompetitionRun.type, addGenerationsSaga, module);

    yield takeEvery(loadCompetition.type, loadCompetitionGenerationsSaga, module);
}

function* addGenerationsSaga(
    module: TModuleIndexDBGenerations,
    {
        payload: { competitionStart, generation },
    }: PayloadAction<{ competitionStart: ISO; generation: IGeneration }>,
): SagaIterator {
    try {
        yield call([module, 'addGeneration$'], competitionStart, generation);
    } catch (error) {
        yield put(
            setCurrentCompetition(
                createUnsyncedValueDescriptor(convertErrorToFail(error as Error)),
            ),
        );
    }
}

function* loadCompetitionGenerationsSaga(
    module: TModuleIndexDBGenerations,
    { payload: start }: PayloadAction<ISO>,
) {
    yield iterateObservable(
        yield call([module, 'getGenerations$'], start),
        function* (valueDescriptor: TValueDescriptor<IGeneration[]>): SagaIterator<boolean> {
            yield put(
                setCurrentCompetition(
                    matchValueDescriptor(valueDescriptor, ({ value: generations }) =>
                        createSyncedValueDescriptor({
                            competitionStart: start,
                            generations,
                        }),
                    ),
                ),
            );

            return (
                !isSyncedValueDescriptor(valueDescriptor) && !isFailValueDescriptor(valueDescriptor)
            );
        },
    );
}

export function* syncLastCompetitionsStart(module: TModuleIndexDBGenerations) {
    yield iterateObservable(
        yield call([module, 'getCompetitionsStarts$']),
        function* (valueDescriptor: TValueDescriptor<ISO[]>): SagaIterator<void> {
            yield put(
                setCompetitionsList(
                    matchValueDescriptor(valueDescriptor, ({ value }) =>
                        value.length > 0 ? createSyncedValueDescriptor(value) : EMPTY_VD,
                    ),
                ),
            );
        },
    );
}
