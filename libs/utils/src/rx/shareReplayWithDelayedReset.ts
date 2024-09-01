import type { Milliseconds } from '@frozik/types';
import type { MonoTypeOperatorFunction } from 'rxjs';
import { ReplaySubject, share, timer } from 'rxjs';

export function shareReplayWithDelayedReset<T>(
    delay: Milliseconds,
    replay = 1,
): MonoTypeOperatorFunction<T> {
    return share<T>({
        connector: () => new ReplaySubject(replay),
        resetOnError: true,
        resetOnComplete: false,
        resetOnRefCountZero: () => timer(delay),
    });
}
