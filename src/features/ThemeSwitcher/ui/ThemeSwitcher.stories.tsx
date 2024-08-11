import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/app/providers/ThemeProvider';
import { ThemeSwitcher } from './ThemeSwitcher';
import { FeaturesFlagsDecorator } from '@/shared/config/storybook/FeaturesFlagsDecorator/FeaturesFlagsDecorator';

const meta = {
  title: 'widgets/ThemeSwitcher',
  component: ThemeSwitcher,
  tags: ['autodocs'],
} satisfies Meta<typeof ThemeSwitcher>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
    args: {

    },
};

export const Dark: Story = {
    args: {

    },
};
Dark.decorators = [ThemeDecorator(Theme.DARK)]

export const LightRedesigned: Story = {
  args: {

  },
};
LightRedesigned.decorators = [FeaturesFlagsDecorator({isAppRedesigned: true})];

export const DarkRedesigned: Story = {
  args: {

  },
};
DarkRedesigned.decorators = [
  ThemeDecorator(Theme.DARK),
  FeaturesFlagsDecorator({isAppRedesigned: true})
];