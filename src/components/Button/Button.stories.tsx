import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = { title: 'Components/Button', component: Button };
export default meta;

export const Primary: StoryObj<typeof Button> = { args: { label: 'Primary', variant: 'primary' } };
export const Secondary: StoryObj<typeof Button> = { args: { label: 'Secondary', variant: 'secondary' } };