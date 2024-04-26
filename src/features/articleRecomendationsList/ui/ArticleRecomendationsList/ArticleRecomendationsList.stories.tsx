import type { Meta, StoryObj } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { ArticleRecomendationsList } from './ArticleRecomendationsList';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { Article } from 'entities/Article';
import withMock from 'storybook-addon-mock'

const article: Article = {
    id: '1',
    img: '',
    createdAt: '',
    views: 100500,
    user: {id: '1', username: '123'},
    blocks: [],
    type: [],
    title: '123',
    subtitle: 'wdhwfhwkef'
}

const meta = {
  title: 'features/ArticleRecomendationsList',
  component: ArticleRecomendationsList,
  tags: ['autodocs'],
  decorators: [StoreDecorator({}), withMock],
} satisfies Meta<typeof ArticleRecomendationsList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        
    },
};

Primary.parameters = {
    mockData: [
        {
            url: __API__ + '/articles?_limit=3',
            method: 'GET',
            status: 200,
            response: [
                {...article, id: '1'},
                {...article, id: '2'},
                {...article, id: '3'}
                ],
            },
    ],
}


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