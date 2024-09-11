import { useFrame } from '@react-three/fiber';
import { memo, useMemo } from 'react';
import { DoubleSide, GLSL3 } from 'three';

import { CHARTS_FRAGMENT_SHADER, SEGMENT_VERTEX_SHADER } from './shaders';

export const LineMesh = memo(() => {
    const uniforms = useMemo(
        () => ({
            uCount: { value: 1 },
            uSize: { value: new Float32Array([1000, 500]) },
            uPenSize: { value: new Float32Array([2, 50]) },
            uOpacity: { value: 1 },
        }),
        [],
    );

    useFrame((stage) => {
        uniforms.uSize.value[0] = stage.viewport.width - 2 * uniforms.uPenSize.value[1];
        uniforms.uSize.value[1] = stage.viewport.height - 2 * uniforms.uPenSize.value[1];
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

/*
* export const ZeroStencilOp: 0;
export const KeepStencilOp: 7680;
export const ReplaceStencilOp: 7681;
export const IncrementStencilOp: 7682;
export const DecrementStencilOp: 7283;
export const IncrementWrapStencilOp: 34055;
export const DecrementWrapStencilOp: 34056;
export const InvertStencilOp: 5386;*/
