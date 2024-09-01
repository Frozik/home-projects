import type { EventChannel, SagaIterator } from 'redux-saga';
import type { CallEffect } from 'redux-saga/effects';
import { call, cancelled, take } from 'redux-saga/effects';
import type { Observable } from 'rxjs';

import type { TWrappedValueDescriptor } from './defs';
import { observableValueDescriptorChannel } from './observableValueDescriptorChannel';

export function iterateObservable<T>(
    observable$: Observable<T>,
    saga: (value: TWrappedValueDescriptor<T>) => SagaIterator<void | boolean> | void | boolean,
): CallEffect {
    return call(function* () {
        const channel: EventChannel<TWrappedValueDescriptor<T>> = yield call(
            observableValueDescriptorChannel,
            observable$,
        );

        try {
            while (true) {
                const value: TWrappedValueDescriptor<T> = yield take(channel);

                const result: void | boolean = yield call(saga, value);

                if (result === false) {
                    channel.close();
                    break;
                }
            }
        } finally {
            if (yield cancelled()) {
                channel.close();
            }
        }
    });
}
