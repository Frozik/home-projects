import { useFunction } from '@frozik/components';
import { Badge, Button } from 'antd';
import { memo } from 'react';

export const Player = memo(
    ({
        className,
        name,
        modelUrl,
        score,
        onSelect,
    }: {
        className?: string;
        name: string;
        modelUrl: string;
        score: number;
        onSelect?: (name: string, modelUrl: string) => void;
    }) => {
        const handleClick = useFunction(() => onSelect?.(name, modelUrl));

        return (
            <Button className={className} onClick={handleClick}>
                <Badge count={score.toFixed(0)}>{name}</Badge>
            </Button>
        );
    },
);
