import type { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { concat, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { convertErrorToFail } from '../fails';
import { createUnsyncedValueDescriptor } from '../utils';

export function extractValueDescriptorFromError<T>(): MonoTypeOperatorFunction<T> {
    return catchError<T, Observable<T>>((err: Error) => {
        return concat(
            of(createUnsyncedValueDescriptor(convertErrorToFail(err)) as unknown as T),
            throwError(() => err),
        );
    });
}
