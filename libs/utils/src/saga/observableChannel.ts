import type { EventChannel } from 'redux-saga';
import { buffers, END, eventChannel } from 'redux-saga';
import type { Observable } from 'rxjs';

export function observableChannel<T extends object>(observable$: Observable<T>): EventChannel<T> {
    return eventChannel<T>((emitter) => {
        const subscription = observable$.subscribe({
            next: (value: T) => emitter(value),
            error: () => emitter(END),
            complete: () => emitter(END),
        });

        return () => subscription.unsubscribe();
    }, buffers.sliding(1));
}
