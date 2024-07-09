import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/app/providers/ThemeProvider';
import { CommentCard } from './CommentCard';
import { FeaturesFlagsDecorator } from '@/shared/config/storybook/FeaturesFlagsDecorator/FeaturesFlagsDecorator';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

const meta = {
  title: 'entities/CommentCard',
  component: CommentCard,
  tags: ['autodocs'],
} satisfies Meta<typeof CommentCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const normalArgs = {
    comment: {
        id: '1',
        text: 'hello world!',
        user: { id: '1', username: 'Булькс', }
    }
}

export const Primary: Story = {
    args: normalArgs,
};

export const PrimaryRedesigned: Story = {
    args: normalArgs,
};

PrimaryRedesigned.decorators = [NewDesignDecorator]

export const Dark: Story = {
    args: normalArgs,
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