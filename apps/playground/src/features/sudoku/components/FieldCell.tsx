import { useFunction } from '@frozik/components';
import cn from 'classnames';
import { isEmpty, isNil } from 'lodash-es';
import { memo } from 'react';

import type { IField, TTool } from '../defs';
import { ECellStatus, EFieldType } from '../defs';
import { getPairs } from '../utils';
import styles from './styles.module.scss';

export const FieldCell = memo(
    ({
        field,
        groupRow,
        groupColumn,
        cellRow,
        cellColumn,
        cellSize,
        selectedCell,
        tool,
        onOverCell,
        onClickCell,
    }: {
        field: IField;
        groupRow: number;
        groupColumn: number;
        cellRow: number;
        cellColumn: number;
        cellSize: number;
        selectedCell: { row: number; column: number } | undefined;
        tool: TTool;
        onOverCell: (row: number, column: number) => void;
        onClickCell: (row: number, column: number) => void;
    }) => {
        const globalRow = groupRow * field.size + cellRow;
        const globalColumn = groupColumn * field.size + cellColumn;

        const cellIndex = globalRow * field.size ** 2 + globalColumn;

        const cell = field.cells[cellIndex];

        const { type, value, notes, status } = cell;

        const hasValue = !isNil(value);
        const hasNotes = !isEmpty(notes);

        const noteSize = Math.floor(cellSize / field.size);

        const noteGridStyle =
            !hasValue && hasNotes
                ? {
                      gridTemplateColumns: `repeat(${field.size}, ${noteSize}px)`,
                      gridTemplateRows: `repeat(${field.size}, ${noteSize}px)`,
                  }
                : undefined;

        const handleMouseOver = useFunction(() => onOverCell(globalRow, globalColumn));
        const handleClick = useFunction(() => onClickCell(globalRow, globalColumn));

        return (
            <div
                className={cn(styles.cell, {
                    [styles.cellFixed]: type === EFieldType.Fixed,
                    [styles.cellWrong]: status === ECellStatus.Wrong,
                    [styles.cellHighlight]: hasValue && value === tool.value,
                    [styles.cellValue]: hasValue,
                    [styles.cellNotes]: !hasValue && hasNotes,
                    [styles.cellHovered]:
                        selectedCell?.row === globalRow || selectedCell?.column === globalColumn,
                })}
                style={{
                    fontSize: `${hasValue || !hasNotes ? cellSize : noteSize}px`,
                    gridColumn: cellColumn + 1,
                    gridRow: cellRow + 1,
                    ...noteGridStyle,
                }}
                onMouseOver={handleMouseOver}
                onClick={handleClick}
            >
                {isNil(cell.value)
                    ? getPairs(field.size).map(([row, column], index) => (
                          <div
                              key={index}
                              style={{
                                  gridColumn: column + 1,
                                  gridRow: row + 1,
                              }}
                          >
                              {notes.includes(index + 1) ? index + 1 : undefined}
                          </div>
                      ))
                    : value}
            </div>
        );
    },
);
