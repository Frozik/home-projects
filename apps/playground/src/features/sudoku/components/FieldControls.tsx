import { FormOutlined, MenuOutlined, RollbackOutlined } from '@ant-design/icons';
import { useFunction } from '@frozik/components';
import cn from 'classnames';
import { isNil } from 'lodash-es';
import { memo, useMemo, useState } from 'react';

import type { IField, TTool } from '../defs';
import { EToolType } from '../defs';
import { getIndexesArray, getPairs, getUsedNumbers } from '../utils';
import styles from './styles.module.scss';

export const FieldControls = memo(
    ({
        field,
        tool,
        cellSize,
        hasHistory,
        onRestorePreviousState,
        onChangeTool,
        onMarkField,
        onRestartGame,
    }: {
        field: IField;
        cellSize: number;
        tool: TTool;
        hasHistory: boolean;
        onRestorePreviousState: VoidFunction;
        onChangeTool: (tool: TTool) => void;
        onMarkField: VoidFunction;
        onRestartGame: VoidFunction;
    }) => {
        const [toolType, setToolType] = useState<EToolType.Pen | EToolType.Notes>(
            tool.type === EToolType.None ? EToolType.Pen : tool.type,
        );

        const handleToolValueChange = useFunction((event) =>
            onChangeTool({
                type: toolType,
                value: parseInt(event.target.dataset.value, 10),
            }),
        );

        const usedNumbersMap = useMemo<ReadonlyMap<number, number>>(
            () => getUsedNumbers(field),
            [field],
        );

        const handleToggleToolType = useFunction(() => {
            const newToolType = toolType === EToolType.Pen ? EToolType.Notes : EToolType.Pen;

            setToolType(newToolType);

            if (isNil(tool.value)) {
                onChangeTool({ type: EToolType.None, value: tool.value });
            } else {
                onChangeTool({ type: newToolType, value: tool.value });
            }
        });

        const baseStyle = {
            width: cellSize,
            height: cellSize,
            fontSize: Math.trunc(cellSize * 0.8),
        };

        const thirdCellSize = Math.trunc(cellSize / 3);

        return (
            <div className={styles.controls}>
                {getIndexesArray(field.size).map((index) => {
                    const offset = index * field.size;

                    return (
                        <div
                            key={index}
                            className={styles.fieldGroup}
                            style={{
                                gridTemplateColumns: `repeat(${field.size}, ${cellSize}px)`,
                                gridColumn: index + 1,
                                gridRow: 1,
                            }}
                        >
                            {getIndexesArray(field.size).map((index) => {
                                const toolValue = offset + index + 1;

                                return (
                                    <div
                                        key={index}
                                        className={cn(styles.controlItem, {
                                            [styles.controlItemSelected]: toolValue === tool.value,
                                        })}
                                        style={baseStyle}
                                        data-value={toolValue}
                                        data-used={usedNumbersMap.get(toolValue) ?? 0}
                                        onClick={handleToolValueChange}
                                    >
                                        {toolValue}
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}

                <div
                    className={styles.fieldGroup}
                    style={{
                        ...baseStyle,
                        gridTemplateColumns: `repeat(${field.size}, ${cellSize}px)`,
                        gridColumn: 1,
                        gridRow: 2,
                    }}
                >
                    <div
                        className={styles.controlItem}
                        style={{
                            ...baseStyle,
                            gridColumn: 1,
                        }}
                        onClick={onRestartGame}
                    >
                        <MenuOutlined />
                    </div>

                    {hasHistory && (
                        <div
                            className={styles.controlItem}
                            style={{
                                ...baseStyle,
                                gridColumn: 2,
                            }}
                            onClick={onRestorePreviousState}
                        >
                            <RollbackOutlined />
                        </div>
                    )}
                </div>

                <div
                    className={styles.fieldGroup}
                    style={{
                        ...baseStyle,
                        gridTemplateColumns: `repeat(${field.size}, ${cellSize}px)`,
                        gridColumn: 3,
                        gridRow: 2,
                    }}
                >
                    <div
                        className={cn(styles.controlItem, {
                            [styles.controlItemSelected]: !isNil(tool.value),
                        })}
                        style={{
                            width: cellSize,
                            height: cellSize,
                            fontSize: toolType === EToolType.Notes ? thirdCellSize : cellSize,
                            gridColumn: 2,
                        }}
                        onClick={handleToggleToolType}
                    >
                        <FormOutlined />
                    </div>

                    <div
                        className={cn(styles.controlItem, styles.controlItemNotes)}
                        style={{
                            fontSize: `${thirdCellSize}px`,
                            gridTemplateColumns: `repeat(${field.size}, ${thirdCellSize}px)`,
                            gridTemplateRows: `repeat(${field.size}, ${thirdCellSize}px)`,
                            gridColumn: 3,
                        }}
                    >
                        {getPairs(field.size).map(([row, column], index) => (
                            <div
                                key={index}
                                style={{
                                    gridColumn: column + 1,
                                    gridRow: row + 1,
                                }}
                                onClick={onMarkField}
                            >
                                {index + 1}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    },
);
