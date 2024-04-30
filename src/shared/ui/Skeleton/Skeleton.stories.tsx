import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/app/providers/ThemeProvider';
import { Skeleton } from './Skeleton';


const meta = {
  title: 'shared/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Primary: Story = {
    args: {
        width: '100%',
        height: 200
    },
};

export const PrimaryDark: Story = {
    args: {
        width: '100%',
        height: 200
    },
};

PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];

export const Circle: Story = {
    args: {
        border: '50%',
        width: 100,
        height: 100
    },
};

export const DarkCircle: Story = {
    args: {
        border: '50%',
        width: 100,
        height: 100
    },
};

DarkCircle.decorators = [ThemeDecorator(Theme.DARK)];