import type { MonoTypeOperatorFunction } from 'rxjs';
import { of } from 'rxjs';

import { progressiveRetry } from '../../rx';
import type { TProgressiveRetryConfig } from '../../rx/progressiveRetry';
import type { TAnyValueDescriptor } from '../defs';
import { convertErrorToFail } from '../fails';
import type { ValueDescriptorError } from '../fails/error';
import { createUnsyncedValueDescriptor } from '../utils';

export function progressiveRetryValueDescriptor<
    T extends TAnyValueDescriptor,
    TError extends Error = ValueDescriptorError,
>(config?: Partial<TProgressiveRetryConfig<T, TError>>): MonoTypeOperatorFunction<T> {
    return progressiveRetry<T, TError>({
        beforeRetry: (err) =>
            of(createUnsyncedValueDescriptor(convertErrorToFail(err)) as unknown as T),
        ...config,
    });
}
