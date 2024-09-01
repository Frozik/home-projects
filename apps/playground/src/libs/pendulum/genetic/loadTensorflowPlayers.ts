import type { IRobotPlayer } from '../def';
import { TensorflowPlayer } from '../players/TensorflowPlayer';

export async function loadTensorflowPlayers(
    players: { name: string; modelUrl: string }[],
): Promise<IRobotPlayer[]> {
    return Promise.all(players.map(({ name, modelUrl }) => TensorflowPlayer.load(name, modelUrl)));
}
