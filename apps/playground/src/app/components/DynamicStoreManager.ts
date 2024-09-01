import type { Slice } from '@reduxjs/toolkit';
import { createContext, useContext } from 'react';
import type { Saga } from 'redux-saga';

interface IDynamicStore {
    addSlice: (slice: Slice) => void;
    removeSlice: (slice: Slice) => void;
    addSaga: (saga: Saga) => void;
    removeSaga: (saga: Saga) => void;
}

const DynamicStoreManager = createContext<IDynamicStore>({
    addSlice: throwNotConfigured,
    removeSlice: throwNotConfigured,
    addSaga: throwNotConfigured,
    removeSaga: throwNotConfigured,
});

export const { Provider: DynamicStoreManagerProvider } = DynamicStoreManager;

export function useDynamicStoreManager(): IDynamicStore {
    return useContext(DynamicStoreManager);
}

function throwNotConfigured() {
    throw new Error('Dynamic store provider methods are not set');
}
