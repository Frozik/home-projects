import type { EValueDescriptorErrorCode } from './codes';
import type { TFail } from './fails';

export type TValueDescriptor<SyncPayload, UnsyncPayload = never> =
    | TSyncedValueDescriptor<SyncPayload>
    | TUnsyncedValueDescriptor<UnsyncPayload>;

export enum EValueDescriptorState {
    Synced = 'Synced',
    Unsynced = 'Unsynced',
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TAnyValueDescriptor = TValueDescriptor<any, any>;

export type TSyncedValueDescriptor<P> = {
    state: EValueDescriptorState.Synced;
    value: P;
    fail: null;
    meta: null;
};
export type TUnsyncedValueDescriptor<P = never> = {
    state: EValueDescriptorState.Unsynced;
    value: null | P;
    fail: null | TValueDescriptorFail;
    meta: null | TMetaState;
};

export enum EValueDescriptorPendingState {
    WaitingArguments = 'WaitingArguments',
    Requesting = 'Requesting',
    Receiving = 'Receiving',
}

export type TMetaState = {
    pendingState: null | EValueDescriptorPendingState;
};

export type ExtractValueDescriptorPayload<T> =
    T extends TValueDescriptor<infer A, infer B> ? A | B : never;

export type ExtractSyncedValueDescriptorPayload<T> =
    T extends TSyncedValueDescriptor<infer A> ? A : never;

export type ExtractUnsyncedValueDescriptorPayload<T> =
    T extends TUnsyncedValueDescriptor<infer A> ? A : never;

export type ExtractSyncedValueDescriptor<T extends TAnyValueDescriptor> = Extract<
    T,
    { state: EValueDescriptorState.Synced }
>;

export type ExtractUnsyncedValueDescriptor<T extends TAnyValueDescriptor> = Extract<
    T,
    { state: EValueDescriptorState.Unsynced }
>;

type ExtractSyncPayload<T1, T2> =
    | (T1 extends TSyncedValueDescriptor<infer P1> ? P1 : never)
    | (T2 extends TSyncedValueDescriptor<infer P2> ? P2 : never);

type ExtractUnsyncPayload<T1, T2> =
    | (T1 extends TUnsyncedValueDescriptor<infer P1> ? P1 : never)
    | (T2 extends TUnsyncedValueDescriptor<infer P2> ? P2 : never);

// eslint-disable-next-line @typescript-eslint/naming-convention
export type TryConvertToValueDescriptor<T1, T2> = T1 extends TAnyValueDescriptor
    ? T2 extends TAnyValueDescriptor
        ? TValueDescriptor<ExtractSyncPayload<T1, T2>, ExtractUnsyncPayload<T1, T2>>
        : T1 | T2
    : T1 | T2;

// eslint-disable-next-line @typescript-eslint/naming-convention
export type ValueDescriptorHandlers<
    VD extends TAnyValueDescriptor,
    Out1 = ExtractSyncedValueDescriptor<VD>,
    Out2 = ExtractUnsyncedValueDescriptor<VD>,
> = {
    synced: (desc: ExtractSyncedValueDescriptor<VD>) => Out1;
    unsynced: (desc: ExtractUnsyncedValueDescriptor<VD>) => Out2;
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export type ValueDescriptorHandler<
    VD extends TAnyValueDescriptor,
    Out = ExtractSyncedValueDescriptor<VD>,
> = (desc: ExtractSyncedValueDescriptor<VD>) => Out;

type TFailMeta = {
    message: string;
    description?: string;
};

export type TValueDescriptorFail =
    | TFail<EValueDescriptorErrorCode.CANCELLED, TFailMeta>
    | TFail<EValueDescriptorErrorCode.UNKNOWN, TFailMeta>
    | TFail<EValueDescriptorErrorCode.INVALID_ARGUMENT, TFailMeta>
    | TFail<EValueDescriptorErrorCode.DEADLINE_EXCEEDED, TFailMeta>
    | TFail<EValueDescriptorErrorCode.NOT_FOUND, TFailMeta>
    | TFail<EValueDescriptorErrorCode.ALREADY_EXISTS, TFailMeta>
    | TFail<EValueDescriptorErrorCode.PERMISSION_DENIED, TFailMeta>
    | TFail<EValueDescriptorErrorCode.RESOURCE_EXHAUSTED, TFailMeta>
    | TFail<EValueDescriptorErrorCode.FAILED_PRECONDITION, TFailMeta>
    | TFail<EValueDescriptorErrorCode.ABORTED, TFailMeta>
    | TFail<EValueDescriptorErrorCode.OUT_OF_RANGE, TFailMeta>
    | TFail<EValueDescriptorErrorCode.UNIMPLEMENTED, TFailMeta>
    | TFail<EValueDescriptorErrorCode.INTERNAL, TFailMeta>
    | TFail<EValueDescriptorErrorCode.UNAVAILABLE, TFailMeta>
    | TFail<EValueDescriptorErrorCode.DATA_LOSS, TFailMeta>
    | TFail<EValueDescriptorErrorCode.UNAUTHENTICATED, TFailMeta>;
