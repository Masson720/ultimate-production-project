import type { Meta, StoryObj } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { ArticleRecomendationsList } from './ArticleRecomendationsList';

const meta = {
  title: 'features/ArticleRecomendationsList',
  component: ArticleRecomendationsList,
  tags: ['autodocs'],
} satisfies Meta<typeof ArticleRecomendationsList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        
    },
};

export const Dark: Story = {
    args: {
        
    },
};

Dark.decorators = [ThemeDecorator(Theme.DARK)];

export const Orange: Story = {
    args: {
        
    },
};

Orange.decorators = [ThemeDecorator(Theme.ORANGE)];