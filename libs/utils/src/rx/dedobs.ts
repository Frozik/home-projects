import type { Milliseconds } from '@frozik/types';
import hash_sum from 'hash-sum';
import type { Observable } from 'rxjs';
import { identity } from 'rxjs';
import { tap } from 'rxjs/operators';

import { debounceBy } from './debounceBy';
import { shareReplayWithDelayedReset } from './shareReplayWithDelayedReset';
import { shareReplayWithImmediateReset } from './shareReplayWithImmediateReset';

type TKey = boolean | number | string;

export const DEDOBS_SKIP_KEY = Symbol('SKIP_KEY');

const DEFAULT_NORMALIZER = <T extends unknown[]>(...args: T): TKey => hash_sum(args);

const DEFAULT_REMOVE_UNSUBSCRIBED_DELAY = 5_000;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function dedobs<Fn extends (...args: any[]) => Observable<unknown>>(
    fn: Fn,
    options: {
        normalize?: (args: Parameters<Fn>) => typeof DEDOBS_SKIP_KEY | TKey;
        /**
         * Delay on reset internal cache in shareReplay
         */
        resetDelay?: number;
        replayCount?: number;
        /**
         * Delay on remove from bank after ref count equal zero
         */
        removeDelay?: number;
        removeUnsubscribedDelay?: number;
    } = {},
) {
    const normalize = options.normalize ?? DEFAULT_NORMALIZER;
    const getObsCache = getObsCacheFactory<ReturnType<Fn>>(
        options.replayCount ?? 1,
        options.resetDelay,
        options.removeDelay,
        options.removeUnsubscribedDelay ?? DEFAULT_REMOVE_UNSUBSCRIBED_DELAY,
    );

    return (...args: Parameters<Fn>): ReturnType<Fn> => {
        const key = normalize(args);
        return key === DEDOBS_SKIP_KEY
            ? (fn(...args) as ReturnType<Fn>)
            : getObsCache(key, () => fn(...args) as ReturnType<Fn>);
    };
}

function getObsCacheFactory<Obs extends Observable<unknown>>(
    replayCount: number,
    resetDelay: undefined | number,
    removeDelay: undefined | number,
    removeUnsubscribedDelay: number,
) {
    const mapKeyToCache = new Map<TKey, { refCount: number; obs: Obs }>();

    const removeIfDerelict = (key: TKey) => {
        const cache = mapKeyToCache.get(key);
        if (cache !== undefined && cache.refCount === 0) {
            mapKeyToCache.delete(key);
        }
    };
    const removeCache =
        removeDelay === undefined || removeDelay === 0 || !isFinite(removeDelay)
            ? removeIfDerelict
            : debounceBy(removeIfDerelict, ([key]) => ({
                  group: key,
                  delay: removeDelay,
              }));
    const onSubscribe = (key: TKey, cb: VoidFunction) => {
        const cache = mapKeyToCache.get(key);
        if (cache !== undefined) {
            cache.refCount++;
            cb();
        }
    };
    const onFinalize = (key: TKey) => {
        const cache = mapKeyToCache.get(key);
        if (cache !== undefined) {
            cache.refCount--;
            cache.refCount === 0 && removeCache(key);
        }
    };
    const createCache = (key: TKey, obs: Obs) => {
        const timeoutId = setTimeout(() => removeIfDerelict(key), removeUnsubscribedDelay);

        return {
            refCount: 0,
            obs: obs.pipe(
                resetDelay === undefined
                    ? identity
                    : resetDelay === 0
                      ? shareReplayWithImmediateReset(replayCount)
                      : shareReplayWithDelayedReset(resetDelay as Milliseconds, replayCount),
                tap({
                    subscribe: onSubscribe.bind(null, key, () => clearTimeout(timeoutId)),
                    finalize: onFinalize.bind(null, key),
                }),
            ) as Obs,
        };
    };

    return (key: TKey, getObs: () => Obs) => {
        if (!mapKeyToCache.has(key)) {
            mapKeyToCache.set(key, createCache(key, getObs()));
        }

        const value = mapKeyToCache.get(key)!;

        return value.obs;
    };
}
