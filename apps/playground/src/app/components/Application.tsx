import { memo } from 'react';
import { createHashRouter, RouterProvider } from 'react-router-dom';

import { OverlayLoader } from '../../components/OverlayLoader';
import { createInjectorLoader } from './createInjectorLoader';
import { ErrorPage } from './ErrorPage';
import { PageInjector } from './PageInjector';
import { Root } from './Root';

const rootRouter = createHashRouter(
    [
        {
            path: '/',
            element: <Root />,
            errorElement: <ErrorPage />,
            hydrateFallbackElement: <OverlayLoader />,
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
                    hydrateFallbackElement: <OverlayLoader />,
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
                    hydrateFallbackElement: <OverlayLoader />,
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
                    hydrateFallbackElement: <OverlayLoader />,
                },
                {
                    path: 'sun',
                    element: (
                        <PageInjector
                            lazyComponent={async () => (await import('../../features/sun/Sun')).Sun}
                        >
                            <OverlayLoader />
                        </PageInjector>
                    ),
                    hydrateFallbackElement: <OverlayLoader />,
                },
                {
                    path: 'charts',
                    element: (
                        <PageInjector
                            lazyComponent={async () =>
                                (await import('../../features/charts/Charts')).Charts
                            }
                        >
                            <OverlayLoader />
                        </PageInjector>
                    ),
                    hydrateFallbackElement: <OverlayLoader />,
                },
                {
                    path: 'controls',
                    element: (
                        <PageInjector
                            lazyComponent={async () =>
                                (await import('../../features/controls/Controls')).Controls
                            }
                        >
                            <OverlayLoader />
                        </PageInjector>
                    ),
                    hydrateFallbackElement: <OverlayLoader />,
                },
            ],
        },
    ],
    // {
    //     basename: import.meta.env.BASE_URL,
    // },
);

export const Application = memo(() => {
    return <RouterProvider router={rootRouter} />;
});
