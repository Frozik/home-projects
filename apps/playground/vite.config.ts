import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
// eslint-disable-next-line import/no-default-export
export default defineConfig({
    base: '/home-projects',
    plugins: [react()],
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: ['./vitest.setup.ts'],
    },
    build: {
        rollupOptions: {
            output: {
                entryFileNames: `assets/e-[hash].js`,
                chunkFileNames: `assets/c-[hash].js`,
                assetFileNames: `assets/a-[hash].[ext]`,
            },
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                api: 'modern-compiler',
            },
        },
        modules: {
            localsConvention: 'camelCaseOnly',
        },
    },
});
