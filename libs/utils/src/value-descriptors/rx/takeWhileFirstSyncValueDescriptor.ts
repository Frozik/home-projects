import type { MonoTypeOperatorFunction, Observable, Subscriber } from 'rxjs';
import { createOperatorSubscriber } from 'rxjs/internal/operators/OperatorSubscriber';
import { operate } from 'rxjs/internal/util/lift';

import type { TAnyValueDescriptor } from '../defs';
import { isSyncedValueDescriptor } from '../utils';

export function takeWhileFirstSyncValueDescriptor<
    T extends TAnyValueDescriptor,
>(): MonoTypeOperatorFunction<T> {
    return operate((source: Observable<T>, subscriber: Subscriber<T>) => {
        let completed = false;
        source.subscribe(
            createOperatorSubscriber(subscriber, (value: T) => {
                const result = !isSyncedValueDescriptor(value);
                // It's extremely important to set `completed` flag *before* calling subscriber.next().
                // Otherwise, `next()` may create a sync call stack,
                // and we end up here on the next observable cycle never calling `subscriber.complete()`.
                if (!completed) {
                    if (!result) {
                        completed = true;
                    }
                    subscriber.next(value);
                }
                if (completed && !subscriber.closed) {
                    subscriber.complete();
                }
            }),
        );
    });
}
