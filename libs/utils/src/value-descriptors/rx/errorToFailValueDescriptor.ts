import type { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import type { TValueDescriptorFail } from '../defs';
import { convertErrorToFail } from '../fails';
import type { ValueDescriptorError } from '../fails/error';
import { createUnsyncedValueDescriptor } from '../utils';

export function errorToFailValueDescriptor<T>(
    errorBuilder: (
        error: Error | ValueDescriptorError,
    ) => TValueDescriptorFail = convertErrorToFail,
): MonoTypeOperatorFunction<T> {
    return catchError<T, Observable<T>>((err: Error) =>
        of(createUnsyncedValueDescriptor(errorBuilder(err)) as unknown as T),
    );
}
