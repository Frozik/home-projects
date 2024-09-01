/* eslint-disable budapestian/global-constant-pattern */

import { fn } from '@storybook/test';

import { Button } from './Button';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
    title: 'Example/Button',
    component: Button,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    args: { onClick: fn() },
};

export const Primary = {
    args: {
        primary: true,
        label: 'Button',
    },
};
