import type { TContextRef } from '@frozik/utils';
import type { ReactElement, ReactNode } from 'react';

import { Context } from './context';

interface IDIProviderProps {
    context: TContextRef;
    children?: ReactNode;
}

export const DIProvider = (props: IDIProviderProps): ReactElement => (
    <Context.Provider value={{ contextId: props.context }}>{props.children}</Context.Provider>
);
