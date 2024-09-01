import type { SagaIterator } from 'redux-saga';
import { fork } from 'redux-saga/effects';

import type { IModuleSaga } from '../../app/saga';
import { generationsSaga } from './sagas/generationsSaga';
import { layoutSaga } from './sagas/layoutSaga';

export function* pendulumSaga(getModule: IModuleSaga): SagaIterator {
    yield fork(layoutSaga, getModule);
    yield fork(generationsSaga, getModule);
}
