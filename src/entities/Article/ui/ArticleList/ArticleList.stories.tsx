import type { Meta, StoryObj } from '@storybook/react';
import { ArticleList } from './ArticleList';
import { ArticleView } from 'entities/Article/model/consts/articleConsts';

const meta = {
  title: 'entities/ArticleList',
  component: ArticleList,
  tags: ['autodocs'],
} satisfies Meta<typeof ArticleList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        isLoading: false,
        articles: [],
        view: ArticleView.BIG
    },
};


export const isLoadingBig: Story = {
    args: {
        isLoading: true,
        articles: [],
        view: ArticleView.BIG
    },
};

export const isLoadingSmall: Story = {
    args: {
        isLoading: true,
        articles: [],
        view: ArticleView.SMALL
    },
};

