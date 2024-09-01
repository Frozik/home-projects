/* eslint-disable @typescript-eslint/naming-convention */

export type Assign<A, B> = Omit<A, keyof B> & B;

export type Nil = null | undefined;

export type Opaque<Type, BaseType> = BaseType & {
    readonly __type__: Type;
    readonly __baseType__: BaseType;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Unopaque<O extends Opaque<any, any>> = O extends Opaque<any, infer T> ? T : never;

export type Primitive = string | number | boolean | null | undefined;
