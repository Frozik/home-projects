import { Canvas } from '@react-three/fiber';
import { memo, useEffect, useMemo, useRef } from 'react';
import { Color, OrthographicCamera } from 'three';
import { useResizeObserver } from 'usehooks-ts';

import commonStyles from '../styles.module.scss';
import { LineMesh } from './components/LineMesh';
import { SinMesh } from './components/SinMesh';

export const Charts = memo(() => {
    const ref = useRef<HTMLDivElement>(null);
    const { width = 0, height = 0 } = useResizeObserver({
        ref,
        box: 'border-box',
    });

    const camera = useMemo(() => {
        return new OrthographicCamera(0, 0, 0, 0, -1000, 1000);
    }, []);

    useEffect(() => {
        const halfWidth = width / 2;
        const halfHeight = height / 2;

        camera.left = -halfWidth;
        camera.right = halfWidth;
        camera.top = halfHeight;
        camera.bottom = -halfHeight;
        camera.updateProjectionMatrix();
    }, [camera, width, height]);

    return (
        <div ref={ref} className={commonStyles.fixedContainer}>
            <Canvas orthographic camera={camera} scene={{ background: new Color('#262626') }}>
                <LineMesh />
                <SinMesh />
            </Canvas>
        </div>
    );
});
