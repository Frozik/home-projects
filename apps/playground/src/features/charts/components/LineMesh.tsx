import { useFrame } from '@react-three/fiber';
import { memo, useMemo } from 'react';
import { DoubleSide, GLSL3 } from 'three';

import { CHARTS_FRAGMENT_SHADER, SEGMENT_VERTEX_SHADER } from './shaders';

export const LineMesh = memo(() => {
    const uniforms = useMemo(
        () => ({
            uCount: { value: 4 },
            uSize: { value: new Float32Array([window.innerWidth, window.innerHeight]) },
        }),
        [],
    );

    useFrame(({ viewport }) => {
        uniforms.uSize.value[0] = Math.max(0, viewport.width - 20);
        uniforms.uSize.value[1] = Math.max(0, viewport.height - 20);
    });

    return (
        <mesh>
            {/* eslint-disable react/no-unknown-property */}
            <instancedBufferGeometry
                instanceCount={uniforms.uCount.value}
                drawRange={{ start: 0, count: 6 * 3 }}
            />
            <shaderMaterial
                side={DoubleSide}
                glslVersion={GLSL3}
                uniforms={uniforms}
                fragmentShader={CHARTS_FRAGMENT_SHADER}
                vertexShader={SEGMENT_VERTEX_SHADER}
            />
            {/* eslint-enable react/no-unknown-property */}
        </mesh>
    );
});
