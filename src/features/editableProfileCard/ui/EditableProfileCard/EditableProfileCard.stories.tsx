import { Meta, StoryObj } from '@storybook/react';
import { EditableProfileCard } from './EditableProfileCard';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/app/providers/ThemeProvider';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

const meta = {
    title: 'features/EditableProfileCard',
    component: EditableProfileCard,
    tags: ['autodocs'],
    decorators: [StoreDecorator({})]
} satisfies Meta<typeof EditableProfileCard>;

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