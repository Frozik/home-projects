import type { TValueDescriptor } from '@frozik/utils';
import { createSyncedValueDescriptor, EMPTY_VD, isSyncedValueDescriptor } from '@frozik/utils';
import type { PayloadAction } from '@reduxjs/toolkit';
import { cloneDeep, isNil } from 'lodash-es';

import { createAppSlice } from '../../app/createAppSlice';
import type { IField, TTool } from './defs';
import { EToolType } from './defs';
import {
    addFieldMarks,
    applyToolToFieldReducer,
    cleanPuzzle,
    hasMarks,
    loadField,
    removeFieldMarks,
} from './utils';

export interface ISudokuSliceState {
    field: TValueDescriptor<IField>;
    tool: TTool;
    history: IField[];
}

const INITIAL_STATE: ISudokuSliceState = {
    field: EMPTY_VD,
    tool: { type: EToolType.None, value: undefined },
    history: [],
};

export const sudokuSlice = createAppSlice({
    name: 'sudoku',
    initialState: INITIAL_STATE,
    reducers: (create) => ({
        resetPuzzle: create.reducer((state) => {
            state.field = EMPTY_VD;
            state.history = [];
        }),
        restartPuzzle: create.reducer((state) => {
            if (!isSyncedValueDescriptor(state.field)) {
                return;
            }

            state.field = createSyncedValueDescriptor(cleanPuzzle(state.field.value));
            state.history = [];
        }),
        loadPuzzle: create.reducer((state, { payload }: PayloadAction<string>) => {
            state.field = loadField(payload);
            state.history = [];
        }),
        setTool: create.reducer((state, { payload }: PayloadAction<TTool>) => {
            if (
                !isNil(state.tool.value) &&
                state.tool.value === payload.value &&
                state.tool.type === payload.type
            ) {
                state.tool = { type: EToolType.None, value: undefined };
                return;
            }

            state.tool = payload;
        }),
        applyTool: create.reducer(
            (
                state,
                { payload: { row, column } }: PayloadAction<{ row: number; column: number }>,
            ) => {
                if (
                    !isSyncedValueDescriptor(state.field) ||
                    state.field.value.size === 0 ||
                    state.tool.type === EToolType.None
                ) {
                    return;
                }

                const oldField = state.field.value;
                const newField = applyToolToFieldReducer(
                    state.field.value,
                    state.tool,
                    row,
                    column,
                );

                if (oldField !== newField) {
                    state.history = [...state.history, cloneDeep(state.field.value)];
                }

                state.field = createSyncedValueDescriptor(newField);
            },
        ),
        markField: create.reducer((state) => {
            if (!isSyncedValueDescriptor(state.field) || state.field.value.size === 0) {
                return;
            }

            state.history = [...state.history, cloneDeep(state.field.value)];

            if (hasMarks(state.field.value)) {
                state.field = createSyncedValueDescriptor(removeFieldMarks(state.field.value));
            } else {
                state.field = createSyncedValueDescriptor(addFieldMarks(state.field.value));
            }
        }),
        restorePreviousState: create.reducer((state) => {
            const previousState = state.history.pop();

            if (isNil(previousState)) {
                return;
            }

            state.field = createSyncedValueDescriptor(previousState);
        }),
    }),
    selectors: {
        selectField: ({ field }): TValueDescriptor<IField> => field,
        selectTool: ({ tool }): TTool => tool,
        selectHasHistory: ({ history }): boolean => history.length > 0,
    },
});

export const {
    resetPuzzle,
    restartPuzzle,
    loadPuzzle,
    setTool,
    applyTool,
    markField,
    restorePreviousState,
} = sudokuSlice.actions;

export const { selectField, selectTool, selectHasHistory } = sudokuSlice.selectors;
