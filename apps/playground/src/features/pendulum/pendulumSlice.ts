import type { ISO } from '@frozik/types';
import type { TValueDescriptor } from '@frozik/utils';
import { createSyncedValueDescriptor, isSyncedValueDescriptor, WAITING_VD } from '@frozik/utils';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createAction } from '@reduxjs/toolkit';
import type { SerializedDockview } from 'dockview';

import { createAppSlice } from '../../app/createAppSlice';
import type { IGeneration } from './defs';

export interface IPendulumSliceState {
    layout: TValueDescriptor<SerializedDockview>;

    playgroundGravity: number;
    gravity: number;

    competitionsList: TValueDescriptor<ISO[]>;

    currentCompetition: TValueDescriptor<{ competitionStart: ISO; generations: IGeneration[] }>;
}

const INITIAL_STATE: IPendulumSliceState = {
    layout: WAITING_VD,

    playgroundGravity: 1,
    gravity: 1,

    competitionsList: WAITING_VD,

    currentCompetition: WAITING_VD,
};

export const pendulumSlice = createAppSlice({
    name: 'pendulum',
    initialState: INITIAL_STATE,
    reducers: (create) => ({
        setLayout: create.reducer(
            (state, { payload }: PayloadAction<TValueDescriptor<SerializedDockview>>) => {
                state.layout = payload;
            },
        ),
        setPlaygroundGravity: create.reducer((state, { payload }: PayloadAction<number>) => {
            state.playgroundGravity = payload;
        }),
        setGravity: create.reducer((state, { payload }: PayloadAction<number>) => {
            state.gravity = payload;
        }),
        setCompetitionsList: create.reducer(
            (state, { payload }: PayloadAction<TValueDescriptor<ISO[]>>) => {
                state.competitionsList = payload;
            },
        ),
        setCurrentCompetition: create.reducer(
            (
                state,
                {
                    payload,
                }: PayloadAction<
                    TValueDescriptor<{ competitionStart: ISO; generations: IGeneration[] }>
                >,
            ) => {
                state.currentCompetition = payload;
            },
        ),
        addCompetitionRun: create.reducer(
            (
                state,
                {
                    payload: { generation },
                }: PayloadAction<{ competitionStart: ISO; generation: IGeneration }>,
            ) => {
                if (isSyncedValueDescriptor(state.currentCompetition)) {
                    state.currentCompetition = createSyncedValueDescriptor({
                        ...state.currentCompetition.value,
                        generations: [...state.currentCompetition.value.generations, generation],
                    });
                }
            },
        ),
    }),
    selectors: {
        selectLayout: ({ layout }): TValueDescriptor<SerializedDockview> => layout,
        selectPlaygroundGravity: ({ playgroundGravity }): number => playgroundGravity,
        selectGravity: ({ gravity }): number => gravity,
        selectCompetitionsList: ({ competitionsList }): TValueDescriptor<ISO[]> => competitionsList,
        selectCurrentCompetition: ({
            currentCompetition,
        }): TValueDescriptor<{ competitionStart: ISO; generations: IGeneration[] }> =>
            currentCompetition,
    },
});

export const {
    setLayout,
    setPlaygroundGravity,
    setGravity,
    setCompetitionsList,
    setCurrentCompetition,
    addCompetitionRun,
} = pendulumSlice.actions;

export const updateLayout = createAction<SerializedDockview>(`${pendulumSlice.name}/updateLayout`);

export const loadCompetition = createAction<ISO>(`${pendulumSlice.name}/loadCompetition`);

export const openTab = createAction<string>(`${pendulumSlice.name}/openTab`);

export const {
    selectLayout,
    selectPlaygroundGravity,
    selectGravity,
    selectCompetitionsList,
    selectCurrentCompetition,
} = pendulumSlice.selectors;
