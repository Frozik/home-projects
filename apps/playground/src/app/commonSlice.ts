import type { IconDefinition } from '@ant-design/icons-svg/lib/types';
import type { PayloadAction, UnknownAction } from '@reduxjs/toolkit';

import { createAppSlice } from './createAppSlice';

export interface IAction {
    icon?: IconDefinition;
    name: string;
    payloadAction: UnknownAction;
    tooltip?: string;
}

export interface ICommonSliceState {
    manuActions: IAction[];
}

const INITIAL_STATE: ICommonSliceState = {
    manuActions: [],
};

export const commonSlice = createAppSlice({
    name: 'common',
    initialState: INITIAL_STATE,
    reducers: (create) => ({
        setMenuActions: create.reducer((state, { payload }: PayloadAction<IAction[]>) => {
            state.manuActions = payload;
        }),
        clearMenuActions: create.reducer((state) => {
            state.manuActions = [];
        }),
    }),
    selectors: {
        selectMenuActions: ({ manuActions }): IAction[] => manuActions,
    },
});

export const { setMenuActions, clearMenuActions } = commonSlice.actions;

export const { selectMenuActions } = commonSlice.selectors;
