import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/app/providers/ThemeProvider';
import { Navbar } from './Navbar';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { FeaturesFlagsDecorator } from '@/shared/config/storybook/FeaturesFlagsDecorator/FeaturesFlagsDecorator';

const meta = {
  title: 'widgets/Navbar',
  component: Navbar,
  tags: ['autodocs'],
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
    args: {

    },
};
Light.decorators = [ThemeDecorator(Theme.LIGHT), StoreDecorator({})];

export const LightRedesigned: Story = {
  args: {

  },
};
LightRedesigned.decorators = [
  ThemeDecorator(Theme.LIGHT), 
  StoreDecorator({}),
  FeaturesFlagsDecorator({
    isAppRedesigned: true
  })
];


FeaturesFlagsDecorator({
  isAppRedesigned: true
})

export const Dark: Story = {
    args: {

    },
};
Dark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({}) ];

export const DarkRedesigned: Story = {
  args: {

  },
};
DarkRedesigned.decorators = [
  ThemeDecorator(Theme.DARK), 
  StoreDecorator({}),
  FeaturesFlagsDecorator({
    isAppRedesigned: true
  })
];

export const AuthNavbar: Story = {
  args: {

  },
};
AuthNavbar.decorators = [StoreDecorator({
  user: {
    authData: {}
  }
})];

export const AuthNavbarRedesigned: Story = {
  args: {

  },
};
AuthNavbarRedesigned.decorators = [StoreDecorator({
  user: {
    authData: {}
  }
  }),
  FeaturesFlagsDecorator({
    isAppRedesigned: true
  })
];