import type { MonoTypeOperatorFunction } from 'rxjs';
import { of } from 'rxjs';

import type { TAnyValueDescriptor } from '../defs';
import { convertErrorToFail } from '../fails';
import type { ValueDescriptorError } from '../fails/error';
import { createUnsyncedValueDescriptor } from '../utils';
import type { TProgressiveRetryConfig } from './progressiveRetry';
import { progressiveRetry } from './progressiveRetry';

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
