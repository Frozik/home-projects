import { useFunction } from '@frozik/components';
import { isSyncedValueDescriptor } from '@frozik/utils';
import { isNil, max } from 'lodash-es';
import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import type {
    ICompetition,
    IRobotPlayer,
    IScoredPlayer,
    TPlayer,
} from '../../../libs/pendulum/def';
import { EPlayerType } from '../../../libs/pendulum/def';
import { HALT_PLAYER_SCORE_PER_MS } from '../../../libs/pendulum/genetic/constants';
import { createTensorflowPlayers } from '../../../libs/pendulum/genetic/createTensorflowPlayers';
import { loadTensorflowPlayers } from '../../../libs/pendulum/genetic/loadTensorflowPlayers';
import { singlePendulumGenerationBuilder } from '../../../libs/pendulum/genetic/singlePendulumGenerationBuilder';
import { singlePendulumScoreCalculatorBuilder } from '../../../libs/pendulum/genetic/singlePendulumScoreCalculatorBuilder';
import { addCompetitionRun, selectCurrentCompetition } from '../pendulumSlice';

const POPULATION_SIZE = 30;
const MAX_RUNS = 10_000;
const FITNESS_RUN_INTERVAL = 20_000;

export function useCompetition(): ICompetition | undefined {
    const dispatch = useAppDispatch();

    const currentCompetition = useAppSelector(selectCurrentCompetition);

    const [competition, setCompetition] = useState<ICompetition | undefined>();

    const createCompetition = useFunction(async () => {
        if (!isSyncedValueDescriptor(currentCompetition)) {
            return;
        }

        const { competitionStart, generations } = currentCompetition.value;

        const competitionProlongation = singlePendulumGenerationBuilder(POPULATION_SIZE, MAX_RUNS);

        const savedPlayers = generations?.at(-1)?.players.map(({ name, modelUrl }) => ({
            name,
            modelUrl,
        }));

        let count = generations?.length ?? 0;

        const competition: ICompetition = {
            start: competitionStart,

            get generationsCount(): number {
                return count;
            },

            init: isNil(savedPlayers)
                ? createTensorflowPlayers.bind(undefined, POPULATION_SIZE)
                : loadTensorflowPlayers.bind(undefined, savedPlayers),

            scoreCalculatorBuilder: singlePendulumScoreCalculatorBuilder,

            competitionForPlayerCompleted(_: TPlayer, score: number): boolean {
                return score < HALT_PLAYER_SCORE_PER_MS * FITNESS_RUN_INTERVAL;
            },

            competitionCompleted(timeStep: DOMHighResTimeStamp): boolean {
                return timeStep >= FITNESS_RUN_INTERVAL;
            },

            async restartCompetition(
                playersWithScore: IScoredPlayer[],
                timeStep: DOMHighResTimeStamp,
            ) {
                count++;

                const players = await Promise.all(
                    playersWithScore
                        .filter(
                            (
                                playerWithScore: IScoredPlayer,
                            ): playerWithScore is IScoredPlayer<IRobotPlayer> =>
                                playerWithScore.player.type === EPlayerType.Robot,
                        )
                        .map(async ({ player, score }) => {
                            const modelUrl = `indexeddb://${competition.start}-player-${player.name}}`;

                            await player.save(modelUrl);

                            return {
                                name: player.name,
                                modelUrl,
                                score,
                            };
                        }),
                );

                dispatch(
                    addCompetitionRun({
                        competitionStart,
                        generation: {
                            id: count,
                            maxScore: max(playersWithScore.map(({ score }) => score)) ?? 0,
                            players: players.sort((a, b) => b.score - a.score),
                        },
                    }),
                );

                return competitionProlongation(playersWithScore, timeStep, count);
            },
        };

        setCompetition(competition);
    });

    const competitionStart = isSyncedValueDescriptor(currentCompetition)
        ? currentCompetition.value.competitionStart
        : undefined;

    useEffect(() => {
        if (isNil(competitionStart)) {
            setCompetition(undefined);
        } else {
            void createCompetition();
        }
    }, [createCompetition, competitionStart]);

    return competition;
}
