import { memo } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { OverlayLoader } from '../../components/OverlayLoader';
import { createInjectorLoader } from './createInjectorLoader';
import { ErrorPage } from './ErrorPage';
import { PageInjector } from './PageInjector';
import { Root } from './Root';

const rootRouter = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: (
                    <PageInjector
                        lazyComponent={async () =>
                            (await import('../../features/welcome/Welcome')).Welcome
                        }
                    >
                        <OverlayLoader />
                    </PageInjector>
                ),
            },
            {
                path: 'pendulum/:robotId?',
                loader: createInjectorLoader({
                    sliceResolver: async () =>
                        (await import('../../features/pendulum/pendulumSlice')).pendulumSlice,
                    sagaResolver: async () =>
                        (await import('../../features/pendulum/pendulumSaga')).pendulumSaga,
                }),
                element: (
                    <PageInjector
                        lazyComponent={async () =>
                            (await import('../../features/pendulum/Pendulum')).Pendulum
                        }
                    >
                        <OverlayLoader />
                    </PageInjector>
                ),
            },
            {
                path: 'sudoku/:puzzle?',
                loader: createInjectorLoader({
                    sliceResolver: async () =>
                        (await import('../../features/sudoku/sudokuSlice')).sudokuSlice,
                }),
                element: (
                    <PageInjector
                        lazyComponent={async () =>
                            (await import('../../features/sudoku/Sudoku')).Sudoku
                        }
                    >
                        <OverlayLoader />
                    </PageInjector>
                ),
            },
        ],
    },
]);

export const Application = memo(() => {
    return <RouterProvider router={rootRouter} fallbackElement={<OverlayLoader />} />;
});
