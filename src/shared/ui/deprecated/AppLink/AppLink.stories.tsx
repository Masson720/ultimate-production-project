import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/app/providers/ThemeProvider';
import { AppLink, AppLinkTheme } from './AppLink';

const meta = {
  title: 'shared/AppLink',
  component: AppLink,
  tags: ['autodocs'],
  args: {
    to: '/'
  }
} satisfies Meta<typeof AppLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        theme: AppLinkTheme.PRIMARY,
        children: 'text'
    },
};

export const Secondary: Story = {
    args: {
        theme: AppLinkTheme.SECONDARY,
        children: 'text'
    },
};

export const SecondaryDark: Story = {
    args: {
        theme: AppLinkTheme.SECONDARY,
        children: 'text',
    },
};

SecondaryDark.decorators = [ThemeDecorator(Theme.DARK)]