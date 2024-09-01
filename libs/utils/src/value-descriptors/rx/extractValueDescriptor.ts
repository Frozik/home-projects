import type { OperatorFunction } from 'rxjs';
import { pipe } from 'rxjs';

import type { ExtractSyncedValueDescriptorPayload, TAnyValueDescriptor } from '../defs';
import { extractSyncedValueFromValueDescriptor } from './extractSyncedValueFromValueDescriptor';
import { failToError } from './failToError';

export function extractValueDescriptor<
    VD extends TAnyValueDescriptor,
    P extends ExtractSyncedValueDescriptorPayload<VD>,
>(): OperatorFunction<VD, P> {
    return pipe(failToError<VD>(), extractSyncedValueFromValueDescriptor<VD, P>());
}
