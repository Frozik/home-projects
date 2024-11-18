import type { TContextRef } from '@frozik/utils';
import { assert } from '@frozik/utils';
import { isNil } from 'lodash-es';
import { useContext } from 'react';

import { Context } from '../di/context';

export function useContextRef(): TContextRef {
    const { contextId } = useContext(Context);

    assert(!isNil(contextId), 'ContextRef is not defined');

    return contextId;
}
