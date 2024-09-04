import { useAsyncModule, useSyncObservable } from '@frozik/components';
import type { TValueDescriptor } from '@frozik/utils';
import {
    createSyncedValueDescriptor,
    createUnsyncedValueDescriptor,
    errorToFailValueDescriptor,
    EValueDescriptorErrorCode,
    Fail,
    REQUESTING_VD,
    switchMapValueDescriptor,
    WAITING_VD,
} from '@frozik/utils';
import { isNil } from 'lodash-es';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import type { Observable } from 'rxjs';
import { from, of, startWith } from 'rxjs';
import { map } from 'rxjs/operators';

import { TensorflowPlayer } from '../../../libs/pendulum/players/TensorflowPlayer';
import { ModuleIndexDBGenerations } from '../modules/ModuleIndexDBGenerations';

export function useCurrentRobot(): TValueDescriptor<TensorflowPlayer> {
    const dbModule = useAsyncModule(ModuleIndexDBGenerations);

    const { robotId } = useParams<{ robotId: string }>();

    const robot$ = useMemo<Observable<TValueDescriptor<TensorflowPlayer>>>(
        () =>
            isNil(dbModule) || isNil(robotId)
                ? of(WAITING_VD)
                : dbModule.getRobot$(robotId).pipe(
                      map((robot) =>
                          isNil(robot)
                              ? createUnsyncedValueDescriptor(
                                    Fail(EValueDescriptorErrorCode.NOT_FOUND, {
                                        message: `Robot not found`,
                                        description: `Robot "${robotId}" not found in database, try selecting another robot`,
                                    }),
                                )
                              : createSyncedValueDescriptor(robot),
                      ),
                      switchMapValueDescriptor(({ value: { name, modelUrl } }) =>
                          from(TensorflowPlayer.load(name, modelUrl)).pipe(
                              map((player) => createSyncedValueDescriptor(player)),
                          ),
                      ),
                      errorToFailValueDescriptor(),
                      startWith(REQUESTING_VD),
                  ),
        [dbModule, robotId],
    );

    return useSyncObservable(robot$, WAITING_VD);
}
