import type { Observable, OperatorFunction } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import type {
    ExtractSyncedValueDescriptor,
    ExtractUnsyncedValueDescriptor,
    TAnyValueDescriptor,
    TryConvertToValueDescriptor,
    ValueDescriptorHandler,
    ValueDescriptorHandlers,
} from '../defs';
import { matchValueDescriptor } from '../utils';
import { extractHandlers } from './utils';

export function switchMapValueDescriptor<
    VD extends TAnyValueDescriptor,
    Out1 = ExtractSyncedValueDescriptor<VD>,
    Out2 = ExtractUnsyncedValueDescriptor<VD>,
>(
    handlers:
        | ValueDescriptorHandler<VD, Observable<Out1>>
        | ValueDescriptorHandlers<VD, Observable<Out1>, Observable<Out2>>,
): OperatorFunction<VD, TryConvertToValueDescriptor<Out1, Out2>> {
    const { synced, unsynced } = extractHandlers(handlers);

    return switchMap((d) => {
        return matchValueDescriptor(d, { synced, unsynced }) as Observable<
            TryConvertToValueDescriptor<Out1, Out2>
        >;
    });
}
