import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { memo } from 'react';
import { Color } from 'three';

import commonStyles from '../styles.module.scss';
import { SunMesh } from './components/SunMesh';

export const Sun = memo(() => {
    return (
        <div className={commonStyles.fixedContainer}>
            <Canvas
                camera={{ position: [0.0, 0.0, 10.0] }}
                scene={{ background: new Color('#262626') }}
            >
                <SunMesh />
                <OrbitControls />
            </Canvas>
        </div>
    );
});
