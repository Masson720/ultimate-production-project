import type { Meta, StoryObj } from '@storybook/react';
import { ListBox } from './ListBox';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';

const people = [
    { value: 'Durward Reynolds', content: 'Durward Reynolds', disabled: false },
    { value: 'Kenton Towne', content: 'Kenton Towne', disabled: false },
    { value: 'Therese Wunsch', content: 'Therese Wunsch', disabled: false },
    { value: 'Benedict Kessler', content: 'Benedict Kessler', disabled: true },
    { value: 'Katelyn Rohan', content: 'Katelyn Rohan', disabled: false },
]

const meta = {
    title: 'shared/ListBox',
    component: ListBox,
    tags: ['autodocs'],
} satisfies Meta<typeof ListBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        items: people,
        defaultValue: 'bulks',
        direction: 'bottom'
    },
};

export const PrimaryLabel: Story = {
    args: {
        items: people,
        defaultValue: 'bulks',
        direction: 'bottom',
        label: 'Bulks'
    },
};

export const Dark: Story = {
    args: {
        items: people,
        defaultValue: 'bulks',
        direction: 'bottom'
    },
};

Dark.decorators = [ThemeDecorator(Theme.DARK)];

export const Orange: Story = {
    args: {
        items: people,
        defaultValue: 'bulks',
        direction: 'bottom'
    },
};

Orange.decorators = [ThemeDecorator(Theme.ORANGE)];