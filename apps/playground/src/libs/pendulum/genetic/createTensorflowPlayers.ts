import type { IRobotPlayer } from '../def';
import { TensorflowPlayer } from '../players/TensorflowPlayer';

export function createTensorflowPlayers(populationSize: number): IRobotPlayer[] {
    return Array(populationSize)
        .fill(0)
        .map(() => new TensorflowPlayer());
}
