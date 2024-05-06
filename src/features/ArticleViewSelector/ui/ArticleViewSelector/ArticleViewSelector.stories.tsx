import type { Meta, StoryObj } from '@storybook/react';
import { ArticleViewSelector } from './ArticleViewSelector';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/app/providers/ThemeProvider';
import { ArticleView } from '@/entities/Article/model/consts/articleConsts';

const meta = {
  title: 'entities/Article/ArticleViewSelector',
  component: ArticleViewSelector,
  tags: ['autodocs'],
} satisfies Meta<typeof ArticleViewSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        view: ArticleView.BIG
    },
};

export const Dark: Story = {
    args: {
        view: ArticleView.BIG
    },
};

Dark.decorators = [ThemeDecorator(Theme.DARK)];