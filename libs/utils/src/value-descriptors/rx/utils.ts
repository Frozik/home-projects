import { isFunction, isNil } from 'lodash-es';
import type { Observable } from 'rxjs';
import { of } from 'rxjs';

import { assert } from '../../assert/assert';
import type {
    ExtractSyncedValueDescriptor,
    ExtractSyncedValueDescriptorPayload,
    ExtractUnsyncedValueDescriptor,
    ExtractUnsyncedValueDescriptorPayload,
    TAnyValueDescriptor,
    TUnsyncedValueDescriptor,
    TValueDescriptor,
    ValueDescriptorHandler,
    ValueDescriptorHandlers,
} from '../defs';
import { findWorstFailIndex } from '../fails';
import {
    createSyncedValueDescriptor,
    isEmptyValueDescriptor,
    isFailValueDescriptor,
    isLoadingValueDescriptor,
    isSyncedValueDescriptor,
    isUnsyncedValueDescriptor,
    isWaitingArgumentsValueDescriptor,
} from '../utils';

export function extractHandlers<
    VD extends TAnyValueDescriptor,
    Out1 = ExtractSyncedValueDescriptor<VD>,
    Out2 = ExtractUnsyncedValueDescriptor<VD>,
>(
    handlers:
        | ValueDescriptorHandler<VD, Observable<Out1>>
        | ValueDescriptorHandlers<VD, Observable<Out1>, Observable<Out2>>,
): {
    synced: (desc: ExtractSyncedValueDescriptor<VD>) => Observable<Out1>;
    unsynced: (desc: ExtractUnsyncedValueDescriptor<VD>) => Observable<Out2>;
} {
    const synced = isFunction(handlers) ? handlers : handlers.synced;
    const unsynced = isFunction(handlers)
        ? (desc: ExtractUnsyncedValueDescriptor<VD>) => of(desc) as Observable<Out2>
        : handlers.unsynced;

    return { synced, unsynced };
}

export function squashList<T extends TAnyValueDescriptor>(
    arr: T[],
): TValueDescriptor<ExtractSyncedValueDescriptorPayload<T>[]> {
    if (arr.every(isSyncedValueDescriptor)) {
        return createSyncedValueDescriptor(arr.map((vd) => vd.value));
    }

    return findWorstUnsyncedValueDescriptor(arr) as TValueDescriptor<
        ExtractSyncedValueDescriptorPayload<T>[]
    >;
}

export function findWorstUnsyncedValueDescriptor<T extends TAnyValueDescriptor>(
    arr: T[],
): undefined | TUnsyncedValueDescriptor<ExtractUnsyncedValueDescriptorPayload<T>> {
    const unsynced = arr.filter(isUnsyncedValueDescriptor);

    if (arr.length === 0) {
        return undefined;
    }

    const withFail = unsynced.filter(isFailValueDescriptor);

    if (withFail.length > 0) {
        const index = findWorstFailIndex(withFail.map((vd) => vd.fail));
        return withFail[index];
    }

    const result =
        unsynced.find(isLoadingValueDescriptor) ??
        unsynced.find(isWaitingArgumentsValueDescriptor) ??
        unsynced.find(isEmptyValueDescriptor);

    assert(!isNil(result), 'Value Descriptors should have loading or empty state');

    return result;
}
