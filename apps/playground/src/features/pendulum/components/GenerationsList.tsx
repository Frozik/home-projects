import { useFunction } from '@frozik/components';
import type { ISO } from '@frozik/types';
import {
    createSyncedValueDescriptor,
    EMPTY_VD,
    isEmptyValueDescriptor,
    isFailValueDescriptor,
    isLoadingValueDescriptor,
    isSyncedValueDescriptor,
    isWaitingArgumentsValueDescriptor,
    matchValueDescriptor,
} from '@frozik/utils';
import type { TableColumnsType } from 'antd';
import { Alert, Badge, Button, List, Table, Tag } from 'antd';
import { isNil } from 'lodash-es';
import { memo, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResizeObserver } from 'usehooks-ts';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
    loadCompetition,
    selectCompetitionsList,
    selectCurrentCompetition,
    setCurrentCompetition,
} from '../pendulumSlice';
import commonStyles from './common.module.scss';
import styles from './GenerationsList.module.scss';

type TFixedType = 'left' | 'right' | undefined;

export const GenerationsList = memo(() => {
    const ref = useRef<HTMLDivElement>(null);
    const { width = 0, height = 0 } = useResizeObserver({
        ref,
        box: 'border-box',
    });

    const dispatch = useAppDispatch();

    const competitionsList = useAppSelector(selectCompetitionsList);
    const currentCompetition = useAppSelector(selectCurrentCompetition);

    const navigate = useNavigate();

    const handleContinueCompetition = useFunction((competitionStart: ISO | undefined) => {
        if (isNil(competitionStart)) {
            dispatch(
                setCurrentCompetition(
                    createSyncedValueDescriptor({
                        competitionStart: new Date().toISOString() as ISO,
                        generations: [],
                    }),
                ),
            );
        } else {
            dispatch(loadCompetition(competitionStart));
        }
    });

    const competitionsDataSource = useMemo<('new' | ISO)[]>(
        () =>
            matchValueDescriptor(competitionsList, {
                synced: ({ value }) => ['new', ...value],
                unsynced: (vd) => (vd === EMPTY_VD ? ['new'] : []),
            }),
        [competitionsList],
    );

    const generations = useMemo(() => {
        if (isSyncedValueDescriptor(currentCompetition)) {
            return currentCompetition.value.generations;
        }
        return [];
    }, [currentCompetition]);

    const maxPopulationSize = useMemo(
        () => generations.reduce((acc, { players: { length } }) => Math.max(acc, length), 0),
        [generations],
    );

    const generationColumns = useMemo<TableColumnsType<{ id: number }>>(
        () => [
            {
                title: `#`,
                dataIndex: 'id',
                key: 'id',
                fixed: 'left' as TFixedType,
                width: 80,
                sorter: (a, b) => a.id - b.id,
                defaultSortOrder: 'descend',
            },
            {
                title: `Best score`,
                dataIndex: 'maxScore',
                key: 'maxScore',
                fixed: 'left' as TFixedType,
                width: 110,
                render: (maxScore: number) => (
                    <Tag color={maxScore > 0 ? 'green' : maxScore < 0 ? 'red' : 'blue'}>
                        {maxScore}
                    </Tag>
                ),
            },
            ...new Array(maxPopulationSize).fill(0).map((_, index) => ({
                title: `Player #${index + 1}`,
                dataIndex: `player-${index}`,
                key: `player-${index}`,
                width: 340,
                render: (player: { name: string; modelUrl: string; score: number }) => (
                    <Badge
                        count={player.score}
                        overflowCount={player.score}
                        color={player.score > 0 ? 'green' : player.score < 0 ? 'red' : 'blue'}
                    >
                        <Button type="link" onClick={() => navigate(`/pendulum/${player.name}`)}>
                            {player.name}
                        </Button>
                    </Badge>
                ),
            })),
        ],
        [maxPopulationSize, navigate],
    );

    const generationDatasource = useMemo(
        () =>
            generations.map(({ id, maxScore, players }) =>
                players.reduce(
                    (acc, player, index) => ({
                        ...acc,
                        [`player-${index}`]: player,
                    }),
                    { key: id, id, maxScore },
                ),
            ),
        [generations],
    );

    const failValueDescriptor = isFailValueDescriptor(competitionsList)
        ? competitionsList.fail
        : isFailValueDescriptor(currentCompetition)
          ? currentCompetition.fail
          : undefined;

    const showCompetitionsSelector =
        isNil(failValueDescriptor) &&
        (isLoadingValueDescriptor(currentCompetition) ||
            isWaitingArgumentsValueDescriptor(currentCompetition) ||
            isLoadingValueDescriptor(competitionsList) ||
            isWaitingArgumentsValueDescriptor(competitionsList));

    return (
        <div ref={ref} className={styles.container}>
            {!isNil(failValueDescriptor) && (
                <div className={commonStyles.alertContainer}>
                    <Alert
                        message={failValueDescriptor.meta.message}
                        description={failValueDescriptor.meta.description}
                        type="error"
                        showIcon
                    />
                </div>
            )}

            {showCompetitionsSelector && (
                <List
                    className={styles.list}
                    loading={
                        isLoadingValueDescriptor(competitionsList) ||
                        isLoadingValueDescriptor(currentCompetition)
                    }
                    itemLayout="horizontal"
                    dataSource={competitionsDataSource}
                    renderItem={(startDate) => (
                        <List.Item>
                            <Button
                                key="start"
                                type="link"
                                size="small"
                                onClick={() =>
                                    handleContinueCompetition(
                                        startDate === 'new' ? undefined : startDate,
                                    )
                                }
                            >
                                {startDate === 'new'
                                    ? 'Create New'
                                    : `Continue with ${new Date(startDate).toLocaleString('ru-RU', {
                                          year: 'numeric',
                                          month: '2-digit',
                                          day: '2-digit',
                                          hour: '2-digit',
                                          minute: '2-digit',
                                      })}`}
                            </Button>
                        </List.Item>
                    )}
                />
            )}

            {(isSyncedValueDescriptor(currentCompetition) ||
                isEmptyValueDescriptor(currentCompetition)) &&
                (isSyncedValueDescriptor(competitionsList) ||
                    isEmptyValueDescriptor(competitionsList)) && (
                    <Table
                        virtual
                        className={styles.grid}
                        dataSource={generationDatasource}
                        columns={generationColumns}
                        pagination={false}
                        bordered
                        scroll={{ x: Math.ceil(width), y: Math.ceil(height - 56) }}
                    />
                )}
        </div>
    );
});
