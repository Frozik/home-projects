import { ModuleFactory, type TModuleApi } from '@frozik/utils';
import type { AddPanelOptions, DockviewApi } from 'dockview';
import { isNil } from 'lodash-es';
import { BehaviorSubject, firstValueFrom, tap } from 'rxjs';
import { first } from 'rxjs/operators';

export type TModuleTabManager = TModuleApi<typeof ModuleTabManager>;

export const ModuleTabManager = ModuleFactory(() => {
    const apiSubject = new BehaviorSubject<DockviewApi | undefined>(undefined);

    return {
        registerApi(api: DockviewApi) {
            apiSubject.next(api);
        },
        resetApi() {
            apiSubject.next(undefined);
        },
        async openTab(options: AddPanelOptions<{ title: string }>): Promise<void> {
            await firstValueFrom(
                apiSubject.pipe(
                    first((api) => !isNil(api)),
                    tap((api) => api.addPanel(options)),
                ),
            );
        },
    };
});
