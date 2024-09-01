import {
    asyncThunkCreator,
    buildCreateSlice,
    type CreateSliceOptions,
    type SliceCaseReducers,
    type SliceSelectors,
} from '@reduxjs/toolkit';

export function createAppSlice<
    State,
    CaseReducers extends SliceCaseReducers<State>,
    Name extends string,
    Selectors extends SliceSelectors<State>,
    ReducerPath extends string = Name,
>(options: CreateSliceOptions<State, CaseReducers, Name, ReducerPath, Selectors>) {
    return buildCreateSlice({
        creators: { asyncThunk: asyncThunkCreator },
    })(options);
}
