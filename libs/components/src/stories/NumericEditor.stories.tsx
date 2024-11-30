/* eslint-disable budapestian/global-constant-pattern */
/* eslint-disable  import/no-default-export */

import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { NumericEditor } from '../components';

export default {
    title: 'NumericEditor',
    component: NumericEditor,
    parameters: {},
    args: {
        decimal: 6,
        pipStart: 3,
        pipSize: 2,
        onValueChanged: fn(),
    },
} as Meta<typeof NumericEditor>;

export const Primary: StoryObj<typeof NumericEditor> = {
    args: {},
};
