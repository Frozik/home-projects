import { isFunction, isUndefined } from 'lodash-es';
import type { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { concat, EMPTY, pipe, timer } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';

import { isSyncedValueDescriptor, isValueDescriptor } from '../utils';

export type TProgressiveRetryConfig<T, TError extends Error> = {
    initialInterval?: number;
    maxRetries?: number;
    maxInterval?: number;
    jitter?: number;
    backoffDelay?: (iteration: number, initialInterval: number) => number;
    needRetry?: (error: TError, attempt: number) => boolean;
    beforeRetry?: (error: TError, attempt: number) => Observable<T>;
};

export const RETRY_STRATEGY = {
    EXPONENTIAL: (iteration, initialInterval) => {
        return Math.pow(2, iteration) * initialInterval + (Math.random() * initialInterval) / 2;
    },
    LINEAR: (iteration, initialInterval) => {
        return iteration * initialInterval + (Math.random() * initialInterval) / 2;
    },
    STATIC: (_, initialInterval) => {
        return initialInterval + (Math.random() * initialInterval) / 2;
    },
} satisfies Record<string, (iteration: number, initialInterval: number) => number>;

const DEFAULT_PROGRESSIVE_RETRY_CONFIG = {
    initialInterval: 3_000,
    backoffDelay: RETRY_STRATEGY.LINEAR,
    maxInterval: 60_000,
    jitter: 500,
} as const;

export function progressiveRetry<T, TError extends Error = Error>(
    config?: Partial<TProgressiveRetryConfig<T, TError>>,
): MonoTypeOperatorFunction<T> {
    const {
        maxRetries,
        maxInterval,
        initialInterval,
        backoffDelay,
        needRetry,
        beforeRetry,
        jitter,
    } = {
        ...DEFAULT_PROGRESSIVE_RETRY_CONFIG,
        ...config,
    };
    let attempt = 0;

    return pipe(
        tap((vd) => {
            if (!isValueDescriptor(vd) || isSyncedValueDescriptor(vd)) {
                attempt = 0;
            }
        }),
        catchError((err, caught) => {
            attempt++;

            if (
                // Error stops retry
                (isFunction(needRetry) && !needRetry(err, attempt)) ||
                // If `maxRetries` is set & we're out of attempts, throw original error
                (!isUndefined(maxRetries) && attempt > maxRetries)
            ) {
                throw err;
            }

            const delayStrategy = backoffDelay ?? RETRY_STRATEGY.LINEAR;
            const currentInterval = delayStrategy(attempt, initialInterval);

            const delay =
                (isUndefined(maxInterval)
                    ? currentInterval
                    : Math.min(currentInterval, maxInterval)) +
                Math.random() * jitter;

            return concat(
                isFunction(beforeRetry) ? beforeRetry(err, attempt) : EMPTY,
                timer(delay).pipe(switchMap(() => caught)),
            );
        }),
    );
}
