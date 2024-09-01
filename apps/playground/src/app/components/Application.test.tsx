import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { describe, it } from 'vitest';

import { createStore } from '../store';
import { Application } from './Application';

describe('App', () => {
    it('renders the App component', async () => {
        const { store } = createStore();

        render(
            <Provider store={store}>
                <Application />
            </Provider>,
        );

        await userEvent.click(screen.getByLabelText('menu'));

        await userEvent.click(screen.getByText('Pendulum'));
    });
});
