import type { Meta, StoryObj } from '@storybook/react';
import { ArticleView } from '../../model/types/article';
import { ArticleViewSelector } from './ArticleViewSelector';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';

const meta = {
  title: 'entities/ArticleViewSelector',
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