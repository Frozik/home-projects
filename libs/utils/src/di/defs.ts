import type { Opaque } from '@frozik/types';

export type TContextRef = Opaque<object, 'ContextRef'>;

export type TModuleApi<T> =
    T extends IModuleConstructor<infer U> ? (U extends Promise<infer V> ? V : U) : never;

export interface IModuleConstructor<T> {
    (ref: TContextRef): T;
}
export type TContextContainer = WeakMap<(ref: TContextRef) => void, unknown>;
