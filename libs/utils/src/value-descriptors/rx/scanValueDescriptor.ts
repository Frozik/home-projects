import { isFunction } from 'lodash-es';
import type { OperatorFunction } from 'rxjs';
import { scan } from 'rxjs/operators';

import { assert } from '../../assert/assert';
import type {
    ExtractSyncedValueDescriptor,
    ExtractUnsyncedValueDescriptor,
    TAnyValueDescriptor,
} from '../defs';
import { isSyncedValueDescriptor, isUnsyncedValueDescriptor } from '../utils';

export function scanValueDescriptor<VD extends TAnyValueDescriptor, Acc>(
    handlers:
        | ((acc: undefined | Acc, vd: ExtractSyncedValueDescriptor<VD>) => Acc)
        | {
              synced: (acc: undefined | Acc, vd: ExtractSyncedValueDescriptor<VD>) => Acc;
              unsynced: (acc: undefined | Acc, vd: ExtractUnsyncedValueDescriptor<VD>) => Acc;
          },
): OperatorFunction<VD, Acc> {
    const synced = isFunction(handlers) ? handlers : handlers.synced;
    const unsynced = isFunction(handlers)
        ? (_: unknown, vd: VD) => vd as unknown as Acc
        : handlers.unsynced;

    return scan<VD, Acc, undefined>((acc, vd): Acc => {
        const isSynced = isSyncedValueDescriptor(vd);
        const isUnsynced = isUnsyncedValueDescriptor(vd);

        assert(isSynced || isUnsynced, 'ValueDescriptor must be synced or unsynced');

        return isSynced ? synced(acc, vd) : unsynced(acc, vd);
    }, undefined);
}
