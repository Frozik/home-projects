import { useFunction, useModule } from '@frozik/components';
import { isSyncedValueDescriptor, isWaitingArgumentsValueDescriptor } from '@frozik/utils';
import cn from 'classnames';
import type { DockviewApi, DockviewReadyEvent } from 'dockview';
import { DockviewReact } from 'dockview';
import { isNil } from 'lodash-es';
import { memo, useEffect, useState } from 'react';
import { useUnmount } from 'usehooks-ts';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { OverlayLoader } from '../../components/OverlayLoader';
import { usePreventScreensaver } from './hooks/usePreventScreensaver';
import { DEFAULT_LAYOUT, LAYOUT_COMPONENTS, LAYOUT_TAB_COMPONENTS } from './layout';
import { ModuleTabManager } from './modules/ModuleTabManager';
import styles from './Pendulum.module.scss';
import { selectLayout, updateLayout } from './pendulumSlice';

export const Pendulum = memo(() => {
    usePreventScreensaver();

    const { registerApi, resetApi } = useModule(ModuleTabManager);

    const dispatch = useAppDispatch();
    const layout = useAppSelector(selectLayout);

    const [api, setApi] = useState<DockviewApi>();

    useEffect(() => {
        if (isNil(api)) {
            return;
        }

        api.fromJSON(isSyncedValueDescriptor(layout) ? layout.value : DEFAULT_LAYOUT);
    }, [api, layout]);

    useEffect(() => {
        if (isNil(api)) {
            return;
        }

        const disposable = api.onDidLayoutChange(() => dispatch(updateLayout(api.toJSON())));

        return () => disposable.dispose();
    }, [api, dispatch]);

    const handleLayoutReady = useFunction((event: DockviewReadyEvent) => {
        setApi(event.api);
        registerApi(event.api);
    });

    useUnmount(() => resetApi());

    return isWaitingArgumentsValueDescriptor(layout) ? (
        <OverlayLoader />
    ) : (
        <DockviewReact
            className={cn(styles.container, 'dockview-theme-abyss')}
            components={LAYOUT_COMPONENTS}
            tabComponents={LAYOUT_TAB_COMPONENTS}
            onReady={handleLayoutReady}
            gap={4}
        />
    );
});
