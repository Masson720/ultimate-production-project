import type { Meta, StoryObj } from '@storybook/react';
import { ListBox } from './ListBox';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/app/providers/ThemeProvider';

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
    decorators: [
        Story => <div style={{padding: 50}}><Story/></div>
    ]
} satisfies Meta<typeof ListBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PrimaryTopLeft: Story = {
    args: {
        items: people,
        defaultValue: 'bulks',
        direction: 'bottom left'
    },
};

export const PrimaryLabelBottomRight: Story = {
    args: {
        items: people,
        defaultValue: 'bulks',
        direction: 'bottom right',
        label: 'Bulks'
    },
};

export const DarkTopLeft: Story = {
    args: {
        items: people,
        defaultValue: 'bulks',
        direction: 'top left'
    },
};

DarkTopLeft.decorators = [ThemeDecorator(Theme.DARK)];

export const OrangeTopRight: Story = {
    args: {
        items: people,
        defaultValue: 'bulks',
        direction: 'top right'
    },
};

OrangeTopRight.decorators = [ThemeDecorator(Theme.ORANGE)];