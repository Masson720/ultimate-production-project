import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { CommentCard } from './CommentCard';

const meta = {
  title: 'entities/CommentCard',
  component: CommentCard,
  tags: ['autodocs'],
} satisfies Meta<typeof CommentCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        comment: {
            id: '1',
            text: 'hello world!',
            user: { id: '1', username: 'Булькс', }
        }
    },
};

export const Dark: Story = {
    args: {
        comment: {
            id: '1',
            text: 'hello world!',
            user: { id: '1', username: 'Булькс', }
        }
    },
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];

export const Loading: Story = {
    args: {
        comment: {
            id: '1',
            text: 'hello world!',
            user: { id: '1', username: 'Булькс', }
        },
        isLoading: true
    },
};