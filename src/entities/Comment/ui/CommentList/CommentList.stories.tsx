import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/app/providers/ThemeProvider';
import { CommentList } from './CommentList';
import { FeaturesFlagsDecorator } from '@/shared/config/storybook/FeaturesFlagsDecorator/FeaturesFlagsDecorator';

const commentsList = [
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

const meta = {
  title: 'entities/CommentList',
  component: CommentList,
  tags: ['autodocs'],
} satisfies Meta<typeof CommentList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        comments: commentsList
    },
};

export const NoComments: Story = {
    args: {
        comments: []
    },
};

export const Dark: Story = {
    args: {
        comments: commentsList
    },
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];

export const Loading: Story = {
    args: {
        comments: commentsList,
        isLoading: true
    },
};

export const PrimaryRedesigned: Story = {
    args: {
        comments: commentsList
    },
};

PrimaryRedesigned.decorators = [
    FeaturesFlagsDecorator({isAppRedesigned: true})
]

export const NoCommentsRedesigned: Story = {
    args: {
        comments: []
    },
};
NoCommentsRedesigned.decorators = [
    FeaturesFlagsDecorator({isAppRedesigned: true})
]

export const DarkRedesigned: Story = {
    args: {
        comments: commentsList
    },
};
DarkRedesigned.decorators = [
    ThemeDecorator(Theme.DARK),
    FeaturesFlagsDecorator({isAppRedesigned: true})
];

export const LoadingRedesigned: Story = {
    args: {
        comments: commentsList,
        isLoading: true
    },
};
LoadingRedesigned.decorators = [
    FeaturesFlagsDecorator({isAppRedesigned: true})
]