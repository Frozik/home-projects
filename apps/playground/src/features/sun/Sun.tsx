import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { memo } from 'react';
import { Color } from 'three';

import { SunMesh } from './components/SunMesh';
import styles from './styles.module.scss';

export const Sun = memo(() => {
    return (
        <div className={styles.container}>
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
