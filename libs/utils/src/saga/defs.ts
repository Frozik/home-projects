import type { TAnyValueDescriptor, TValueDescriptor } from '../value-descriptors';

export type TWrappedValueDescriptor<T> = T extends TAnyValueDescriptor ? T : TValueDescriptor<T>;
