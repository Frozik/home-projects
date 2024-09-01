import { PauseCircleOutlined, PlayCircleOutlined } from '@ant-design/icons';
import { useFunction, useKeyboardAction, useMouseAction } from '@frozik/components';
import { Button, Slider } from 'antd';
import { isNil } from 'lodash-es';
import type { ReactNode } from 'react';
import { memo, useEffect, useRef } from 'react';
import { useResizeObserver } from 'usehooks-ts';

import { Renderer } from '../../../components/Renderer';
import styles from './PendulumPlayground.module.scss';

export const PendulumPlayground = memo(
    ({
        paused,
        gravity,
        pauseResumeKeyCode,
        onGravityChanged,
        onPausedChanged,
        onSetContexts,
        onAdditionalForce,
        children,
    }: {
        paused: boolean;
        gravity: number;
        pauseResumeKeyCode?: string;
        onGravityChanged: (gravity: number) => void;
        onPausedChanged: (paused: boolean) => void;
        onSetContexts: (contexts: {
            staticContext: CanvasRenderingContext2D;
            context: CanvasRenderingContext2D;
        }) => void;
        onAdditionalForce?: (position?: { x: number; y: number }) => void;
        children?: ReactNode;
    }) => {
        const ref = useRef<HTMLDivElement>(null);
        const { width = 0, height = 0 } = useResizeObserver({
            ref,
            box: 'border-box',
        });

        const togglePaused = useFunction(() => onPausedChanged(!paused));

        useKeyboardAction(pauseResumeKeyCode, togglePaused, ref);

        useMouseAction(
            useFunction(({ x, y, buttons }) => {
                if ((buttons & (2 ** 0)) === 0) {
                    onAdditionalForce?.();
                } else {
                    onAdditionalForce?.({ x: x - width / 2, y: y - height / 2 });
                }
            }),
            isNil(onAdditionalForce) ? undefined : ref,
        );

        useEffect(() => void onPausedChanged(paused), [paused, onPausedChanged]);

        const handleGravityChange = useFunction(({ value }) => onGravityChanged(value as number));

        return (
            <div ref={ref} className={styles.container} tabIndex={-1}>
                <Renderer
                    className={styles.containerParentFill}
                    width={width}
                    height={height}
                    onCanvasContext={onSetContexts}
                />
                {paused && (
                    <div className={styles.containerParentFill}>
                        <PlayCircleOutlined
                            className={styles.containerPaused}
                            onClick={togglePaused}
                        />
                    </div>
                )}
                <Button
                    className={styles.worldPauseAction}
                    icon={paused ? <PlayCircleOutlined /> : <PauseCircleOutlined />}
                    onClick={togglePaused}
                />
                <Slider
                    className={styles.worldGravity}
                    value={gravity}
                    vertical
                    onChange={handleGravityChange}
                    min={0.1}
                    step={0.1}
                    max={2}
                />
                {children}
            </div>
        );
    },
);
