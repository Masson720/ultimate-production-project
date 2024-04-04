import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { CommentList } from './CommentList';

const meta = {
  title: 'entities/CommentList',
  component: CommentList,
  tags: ['autodocs'],
} satisfies Meta<typeof CommentList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        comments: [
            {
                id: '1',
                text: 'hello world!',
                user: { id: '1', username: 'Булькс', }
            },
            {
                id: '2',
                text: 'ууу',
                user: { id: '2', username: 'Персик', }
            },
        ]
    },
};

export const NoComments: Story = {
    args: {
        comments: []
    },
};

export const Dark: Story = {
    args: {
        comments: [
            {
                id: '1',
                text: 'hello world!',
                user: { id: '1', username: 'Булькс', }
            },
            {
                id: '2',
                text: 'ууу',
                user: { id: '2', username: 'Персик', }
            },
        ]
    },
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];

export const Loading: Story = {
    args: {
        comments: [
            {
                id: '1',
                text: 'hello world!',
                user: { id: '1', username: 'Булькс', }
            },
            {
                id: '2',
                text: 'ууу',
                user: { id: '2', username: 'Персик', }
            },
        ],
        isLoading: true
    },
};