import type { MonoTypeOperatorFunction } from 'rxjs';

import type { TAnyValueDescriptor } from '../defs';
import { convertFailToError } from '../fails';
import { isFailValueDescriptor } from '../utils';
import { tapValueDescriptor } from './tapValueDescriptor';

export function failToError<T extends TAnyValueDescriptor>(): MonoTypeOperatorFunction<T> {
    return tapValueDescriptor<T>({
        unsynced: (vd) => {
            if (isFailValueDescriptor(vd)) {
                throw convertFailToError(vd.fail);
            }
        },
    });
}
