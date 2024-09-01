import type { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

import type {
    ExtractSyncedValueDescriptor,
    ExtractUnsyncedValueDescriptor,
    TAnyValueDescriptor,
    TryConvertToValueDescriptor,
    ValueDescriptorHandler,
    ValueDescriptorHandlers,
} from '../defs';
import { matchValueDescriptor } from '../utils';

export function mapValueDescriptor<
    VD extends TAnyValueDescriptor,
    Out1 = ExtractSyncedValueDescriptor<VD>,
    Out2 = ExtractUnsyncedValueDescriptor<VD>,
>(
    handlers: ValueDescriptorHandler<VD, Out1> | ValueDescriptorHandlers<VD, Out1, Out2>,
): OperatorFunction<VD, TryConvertToValueDescriptor<Out1, Out2>> {
    return map((d) => matchValueDescriptor(d, handlers));
}
