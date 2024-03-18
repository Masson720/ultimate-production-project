import type { Meta, StoryObj } from '@storybook/react';
import { Button, ButtonSize, ThemeButton } from './Button';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'shared/Button',
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
        theme: ThemeButton.CLEAR
    },
};

export const ClearInverted: Story = {
    args: {
        children: 'text',
        theme: ThemeButton.CLEAR_INVERTED
    },
};

export const OutlineSizeM: Story = {
    args: {
        children: 'text',
        theme: ThemeButton.OUTLINE,
        size: ButtonSize.M
    },
};

export const OutlineSizeL: Story = {
    args: {
        children: 'text',
        theme: ThemeButton.OUTLINE,
        size: ButtonSize.L
    },
};

export const OutlineSizeXL: Story = {
    args: {
        children: 'text',
        theme: ThemeButton.OUTLINE,
        size: ButtonSize.XL
    },
};

export const OutlineDark: Story = {
    args: {
        children: 'text',
        theme: ThemeButton.OUTLINE
    },
};
OutlineDark.decorators = [ThemeDecorator(Theme.DARK)];

export const BackgroundTheme: Story = {
    args: {
        children: 'text',
        theme: ThemeButton.BACKGROUND
    },
};

export const BackgroundInvertedTheme: Story = {
    args: {
        children: 'text',
        theme: ThemeButton.BACKGROUND_INVERTED
    },
};

export const SquareSizeM: Story = {
    args: {
        children: '>',
        theme: ThemeButton.BACKGROUND,
        square: true,
        size: ButtonSize.M
    },
};

export const SquareSizeL: Story = {
    args: {
        children: '>',
        theme: ThemeButton.BACKGROUND,
        square: true,
        size: ButtonSize.L
    },
};

export const SquareSizeXL: Story = {
    args: {
        children: '>',
        theme: ThemeButton.BACKGROUND,
        square: true,
        size: ButtonSize.XL
    },
};

export const Disabled: Story = {
    args: {
        children: '>', 
        theme: ThemeButton.OUTLINE,
        disabled: true
    },
};