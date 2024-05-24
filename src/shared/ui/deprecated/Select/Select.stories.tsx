import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';

const meta = {
  title: 'shared/Select',
  component: Select,
  tags: ['autodocs'],
  args: {}
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        label: 'text',
        options: [
            {value: '123', content: '123'},
            {value: '123', content: '123'},
            {value: '123', content: '123'}
        ]
    },
};

