import type { TContextRef } from '@frozik/utils';
import { createContext } from 'react';

export const Context = createContext<{ contextId: undefined | TContextRef }>({
    contextId: undefined,
});
