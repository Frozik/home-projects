import { useFrame } from '@react-three/fiber';
import { isNil } from 'lodash-es';
import { memo, useMemo, useRef } from 'react';
import type { InstancedBufferGeometry } from 'three';
import { DoubleSide, GLSL3 } from 'three';

import { CHARTS_FRAGMENT_SHADER, SIN_VERTEX_SHADER } from './shaders';

export const SinMesh = memo(() => {
    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uCount: { value: 1 },
            uSize: { value: new Float32Array([window.innerWidth, window.innerHeight]) },
            uPenSize: { value: new Float32Array([2, 20]) },
        }),
        [],
    );

    const instancedBufferGeometryRef = useRef<InstancedBufferGeometry>(null);

    useFrame((stage, delta) => {
        uniforms.uTime.value += delta;
        uniforms.uSize.value[0] = stage.viewport.width - 4 * uniforms.uPenSize.value[1];
        uniforms.uSize.value[1] = stage.viewport.height - 4 * uniforms.uPenSize.value[1];
        uniforms.uCount.value =
            Math.trunc(stage.viewport.width / uniforms.uPenSize.value[1] / 4) * 4 + 1;
        if (!isNil(instancedBufferGeometryRef.current)) {
            instancedBufferGeometryRef.current.instanceCount = uniforms.uCount.value;
        }
    });

    return (
        <mesh>
            {/* eslint-disable react/no-unknown-property */}
            <instancedBufferGeometry
                ref={instancedBufferGeometryRef}
                instanceCount={uniforms.uCount.value}
                drawRange={{ start: 0, count: 6 * 3 }}
            />
            <shaderMaterial
                side={DoubleSide}
                glslVersion={GLSL3}
                uniforms={uniforms}
                fragmentShader={CHARTS_FRAGMENT_SHADER}
                vertexShader={SIN_VERTEX_SHADER}
            />
            {/* eslint-enable react/no-unknown-property */}
        </mesh>
    );
});
