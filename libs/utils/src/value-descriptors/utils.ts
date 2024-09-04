import type { Nil } from '@frozik/types';
import { isEqual, isFunction, isNil, isObject } from 'lodash-es';

import type {
    ExtractSyncedValueDescriptor,
    ExtractUnsyncedValueDescriptor,
    ExtractValueDescriptorPayload,
    TAnyValueDescriptor,
    TMetaState,
    TryConvertToValueDescriptor,
    TSyncedValueDescriptor,
    TUnsyncedValueDescriptor,
    TValueDescriptorFail,
    ValueDescriptorHandler,
    ValueDescriptorHandlers,
} from './defs';
import { EValueDescriptorPendingState, EValueDescriptorState } from './defs';
import { isEqualsFails, isFail } from './fails';

export function createSyncedValueDescriptor<P>(value: P): TSyncedValueDescriptor<P> {
    return {
        state: EValueDescriptorState.Synced,
        value,
        fail: null,
        meta: null,
    };
}

export function createUnsyncedValueDescriptor(
    fail: null | TValueDescriptorFail,
    meta?: null | TMetaState,
): TUnsyncedValueDescriptor;
export function createUnsyncedValueDescriptor<P>(
    value: P,
    fail: null | TValueDescriptorFail,
    meta?: null | TMetaState,
): TUnsyncedValueDescriptor<P>;
export function createUnsyncedValueDescriptor<P = never>(
    valueOrFail: TValueDescriptorFail | P,
    failOrMeta?: null | TValueDescriptorFail | TMetaState,
    meta?: null | TMetaState,
): TUnsyncedValueDescriptor<P> {
    let value;
    let fail;

    if (!isFail(valueOrFail)) {
        value = valueOrFail;
    } else {
        fail = valueOrFail;
    }

    if (isFail(failOrMeta)) {
        fail = failOrMeta;
    } else {
        meta = failOrMeta;
    }

    return {
        state: EValueDescriptorState.Unsynced,
        value: value ?? null,
        fail: fail ?? null,
        meta: meta ?? null,
    };
}

export function mergeMetaValueDescriptor(
    a: Nil | Partial<TMetaState>,
    b: Nil | Partial<TMetaState>,
): TMetaState {
    return {
        pendingState: a?.pendingState ?? b?.pendingState ?? null,
    };
}

export function upsertMetaValueDescriptor<T extends TAnyValueDescriptor>(
    vd: T,
    meta: Partial<TMetaState>,
): T {
    return {
        state: vd.state,
        fail: vd.fail,
        value: vd.value,
        meta: mergeMetaValueDescriptor(meta, vd.meta),
    } as T;
}

export const EMPTY_VD: TUnsyncedValueDescriptor = {
    state: EValueDescriptorState.Unsynced,
    value: null,
    fail: null,
    meta: null,
};

export const WAITING_VD: TUnsyncedValueDescriptor = {
    state: EValueDescriptorState.Unsynced,
    value: null,
    fail: null,
    meta: {
        pendingState: EValueDescriptorPendingState.WaitingArguments,
    },
};

export const REQUESTING_VD: TUnsyncedValueDescriptor = {
    state: EValueDescriptorState.Unsynced,
    value: null,
    fail: null,
    meta: {
        pendingState: EValueDescriptorPendingState.Requesting,
    },
};

export const RECEIVING_VD: TUnsyncedValueDescriptor = {
    state: EValueDescriptorState.Unsynced,
    value: null,
    fail: null,
    meta: {
        pendingState: EValueDescriptorPendingState.Receiving,
    },
};

export function matchValueDescriptor<VD extends TAnyValueDescriptor, Out1, Out2>(
    descriptor: VD,
    handlers: ValueDescriptorHandler<VD, Out1> | ValueDescriptorHandlers<VD, Out1, Out2>,
): TryConvertToValueDescriptor<Out1, Out2> {
    const synced = isFunction(handlers) ? handlers : handlers.synced;
    const unsynced = isFunction(handlers)
        ? (vd: ExtractUnsyncedValueDescriptor<VD>): Out2 => vd as Out2
        : handlers.unsynced;

    switch (descriptor.state) {
        case EValueDescriptorState.Synced:
            return synced(
                descriptor as ExtractSyncedValueDescriptor<VD>,
            ) as TryConvertToValueDescriptor<Out1, Out2>;
        case EValueDescriptorState.Unsynced:
            return unsynced(
                descriptor as ExtractUnsyncedValueDescriptor<VD>,
            ) as TryConvertToValueDescriptor<Out1, Out2>;
    }
}

export function isValueDescriptor<T extends TAnyValueDescriptor>(
    value: unknown | T,
): value is Extract<T, TAnyValueDescriptor> {
    return isObject(value) && 'state' in value && 'fail' in value && 'value' in value;
}

export function isSyncedValueDescriptor<VD extends TAnyValueDescriptor>(
    value: Nil | VD,
): value is ExtractSyncedValueDescriptor<VD> {
    return !isNil(value) && value.state === EValueDescriptorState.Synced;
}

export function isUnsyncedValueDescriptor<VD extends TAnyValueDescriptor>(
    value: Nil | VD,
): value is ExtractUnsyncedValueDescriptor<VD> {
    return !isNil(value) && value.state === EValueDescriptorState.Unsynced;
}

export function isEqualValueDescriptor<
    A extends TAnyValueDescriptor,
    B extends TAnyValueDescriptor,
>(
    a: A,
    b: B,
    isEqualPayload: (
        a: ExtractValueDescriptorPayload<A>,
        b: ExtractValueDescriptorPayload<B>,
    ) => boolean = isEqual,
) {
    if (a.state !== b.state) return false;
    if (isNil(a.fail) !== isNil(b.fail)) return false;
    if (isNil(a.value) !== isNil(b.value)) return false;
    if (!isNil(a.fail) && !isNil(b.fail) && !isEqualsFails(a.fail, b.fail)) return false;
    return !(!isNil(a.value) && !isNil(b.value) && !isEqualPayload(a.value, b.value));
}

export function isEmptyValueDescriptor(vd: Nil | TAnyValueDescriptor): boolean {
    return isUnsyncedValueDescriptor(vd) && isNil(vd.fail) && isNil(vd.meta);
}

export function isWaitingArgumentsValueDescriptor(vd: Nil | TAnyValueDescriptor): boolean {
    return vd?.meta?.pendingState === EValueDescriptorPendingState.WaitingArguments;
}

export function isRequestingValueDescriptor(vd: Nil | TAnyValueDescriptor): boolean {
    return vd?.meta?.pendingState === EValueDescriptorPendingState.Requesting;
}

export function isReceivingValueDescriptor(vd: Nil | TAnyValueDescriptor): boolean {
    return vd?.meta?.pendingState === EValueDescriptorPendingState.Receiving;
}

export function isLoadingValueDescriptor(vd: Nil | TAnyValueDescriptor): boolean {
    return isRequestingValueDescriptor(vd) || isReceivingValueDescriptor(vd);
}

export function isSyncOrEmptyValueDescriptor<VD extends TAnyValueDescriptor>(
    value: Nil | VD,
): boolean {
    return isSyncedValueDescriptor(value) || isEmptyValueDescriptor(value);
}

export function isFailValueDescriptor<T extends TAnyValueDescriptor>(
    vd: Nil | T,
): vd is T & { fail: TValueDescriptorFail } {
    return isUnsyncedValueDescriptor(vd) && !isNil(vd.fail);
}
