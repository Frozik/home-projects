import type {
    ExtractSyncedValueDescriptorPayload,
    TAnyValueDescriptor,
    TValueDescriptor,
} from '../defs';

export type TExtractSyncedValueDescriptorPayloadArray<
    T extends readonly TAnyValueDescriptor[] | Record<string, TAnyValueDescriptor>,
> = T extends [...infer U]
    ? TValueDescriptor<{ [K in keyof U]: ExtractSyncedValueDescriptorPayload<U[K]> }>
    : TValueDescriptor<{ [K in keyof T]: ExtractSyncedValueDescriptorPayload<T[K]> }>;
