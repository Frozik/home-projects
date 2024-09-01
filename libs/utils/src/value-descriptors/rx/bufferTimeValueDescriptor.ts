import type { OperatorFunction } from 'rxjs';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

import { assertNever } from '../../assert/assertNever';
import { conditionalBufferTime } from '../../rx';
import { EBufferEmitType } from '../../rx/conditionalBufferTime';
import type {
    ExtractSyncedValueDescriptorPayload,
    ExtractUnsyncedValueDescriptorPayload,
    TAnyValueDescriptor,
    TSyncedValueDescriptor,
    TUnsyncedValueDescriptor,
} from '../defs';
import {
    createSyncedValueDescriptor,
    isSyncedValueDescriptor,
    isUnsyncedValueDescriptor,
} from '../utils';

export function bufferTimeValueDescriptor<T extends TAnyValueDescriptor>(
    bufferTimeSpan: number,
): OperatorFunction<
    T,
    | TUnsyncedValueDescriptor<ExtractUnsyncedValueDescriptorPayload<T>>
    | TSyncedValueDescriptor<ExtractSyncedValueDescriptorPayload<T>[]>
> {
    return pipe(
        conditionalBufferTime<T>({
            bufferTimeSpan,
            condition(desc) {
                return isSyncedValueDescriptor(desc)
                    ? EBufferEmitType.Buffer
                    : EBufferEmitType.PassThrough;
            },
        }) as OperatorFunction<
            T,
            | TUnsyncedValueDescriptor<ExtractUnsyncedValueDescriptorPayload<T>>
            | TSyncedValueDescriptor<ExtractSyncedValueDescriptorPayload<T>>[]
        >,
        map((descs) => {
            if (Array.isArray(descs)) {
                return createSyncedValueDescriptor(
                    descs.map(
                        ({
                            value,
                        }: TSyncedValueDescriptor<ExtractSyncedValueDescriptorPayload<T>>) => value,
                    ),
                );
            }

            if (isUnsyncedValueDescriptor(descs)) {
                return descs;
            }

            assertNever(descs);
        }),
    );
}
