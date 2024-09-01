import { isObject, isUndefined } from 'lodash-es';
import type { OperatorFunction } from 'rxjs';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

import type { TAnyValueDescriptor } from '../defs';
import { isSyncedValueDescriptor } from '../utils';
import type { TExtractSyncedValueDescriptorPayloadArray } from './defs';
import { distinctValueDescriptorUntilChanged } from './distinctValueDescriptorUntilChanged';
import { squashList } from './utils';

export function squashValueDescriptors<
    T extends readonly TAnyValueDescriptor[] | Record<string, TAnyValueDescriptor>,
>(): OperatorFunction<T, TExtractSyncedValueDescriptorPayloadArray<T>> {
    return pipe(
        map((set) => {
            let arr: TAnyValueDescriptor[];
            let keys: undefined | string[];

            if (Array.isArray(set)) {
                arr = set;
            } else if (isObject(set)) {
                arr = Object.values(set);
                keys = Object.keys(set);
            } else {
                throw new Error('squashValueDescriptors: invalid argument');
            }

            const result = squashList(arr);

            if (!isUndefined(keys) && isSyncedValueDescriptor(result)) {
                result.value = keys.reduce(
                    (acc, key, index) => {
                        acc[key] = arr[index].value;
                        return acc;
                    },
                    //eslint-disable-next-line @typescript-eslint/no-explicit-any
                    {} as any,
                );
            }

            return result as TExtractSyncedValueDescriptorPayloadArray<T>;
        }),
        distinctValueDescriptorUntilChanged(() => false),
    );
}
