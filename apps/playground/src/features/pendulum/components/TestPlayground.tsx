import { CloseOutlined, RobotOutlined, UserOutlined } from '@ant-design/icons';
import { useFunction } from '@frozik/components';
import {
    createSyncedValueDescriptor,
    isFailValueDescriptor,
    isLoadingValueDescriptor,
    isSyncedValueDescriptor,
    matchValueDescriptor,
} from '@frozik/utils';
import { isNil } from 'lodash-es';
import { memo, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { OverlayLoader } from '../../../components/OverlayLoader';
import { ValueDescriptorFail } from '../../../components/ValueDescriptorFail';
import { EPlayerType } from '../../../libs/pendulum/def';
import { HumanPlayer } from '../../../libs/pendulum/players/HumanPlayer';
import { useCurrentRobot } from '../hooks/useCurrentRobot';
import { useFrameTicker } from '../hooks/useFrameTicker';
import { usePlayground } from '../hooks/usePlayground';
import { useRenderer } from '../hooks/useRenderer';
import { selectGravity, setGravity } from '../pendulumSlice';
import commonStyles from './common.module.scss';
import { PendulumPlayground } from './PendulumPlayground';

export const TestPlayground = memo(() => {
    const dispatch = useAppDispatch();

    const robotVD = useCurrentRobot();

    const playerVD = useMemo(
        () =>
            matchValueDescriptor(robotVD, {
                synced: ({ value: robot }) => createSyncedValueDescriptor(robot),
                unsynced: (vd) =>
                    isLoadingValueDescriptor(vd) || isFailValueDescriptor(vd)
                        ? vd
                        : createSyncedValueDescriptor(new HumanPlayer()),
            }),
        [robotVD],
    );

    const [paused, setPaused] = useState(true);

    const gravity = useAppSelector(selectGravity);
    const handleGravityChange = useFunction((gravity: number) => dispatch(setGravity(gravity)));
    const [additionalForcePosition, setAdditionalForcePosition] = useState<{
        x: number;
        y: number;
    }>();

    const [renderer, setContextsWorld] = useRenderer();
    const ticker = useFrameTicker(paused);
    const playground = usePlayground(ticker, renderer, { gravity });

    useEffect(
        () =>
            void playground?.clear().then(() => {
                if (isSyncedValueDescriptor(playerVD)) {
                    playground.addPlayer(playerVD.value);
                }
            }),
        [playground, playerVD],
    );

    useEffect(() => {
        if (isNil(playground)) {
            return;
        }

        playground.setAdditionalForcePosition(additionalForcePosition);
    }, [playground, additionalForcePosition]);

    const navigate = useNavigate();

    const handleRemovePlayer = useFunction(() => navigate(`/pendulum`));

    if (isLoadingValueDescriptor(playerVD)) {
        return (
            <div className={commonStyles.alertContainer}>
                <OverlayLoader />
            </div>
        );
    } else if (isFailValueDescriptor(playerVD)) {
        return <ValueDescriptorFail fail={playerVD.fail} />;
    }

    return (
        <PendulumPlayground
            paused={paused}
            gravity={gravity}
            pauseResumeKeyCode="Space"
            onAdditionalForce={setAdditionalForcePosition}
            onGravityChanged={handleGravityChange}
            onPausedChanged={setPaused}
            onSetContexts={setContextsWorld}
        >
            {isSyncedValueDescriptor(playerVD) && (
                <>
                    {playerVD.value.type === EPlayerType.Human && (
                        <div className={commonStyles.description}>
                            <UserOutlined />

                            {playerVD.value.name}
                        </div>
                    )}
                    {playerVD.value.type === EPlayerType.Robot && (
                        <div
                            className={commonStyles.descriptionWithRemoval}
                            onClick={handleRemovePlayer}
                        >
                            <RobotOutlined />

                            {playerVD.value.name}

                            <CloseOutlined className={commonStyles.descriptionClose} />
                        </div>
                    )}
                </>
            )}
        </PendulumPlayground>
    );
});
