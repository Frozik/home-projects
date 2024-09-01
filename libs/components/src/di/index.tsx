import type { TContextRef } from '@frozik/utils';
import type { ReactElement, ReactNode } from 'react';
import { createContext } from 'react';

export const Context = createContext<{ contextId: undefined | TContextRef }>({
    contextId: undefined,
});

interface IDIProviderProps {
    context: TContextRef;
    children?: ReactNode;
}

export const DIProvider = (props: IDIProviderProps): ReactElement => (
    <Context.Provider value={{ contextId: props.context }}>{props.children}</Context.Provider>
);
