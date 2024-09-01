import type { EventChannel } from 'redux-saga';
import { buffers, END, eventChannel } from 'redux-saga';
import type { Observable } from 'rxjs';

import {
    convertErrorToFail,
    createSyncedValueDescriptor,
    createUnsyncedValueDescriptor,
    EMPTY_VD,
    isValueDescriptor,
    REQUESTING_VD,
} from '../value-descriptors';
import type { TWrappedValueDescriptor } from './defs';

export function observableValueDescriptorChannel<T>(
    observable$: Observable<T>,
): EventChannel<TWrappedValueDescriptor<T>> {
    return eventChannel<TWrappedValueDescriptor<T>>((emitter) => {
        let wasEmitted = false;

        emitter(REQUESTING_VD as TWrappedValueDescriptor<T>);

        const subscription = observable$.subscribe({
            next: (value: T) => {
                emitter(
                    (isValueDescriptor(value)
                        ? value
                        : createSyncedValueDescriptor(value)) as TWrappedValueDescriptor<T>,
                );
                wasEmitted = true;
            },
            error: (error) =>
                emitter(
                    createUnsyncedValueDescriptor(
                        convertErrorToFail(error),
                    ) as TWrappedValueDescriptor<T>,
                ),
            complete: () => {
                if (!wasEmitted) {
                    emitter(EMPTY_VD as TWrappedValueDescriptor<T>);
                }
                emitter(END);
            },
        });

        return () => {
            subscription.unsubscribe();
        };
    }, buffers.sliding(1));
}
