import { isFunction, noop } from 'lodash-es';
import type { MonoTypeOperatorFunction } from 'rxjs';
import { tap } from 'rxjs/operators';

import type { TAnyValueDescriptor, ValueDescriptorHandler, ValueDescriptorHandlers } from '../defs';
import { matchValueDescriptor } from '../utils';

export function tapValueDescriptor<VD extends TAnyValueDescriptor>(
    handlers:
        | ValueDescriptorHandler<VD, unknown>
        | Partial<ValueDescriptorHandlers<VD, unknown, unknown>>,
): MonoTypeOperatorFunction<VD> {
    return tap((d) =>
        matchValueDescriptor(
            d,
            isFunction(handlers)
                ? handlers
                : {
                      synced: handlers.synced ?? noop,
                      unsynced: handlers.unsynced ?? noop,
                  },
        ),
    );
}
