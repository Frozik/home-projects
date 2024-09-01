import type { TStructurallyCloneable } from '@frozik/types';

export const FAIL_TAG = 'FAIL' as const;

export type TScopedFail<
    S extends Exclude<string, ''>,
    C extends Exclude<string, ''>,
    M extends undefined | TStructurallyCloneable = never,
> = TFail<`[${S}]: ${C}`, M>;

export type TFail<T extends string, M extends undefined | TStructurallyCloneable = undefined> = {
    tag: typeof FAIL_TAG;
    code: T;
    meta: M;
};

export type TFailConstructor<P extends string = ''> = {
    <C extends string>(code: C): TFail<P extends '' ? C : `[${P}]: ${C}`>;
    <C extends string, M extends TStructurallyCloneable>(
        code: C,
        meta: M,
    ): TFail<P extends '' ? C : `[${P}]: ${C}`, M>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TAnyFail = TFail<any, any>;
