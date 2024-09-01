import { useFunction } from '@frozik/components';
import { matchValueDescriptor } from '@frozik/utils';
import type { RadioChangeEvent } from 'antd';
import { Radio } from 'antd';
import { isNil } from 'lodash-es';
import { memo, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getSudoku } from 'sudoku-gen';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { SudokuField } from './components/SudokuField';
import type { TTool } from './defs';
import styles from './Sudoku.module.scss';
import {
    applyTool,
    loadPuzzle,
    markField,
    resetPuzzle,
    restorePreviousState,
    selectField,
    selectHasHistory,
    selectTool,
    setTool,
} from './sudokuSlice';

export const Sudoku = memo(() => {
    const dispatch = useAppDispatch();
    const field = useAppSelector(selectField);
    const tool = useAppSelector(selectTool);
    const hasHistory = useAppSelector(selectHasHistory);
    const navigate = useNavigate();

    const { puzzle } = useParams<{ puzzle: string | undefined }>();

    useEffect(
        () => void dispatch(isNil(puzzle) ? resetPuzzle() : loadPuzzle(puzzle)),
        [puzzle, dispatch],
    );

    const handleClickCell = useFunction((row: number, column: number) =>
        dispatch(applyTool({ row, column })),
    );

    const handleToolSelect = useFunction((tool: TTool) => dispatch(setTool(tool)));

    const handleMarkField = useFunction(() => dispatch(markField()));

    const handleSelectPuzzleDifficulty = useFunction(({ target: { value } }: RadioChangeEvent) => {
        const puzzle = getSudoku(value as 'easy' | 'medium' | 'hard' | 'expert').puzzle.replace(
            /-/g,
            '0',
        );

        navigate(`/sudoku/${puzzle}`);
    });

    const handleRestartGame = useFunction(() => navigate(`/sudoku`));

    const handleRestorePreviousState = useFunction(() => dispatch(restorePreviousState()));

    return (
        <div className={styles.container}>
            {matchValueDescriptor(field, {
                synced: ({ value: field }) => (
                    <SudokuField
                        field={field}
                        tool={tool}
                        hasHistory={hasHistory}
                        onRestorePreviousState={handleRestorePreviousState}
                        onClickCell={handleClickCell}
                        onChangeTool={handleToolSelect}
                        onMarkField={handleMarkField}
                        onRestartGame={handleRestartGame}
                    />
                ),
                unsynced: () => (
                    <Radio.Group value="large" onChange={handleSelectPuzzleDifficulty}>
                        <Radio.Button value="easy">Easy</Radio.Button>
                        <Radio.Button value="medium">Medium</Radio.Button>
                        <Radio.Button value="hard">Hard</Radio.Button>
                        <Radio.Button value="expert">Expert</Radio.Button>
                    </Radio.Group>
                ),
            })}
        </div>
    );
});
