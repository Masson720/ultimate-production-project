import type { Meta, StoryObj } from '@storybook/react';
import { Tablet } from './Tablet';

const meta = {
  title: 'shared/Tablet',
  component: Tablet,
  tags: ['autodocs'],
} satisfies Meta<typeof Tablet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        message: 'Сообщение для пользователя'
    },
};