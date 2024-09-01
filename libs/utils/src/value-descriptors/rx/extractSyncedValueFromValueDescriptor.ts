import type { OperatorFunction } from 'rxjs';
import { EMPTY, of } from 'rxjs';

import type { ExtractSyncedValueDescriptorPayload, TAnyValueDescriptor } from '../defs';
import { mergeMapValueDescriptor } from './mergeMapValueDescriptor';

export function extractSyncedValueFromValueDescriptor<
    VD extends TAnyValueDescriptor,
    P extends ExtractSyncedValueDescriptorPayload<VD>,
>(): OperatorFunction<VD, P> {
    return mergeMapValueDescriptor<VD, P, never>({
        synced: ({ value }) => of(value),
        unsynced: () => EMPTY,
    });
}
