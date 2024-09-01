import { isNil } from 'lodash-es';
import { useEffect, useState } from 'react';

import type { IRenderer, ITicker } from '../../../libs/pendulum/def';
import { Playground } from '../../../libs/pendulum/Playground';

export function usePlayground(
    ticker: ITicker,
    renderer: IRenderer | undefined,
    options?: { gravity?: number },
): Playground | undefined {
    const [playground, setPlayground] = useState<Playground | undefined>();
    useEffect(() => {
        const playground = new Playground(ticker);

        setPlayground(playground);

        return () => playground.destroy();
    }, [ticker]);

    const gravity = options?.gravity;
    useEffect(() => {
        if (isNil(gravity)) {
            return;
        }
        playground?.setGravity(gravity);
    }, [playground, gravity]);
    useEffect(() => void playground?.setRenderer(renderer), [playground, renderer]);

    return playground;
}
