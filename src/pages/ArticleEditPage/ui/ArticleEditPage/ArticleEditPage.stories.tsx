import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/app/providers/ThemeProvider';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import ArticleEditPage from './ArticleEditPage';
import { FeaturesFlagsDecorator } from '@/shared/config/storybook/FeaturesFlagsDecorator/FeaturesFlagsDecorator';

const meta = {
    title: 'pages/ArticleEditPage',
    component: ArticleEditPage,
    tags: ['autodocs'],
    decorators: [StoreDecorator({})]
} satisfies Meta<typeof ArticleEditPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
    args: {

    },
};

export const LightRedesigned: Story = {
    args: {

    },
};
LightRedesigned.decorators = [FeaturesFlagsDecorator({
    isAppRedesigned: true
})]


export const Dark: Story = {
    args: {

    },
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];