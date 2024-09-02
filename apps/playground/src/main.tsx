import './main.scss';

import { DIProvider } from '@frozik/components';
import { toContextRef } from '@frozik/utils';
import { ConfigProvider, theme } from 'antd';
import { isNil } from 'lodash-es';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { Application } from './app/components/Application';
import { DynamicStoreManagerProvider } from './app/components/DynamicStoreManager';
import { createStore } from './app/store';

function bootstrap() {
    const container = document.getElementById('root');

    if (isNil(container)) {
        throw new Error(
            "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
        );
    }

    const { store, addSlice, removeSlice, addSaga, removeSaga } = createStore();

    const root = createRoot(container);

    // TODO: https://github.com/rafgraph/spa-github-pages/blob/gh-pages/404.html#L25
    // TODO: https://create-react-app.dev/docs/deployment/#notes-on-client-side-routing
    // TODO: Pendulum doesn't work in Safari

    root.render(
        <StrictMode>
            <Provider store={store}>
                <DIProvider context={toContextRef(store)}>
                    <DynamicStoreManagerProvider
                        value={{ addSlice, removeSlice, addSaga, removeSaga }}
                    >
                        <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
                            <Application />
                        </ConfigProvider>
                    </DynamicStoreManagerProvider>
                </DIProvider>
            </Provider>
        </StrictMode>,
    );
}

bootstrap();
