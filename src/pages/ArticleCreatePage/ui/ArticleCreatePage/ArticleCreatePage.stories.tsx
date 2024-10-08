import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/app/providers/ThemeProvider';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import ArticleCreatePage from './ArticleCreatePage';

const meta = {
    title: 'pages/ArticleCreatePage',
    component: ArticleCreatePage,
    tags: ['autodocs'],
    decorators: [StoreDecorator({})]
} satisfies Meta<typeof ArticleCreatePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
    args: {

    },
};

export const Dark: Story = {
    args: {

    },
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];