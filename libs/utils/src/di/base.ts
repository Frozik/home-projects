import { isNil } from 'lodash-es';

import type { IModuleConstructor, TContextContainer, TContextRef } from './defs';

const contextsContainers = new WeakMap<TContextRef, TContextContainer>();

export function toContextRef<T extends object>(v: T): TContextRef {
    return v as unknown as TContextRef;
}

export function ModuleFactory<R>(constructor: (ref: TContextRef) => R): IModuleConstructor<R> {
    return function moduleConstructor(ref: TContextRef): R {
        const contextContainer = getContextContainer(ref);

        const module = contextContainer.get(constructor) as R | undefined;

        if (isNil(module)) {
            const newModule = constructor(ref);
            contextContainer.set(constructor, newModule);
            return newModule;
        }

        return module;
    };
}

function getContextContainer(ref: TContextRef): TContextContainer {
    const contextContainer = contextsContainers.get(ref);

    if (!isNil(contextContainer)) {
        return contextContainer;
    }

    const newContextContainer = new WeakMap<Function, unknown>();

    contextsContainers.set(ref, newContextContainer);

    return newContextContainer;
}
