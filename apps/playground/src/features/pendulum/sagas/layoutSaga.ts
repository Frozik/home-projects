import DeploymentUnitOutlined from '@ant-design/icons-svg/lib/asn/DeploymentUnitOutlined';
import EyeOutlined from '@ant-design/icons-svg/lib/asn/EyeOutlined';
import {
    createSyncedValueDescriptor,
    isSyncedValueDescriptor,
    parseJson,
    type TValueDescriptor,
} from '@frozik/utils';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { SerializedDockview } from 'dockview';
import { isEqual, isNil } from 'lodash-es';
import type { SagaIterator } from 'redux-saga';
import { buffers, eventChannel } from 'redux-saga';
import { call, cancelled, fork, put, take, takeEvery, takeLatest } from 'redux-saga/effects';

import type { IAction } from '../../../app/commonSlice';
import { clearMenuActions, setMenuActions } from '../../../app/commonSlice';
import type { IModuleSaga } from '../../../app/saga';
import { ALL_LAYOUTS, DEFAULT_LAYOUT, getLayout } from '../layout';
import type { TModuleTabManager } from '../modules/ModuleTabManager';
import { ModuleTabManager } from '../modules/ModuleTabManager';
import { openTab, setLayout, updateLayout } from '../pendulumSlice';

const PENDULUM_LAYOUT_KEY = '[settings] pendulum-layout';

export function* layoutSaga(getModule: IModuleSaga): SagaIterator {
    yield fork(syncLayoutSaga);

    yield takeLatest(updateLayout.type, changeLayoutSaga);

    yield takeEvery(openTab.type, openTabSaga, getModule);
}

function* changeLayoutSaga({ payload }: PayloadAction<SerializedDockview>): SagaIterator {
    yield call([localStorage, 'setItem'], PENDULUM_LAYOUT_KEY, JSON.stringify(payload));

    yield call(updateMenuActionsSaga, payload);
}

function* syncLayoutSaga(): SagaIterator {
    const channel = eventChannel<TValueDescriptor<SerializedDockview>>((emitter) => {
        const rawLayout = localStorage.getItem(PENDULUM_LAYOUT_KEY) as string | null;
        const initialLayout = parseJson(rawLayout) as SerializedDockview | undefined;

        emitter(createSyncedValueDescriptor(isNil(initialLayout) ? DEFAULT_LAYOUT : initialLayout));

        let prevLayout: SerializedDockview | undefined = initialLayout;

        function storageEvent({ storageArea, key, newValue }: StorageEvent) {
            const layout = parseJson<SerializedDockview>(newValue);

            if (
                storageArea === localStorage &&
                key === PENDULUM_LAYOUT_KEY &&
                !isNil(layout) &&
                !isEqual(prevLayout, layout)
            ) {
                prevLayout = layout;
                emitter(createSyncedValueDescriptor(layout));
            }
        }

        window.addEventListener('storage', storageEvent, false);

        return () => window.removeEventListener('storage', storageEvent, false);
    }, buffers.sliding(1));

    try {
        while (true) {
            const layout: TValueDescriptor<SerializedDockview> = yield take(channel);

            yield put(setLayout(layout));

            if (isSyncedValueDescriptor(layout)) {
                yield call(updateMenuActionsSaga, layout.value);
            }
        }
    } finally {
        if (yield cancelled()) {
            channel.close();
            yield put(clearMenuActions());
        }
    }
}

function* openTabSaga(getModule: IModuleSaga, { payload }: PayloadAction<string>): SagaIterator {
    const module: TModuleTabManager = yield call(getModule, ModuleTabManager);
    yield call([module, 'openTab'], {
        ...getLayout(payload),
        position: {
            direction: 'below',
        },
    });
}

function* updateMenuActionsSaga(layout: SerializedDockview): SagaIterator {
    const menuActions: IAction[] = yield call(getActions, layout);

    yield put(setMenuActions(menuActions));
}

function getActions(layout: SerializedDockview): IAction[] {
    const allLayoutIds = ALL_LAYOUTS.map(({ id }) => id);
    const existingLayoutIds = new Set(Object.keys(layout.panels));

    const missingLayouts = allLayoutIds.filter((id) => !existingLayoutIds.has(id));

    return missingLayouts.map(
        (id): IAction => ({
            icon: getIconForTab(id),
            name: id,
            payloadAction: openTab(id),
            tooltip: id,
        }),
    );
}

function getIconForTab(tabId: string): IAction['icon'] {
    switch (tabId) {
        case 'Test Playground':
            return EyeOutlined;
        case 'Neural Network':
            return DeploymentUnitOutlined;
        default:
            return undefined;
    }
}
