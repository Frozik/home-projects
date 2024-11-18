/* eslint-disable budapestian/global-constant-pattern */
/* eslint-disable  import/no-default-export */

import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { RichEditor } from '../components';

export default {
    title: 'RichEditor',
    component: RichEditor,
    parameters: {},
    args: { onValueChanged: fn() },
} as Meta<typeof RichEditor>;

export const Primary: StoryObj<typeof RichEditor> = {
    args: {},
};
