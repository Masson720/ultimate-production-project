import type { Meta, StoryObj } from '@storybook/react';
import { Text, TextTheme } from './Text';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';

const meta = {
  title: 'shared/Text',
  component: Text,
  tags: ['autodocs'],
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        title: 'text',
        text: 'Description'
    },
};

export const OnliTitle: Story = {
    args: {
        title: 'text'
    },
};

export const OnliText: Story = {
    args: {
        text: 'Description'
    },
};

export const PrimaryDark: Story = {
    args: {
        title: 'text',
        text: 'Description'
    },
};

PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];

export const OnliTitleDark: Story = {
    args: {
        title: 'text'
    },
};

OnliTitleDark.decorators = [ThemeDecorator(Theme.DARK)];

export const OnliTextDark: Story = {
    args: {
        text: 'Description'
    },
};
OnliTextDark.decorators = [ThemeDecorator(Theme.DARK)];

export const Error: Story = {
    args: {
        title: 'Error',
        text: 'Description',
        theme: TextTheme.ERROR
    },
};