import type { Meta, StoryObj } from '@storybook/react';
import { Theme } from '@/app/providers/ThemeProvider';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { ArticleDetailsComments } from './ArticleDetailsComments';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

const meta = {
  title: 'pages/ArticleDetailsPage/ArticleDetailsComments',
  component: ArticleDetailsComments,
  tags: ['autodocs'],
  decorators: [StoreDecorator({})]
} satisfies Meta<typeof ArticleDetailsComments>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        id: '1'
    },
};

export const Dark: Story = {
    args: {
        id: '1'
    },
};

Dark.decorators = [ThemeDecorator(Theme.DARK)];

export const Orange: Story = {
    args: {
        id: '1'
    },
};

Orange.decorators = [ThemeDecorator(Theme.ORANGE)];