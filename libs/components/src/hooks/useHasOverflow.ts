import { isEqual, isNil } from 'lodash-es';
import type { RefObject } from 'react';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useResizeObserver } from 'usehooks-ts';

import { useFunction } from './useFunction';

export function useHasOverflow<T extends HTMLElement>(
    ref: RefObject<T>,
): {
    hasVerticalScroll: boolean;
    canScrollTop: boolean;
    canScrollBottom: boolean;
    hasHorizontalScroll: boolean;
    canScrollLeft: boolean;
    canScrollRight: boolean;
} {
    const [overflow, setOverflow] = useState<{
        hasVerticalScroll: boolean;
        canScrollTop: boolean;
        canScrollBottom: boolean;
        hasHorizontalScroll: boolean;
        canScrollLeft: boolean;
        canScrollRight: boolean;
    }>({
        hasVerticalScroll: false,
        canScrollTop: false,
        canScrollBottom: false,
        hasHorizontalScroll: false,
        canScrollLeft: false,
        canScrollRight: false,
    });

    const { width = 0, height = 0 } = useResizeObserver({
        ref,
        box: 'border-box',
    });

    const handleChangeOverflow = useFunction((element: T) => {
        const newOverflow = {
            hasVerticalScroll: element.scrollHeight > element.clientHeight,
            canScrollTop: Math.trunc(element.scrollTop) > 0,
            canScrollBottom:
                Math.trunc(element.scrollHeight - element.clientHeight - element.scrollTop) > 0,
            hasHorizontalScroll: element.scrollWidth > element.clientWidth,
            canScrollLeft: Math.trunc(element.scrollLeft) > 0,
            canScrollRight:
                Math.trunc(element.scrollWidth - element.clientWidth - element.scrollLeft) > 0,
        };

        if (!isEqual(newOverflow, overflow)) {
            setOverflow(newOverflow);
        }
    });

    useLayoutEffect(() => {
        const { current } = ref;

        if (!isNil(current)) {
            handleChangeOverflow(current);
        }
    }, [ref, handleChangeOverflow, width, height]);

    useEffect(() => {
        const { current } = ref;

        if (isNil(current)) {
            return;
        }

        const bound = handleChangeOverflow.bind(null, current);

        current.addEventListener('scroll', bound);

        return () => current.removeEventListener('scroll', bound);
    }, [ref, handleChangeOverflow]);

    return overflow;
}
