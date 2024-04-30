import type { Meta, StoryObj } from '@storybook/react';
import { Theme } from '@/app/providers/ThemeProvider';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { ArticleDetailsPageHeader } from './ArticleDetailsPageHeader';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

const meta = {
  title: 'pages/ArticleDetailsPageHeader',
  component: ArticleDetailsPageHeader,
  tags: ['autodocs'],
  decorators: [StoreDecorator({})]
} satisfies Meta<typeof ArticleDetailsPageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};

export const Dark: Story = {
    args: {},
};

Dark.decorators = [ThemeDecorator(Theme.DARK)];

export const Orange: Story = {
    args: {},
};

Orange.decorators = [ThemeDecorator(Theme.ORANGE)];