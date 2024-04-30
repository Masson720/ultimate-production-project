import type { Meta, StoryObj } from '@storybook/react';
import { Theme } from '@/app/providers/ThemeProvider';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { EditableProfileCardHeader } from './EditableProfileCardHeader';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

const meta = {
    title: 'features/EditableProfileCardHeader',
    component: EditableProfileCardHeader,
    tags: ['autodocs'],
    decorators: [StoreDecorator({})]
} satisfies Meta<typeof EditableProfileCardHeader>;

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