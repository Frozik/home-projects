import type { Observable, ObservableInputTuple } from 'rxjs';
import { combineLatest } from 'rxjs';

import type { TAnyValueDescriptor } from '../defs';
import type { TExtractSyncedValueDescriptorPayloadArray } from './defs';
import { squashValueDescriptors } from './squashValueDescriptors';

export function combineLatestValueDescriptors<A extends readonly TAnyValueDescriptor[]>(
    sources: readonly [...ObservableInputTuple<A>],
): Observable<TExtractSyncedValueDescriptorPayloadArray<A>> {
    return combineLatest(sources).pipe(squashValueDescriptors<A>());
}
