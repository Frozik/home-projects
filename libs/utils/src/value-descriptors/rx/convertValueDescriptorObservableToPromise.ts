import type { Observable } from 'rxjs';
import { EMPTY, firstValueFrom, of } from 'rxjs';

import type { ExtractSyncedValueDescriptorPayload, TAnyValueDescriptor } from '../defs';
import { convertFailToError } from '../fails';
import { isFailValueDescriptor } from '../utils';
import { switchMapValueDescriptor } from './switchMapValueDescriptor';

export function convertValueDescriptorObservableToPromise<VD extends TAnyValueDescriptor>(
    descriptor$: Observable<VD>,
): Promise<ExtractSyncedValueDescriptorPayload<VD>> {
    return firstValueFrom(
        descriptor$.pipe(
            switchMapValueDescriptor({
                synced: (desc) => of(desc.value),
                unsynced: (vd) => {
                    if (isFailValueDescriptor(vd)) {
                        throw convertFailToError(vd.fail);
                    }

                    return EMPTY;
                },
            }),
        ),
    );
}
