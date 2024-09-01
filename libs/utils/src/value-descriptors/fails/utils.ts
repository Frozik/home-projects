import { has, isEqual, isObject } from 'lodash-es';

import { EValueDescriptorErrorCode } from '../codes';
import type { TValueDescriptorFail } from '../defs';
import type { TAnyFail } from './defs';
import { FAIL_TAG } from './defs';
import { ValueDescriptorError } from './error';
import { Fail } from './fail';

export function isFail<F extends TAnyFail>(v: unknown): v is F {
    return isObject(v) && has(v, 'tag') && v['tag'] === FAIL_TAG;
}

export function isEqualsFails<A extends TAnyFail, B extends TAnyFail>(a: A, b: B) {
    return a.tag === b.tag && a.code === b.code && isEqual(a.meta, b.meta);
}

export function convertErrorToFail(error: Error | ValueDescriptorError): TValueDescriptorFail {
    return error instanceof ValueDescriptorError
        ? Fail(error.code, {
              message: error.message,
              description: error.description,
          })
        : Fail(EValueDescriptorErrorCode.UNKNOWN, {
              message: error.message,
          });
}

export function convertFailToError(fail: TValueDescriptorFail): ValueDescriptorError {
    return new ValueDescriptorError(fail.meta.message, fail.code, fail.meta.description);
}

export function findWorstFailIndex(fails: TValueDescriptorFail[]): number {
    return fails.reduce((worstIndex, fail, index) => {
        return MAP_VALUE_DESCRIPTOR_CODE_TO_WEIGHT[fail.code] >
            MAP_VALUE_DESCRIPTOR_CODE_TO_WEIGHT[fails[worstIndex].code]
            ? index
            : worstIndex;
    }, 0);
}

const MAP_VALUE_DESCRIPTOR_CODE_TO_WEIGHT = {
    [EValueDescriptorErrorCode.UNAUTHENTICATED]: 16,
    [EValueDescriptorErrorCode.PERMISSION_DENIED]: 15,
    [EValueDescriptorErrorCode.DATA_LOSS]: 14,
    [EValueDescriptorErrorCode.ABORTED]: 13,
    [EValueDescriptorErrorCode.FAILED_PRECONDITION]: 12,
    [EValueDescriptorErrorCode.UNKNOWN]: 11,
    [EValueDescriptorErrorCode.INTERNAL]: 10,
    [EValueDescriptorErrorCode.UNAVAILABLE]: 9,
    [EValueDescriptorErrorCode.NOT_FOUND]: 8,
    [EValueDescriptorErrorCode.OUT_OF_RANGE]: 7,
    [EValueDescriptorErrorCode.UNIMPLEMENTED]: 6,
    [EValueDescriptorErrorCode.INVALID_ARGUMENT]: 5,
    [EValueDescriptorErrorCode.DEADLINE_EXCEEDED]: 4,
    [EValueDescriptorErrorCode.RESOURCE_EXHAUSTED]: 3,
    [EValueDescriptorErrorCode.ALREADY_EXISTS]: 2,
    [EValueDescriptorErrorCode.CANCELLED]: 1,
};
