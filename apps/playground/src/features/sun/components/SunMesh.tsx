import { useFrame } from '@react-three/fiber';
import { memo, useMemo } from 'react';
import { DoubleSide, GLSL3 } from 'three';

import { SUN_FRAGMENT_SHADER, SUN_VERTEX_SHADER } from './shaders';

export const SunMesh = memo(() => {
    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uCount: { value: 100_000 },
        }),
        [],
    );

    useFrame((_, delta) => {
        uniforms.uTime.value += delta;
    });

    return (
        <mesh>
            {/* eslint-disable react/no-unknown-property */}
            <instancedBufferGeometry
                instanceCount={uniforms.uCount.value}
                drawRange={{ start: 0, count: 3 }}
            />
            {/* eslint-enable react/no-unknown-property */}

            {/* eslint-disable react/no-unknown-property */}
            <shaderMaterial
                side={DoubleSide}
                glslVersion={GLSL3}
                uniforms={uniforms}
                fragmentShader={SUN_FRAGMENT_SHADER}
                vertexShader={SUN_VERTEX_SHADER}
            />
            {/* eslint-enable react/no-unknown-property */}
        </mesh>
    );
});
