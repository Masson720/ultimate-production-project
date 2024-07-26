import type { Meta, StoryObj } from '@storybook/react';
import { Button, ButtonSize, ButtonVariant } from './Button';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/app/providers/ThemeProvider';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'shared/ButtonRedesigned',
  component: Button,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
    args: {
        children: 'text',
    },
};

export const Clear: Story = {
    args: {
        children: 'text',
        variant: 'clear'
    },
};


export const OutlineSizeM: Story = {
    args: {
        children: 'text',
        variant: 'outline',
        size: 'size_m'
    },
};

export const OutlineSizeL: Story = {
    args: {
        children: 'text',
        variant: 'outline',
        size: 'size_l'
    },
};

export const OutlineSizeXL: Story = {
    args: {
        children: 'text',
        variant: 'outline',
        size: 'size_xl'
    },
};

export const OutlineDark: Story = {
    args: {
        children: 'text',
        variant: 'outline'
    },
};
OutlineDark.decorators = [ThemeDecorator(Theme.DARK)];


export const SquareSizeM: Story = {
    args: {
        children: '>',
        variant: 'outline',
        square: true,
        size: 'size_m'
    },
};

export const SquareSizeL: Story = {
    args: {
        children: '>',
        variant: 'outline',
        square: true,
        size: 'size_l'
    },
};

export const SquareSizeXL: Story = {
    args: {
        children: '>',
        variant: 'outline',
        square: true,
        size: 'size_xl'
    },
};

export const Disabled: Story = {
    args: {
        children: '>', 
        variant: 'outline',
        disabled: true
    },
};