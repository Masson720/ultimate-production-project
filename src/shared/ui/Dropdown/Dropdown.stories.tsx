import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { Dropdown } from './Dropdown';
import { Button } from '../Button/Button';

const items = [
    { value: 'first', content: 'first', disabled: false },
    { value: 'second', content: 'second', disabled: false },
    { value: 'thrid', content: 'thrid', disabled: false },
]

const meta = {
    title: 'shared/Dropdown',
    component: Dropdown,
    tags: ['autodocs'],
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        trigger: <Button>Open!</Button>,
        items: items
    },
};

export const PrimaryBottomLeft: Story = {
    args: {
        trigger: <Button>Open!</Button>,
        items: items,
        direction: 'bottom left'
    },
};

export const PrimaryBottomRight: Story = {
    args: {
        trigger: <Button>Open!</Button>,
        items: items,
        direction: 'bottom right'
    },
};



