import { useFrameTime } from '@frozik/components';
import { isNil } from 'lodash-es';
import { useEffect, useMemo, useRef } from 'react';

import type { ITicker } from '../../../libs/pendulum/def';

const MIN_FPS = 30;

export function useFrameTicker(
    paused: boolean,
    deltaTimeFn?: (
        deltaTime: DOMHighResTimeStamp,
        multiplier: number,
    ) => DOMHighResTimeStamp | DOMHighResTimeStamp[],
): ITicker {
    const fpsRef = useRef<number>(0);

    useEffect(() => {
        if (paused || isNil(deltaTimeFn)) {
            return;
        }

        let be = performance.now();

        let frameId = requestAnimationFrame(function loop() {
            const now = performance.now();
            fpsRef.current = Math.round(200 / (now - be)) * 5;
            be = now;
            frameId = requestAnimationFrame(loop);
        });

        return () => cancelAnimationFrame(frameId);
    }, [paused, deltaTimeFn]);

    const { frameTime, deltaTime } = useFrameTime(paused);
    const ticker = useMemo<ITicker & { update(deltaTime: DOMHighResTimeStamp): void }>(() => {
        const subscriptions = new Set<(deltaTime: DOMHighResTimeStamp) => Promise<void> | void>();

        let updateInProgress = false;
        let currentMultiplier = 1;

        return {
            subscribe(
                handler: (deltaTime: DOMHighResTimeStamp) => Promise<void> | void,
            ): VoidFunction {
                subscriptions.add(handler);

                return () => subscriptions.delete(handler);
            },
            async update(deltaTime: DOMHighResTimeStamp) {
                if (updateInProgress) {
                    return;
                }

                if (fpsRef.current < MIN_FPS) {
                    currentMultiplier = Math.max(1, currentMultiplier - 1);
                } else if (fpsRef.current >= MIN_FPS) {
                    currentMultiplier++;
                }

                const newDeltaTime = deltaTimeFn?.(deltaTime, currentMultiplier) ?? deltaTime;

                updateInProgress = true;
                await Promise.all(
                    Array.from(subscriptions.keys()).map(async (handler) => {
                        const deltaTimes = Array.isArray(newDeltaTime)
                            ? newDeltaTime
                            : [newDeltaTime];

                        for (const deltaTime of deltaTimes) {
                            await handler(deltaTime);
                        }
                    }),
                );
                updateInProgress = false;
            },
            dispose(): void {
                subscriptions.clear();
            },
        };
    }, [deltaTimeFn]);
    useEffect(() => void ticker.update(deltaTime), [frameTime, deltaTime, ticker]);

    return ticker;
}
