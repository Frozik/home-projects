import { isEqual } from 'lodash-es';
import type { MonoTypeOperatorFunction } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

import type { ExtractValueDescriptorPayload, TAnyValueDescriptor } from '../defs';
import { isEqualValueDescriptor } from '../utils';

export function distinctValueDescriptorUntilChanged<VD extends TAnyValueDescriptor>(
    isEqualPayload: (
        a: ExtractValueDescriptorPayload<VD>,
        b: ExtractValueDescriptorPayload<VD>,
    ) => boolean = isEqual,
): MonoTypeOperatorFunction<VD> {
    return distinctUntilChanged((a, b) => isEqualValueDescriptor(a, b, isEqualPayload));
}
