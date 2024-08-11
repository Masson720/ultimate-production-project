import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/app/providers/ThemeProvider';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { FeaturesFlagsDecorator } from '@/shared/config/storybook/FeaturesFlagsDecorator/FeaturesFlagsDecorator';
import { ArticlesFilters, ArticlesFiltersProps } from './ArticlesFilters';
import { ArticleSortField, ArticleType } from '@/entities/Article';

const props: ArticlesFiltersProps = {
        search: 'Пауки',
        sort: ArticleSortField.CREATED, 
        order: 'asc', 
        onChangeSearch: () => null, 
        onChangeOrder: () => null, 
        onChangeSort: () => null, 
        onChangeTab: () => null,
        type: ArticleType.ALL
}

const meta = {
  title: 'widgets/ArticlesFilters',
  component: ArticlesFilters,
  tags: ['autodocs'],
} satisfies Meta<typeof ArticlesFilters>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OrangeRedesigned: Story = {
    args: {
        ...props
    }
};
OrangeRedesigned.decorators = [
    ThemeDecorator(Theme.ORANGE), 
    StoreDecorator({}),
    FeaturesFlagsDecorator({isAppRedesigned: true})
];

export const DarkRedesigned: Story = {
    args: {
        ...props
    }
};
DarkRedesigned.decorators = [
    ThemeDecorator(Theme.DARK), 
    StoreDecorator({}),
    FeaturesFlagsDecorator({isAppRedesigned: true})
];

export const LightRedesigned: Story = {
    args: {
        ...props
    }
};
LightRedesigned.decorators = [
    ThemeDecorator(Theme.LIGHT), 
    StoreDecorator({}),
    FeaturesFlagsDecorator({isAppRedesigned: true})
];