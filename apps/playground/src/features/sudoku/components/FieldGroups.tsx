import type { CSSProperties } from 'react';
import { memo } from 'react';

import type { IField, TTool } from '../defs';
import { getPairs } from '../utils';
import { FieldCell } from './FieldCell';
import styles from './styles.module.scss';

export const FieldGroups = memo(
    ({
        field,
        groupGridStyle,
        cellSize,
        selectedCell,
        tool,
        onOverCell,
        onClickCell,
    }: {
        field: IField;
        groupGridStyle: CSSProperties;
        cellSize: number;
        selectedCell: { row: number; column: number } | undefined;
        tool: TTool;
        onOverCell: (row: number, column: number) => void;
        onClickCell: (row: number, column: number) => void;
    }) =>
        getPairs(field.size).map(([groupRow, groupColumn]) => (
            <div
                key={`${groupRow}:${groupColumn}`}
                className={styles.fieldGroup}
                style={{
                    ...groupGridStyle,
                    gridColumn: groupColumn + 1,
                    gridRow: groupRow + 1,
                }}
            >
                {getPairs(field.size).map(([cellRow, cellColumn]) => (
                    <FieldCell
                        key={`${cellRow}:${cellColumn}`}
                        field={field}
                        groupRow={groupRow}
                        groupColumn={groupColumn}
                        cellRow={cellRow}
                        cellColumn={cellColumn}
                        cellSize={cellSize}
                        selectedCell={selectedCell}
                        tool={tool}
                        onOverCell={onOverCell}
                        onClickCell={onClickCell}
                    />
                ))}
            </div>
        )),
);
