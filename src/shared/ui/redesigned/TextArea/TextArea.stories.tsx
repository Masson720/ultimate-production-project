import type { Meta, StoryObj } from '@storybook/react';
import { TextArea } from './TextArea';

const meta = {
  title: 'shared/TextArea',
  component: TextArea,
  tags: ['autodocs'],
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        placeholder: 'Введите текст',
        value: '',
        rows: 10,
        cols: 45
    },
};