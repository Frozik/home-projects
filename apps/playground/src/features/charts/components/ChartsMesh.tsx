import { useFrame } from '@react-three/fiber';
import { memo, useMemo } from 'react';
import { DoubleSide, GLSL3 } from 'three';

import { CHARTS_FRAGMENT_SHADER, SUN_VERTEX_SHADER } from './shaders';

export const ChartsMesh = memo(() => {
    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uCount: { value: 2 ** 20 },
            uSize: { value: new Float32Array([1000, 500]) },
            uScale: { value: 2 },
            uPenSize: { value: new Float32Array([2, 20]) },
        }),
        [],
    );

    useFrame((stage, delta) => {
        uniforms.uTime.value += delta;
        uniforms.uSize.value[0] =
            stage.viewport.width / uniforms.uScale.value - 2 * uniforms.uPenSize.value[1];
        uniforms.uSize.value[1] =
            stage.viewport.height / uniforms.uScale.value - 2 * uniforms.uPenSize.value[1];
    });

    return (
        <mesh>
            {/* eslint-disable react/no-unknown-property */}
            <instancedBufferGeometry
                instanceCount={uniforms.uCount.value}
                drawRange={{ start: 0, count: 6 * 3 }}
            />
            {/* eslint-enable react/no-unknown-property */}

            {/* eslint-disable react/no-unknown-property */}
            <shaderMaterial
                side={DoubleSide}
                glslVersion={GLSL3}
                uniforms={uniforms}
                fragmentShader={CHARTS_FRAGMENT_SHADER}
                vertexShader={SUN_VERTEX_SHADER}
            />
            {/* eslint-enable react/no-unknown-property */}
        </mesh>
    );
});
