import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/app/providers/ThemeProvider';
import { Sidebar } from './Sidebar';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { FeaturesFlagsDecorator } from '@/shared/config/storybook/FeaturesFlagsDecorator/FeaturesFlagsDecorator';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'widgets/Sidebar',
  component: Sidebar,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  decorators: [
    StoreDecorator({
        user: {
            authData: {}
        }
    })
  ]
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args


export const Light: Story = {
    args: {

    },
};
Light.decorators = [
  ThemeDecorator(Theme.LIGHT), 
  StoreDecorator({
      user: {
          authData: {}
      }
  })
]

export const LightRedesigned: Story = {
    args: {

    },
};
LightRedesigned.decorators = [
  ThemeDecorator(Theme.LIGHT), 
  FeaturesFlagsDecorator({
    isAppRedesigned: true
  })
]

export const Dark: Story = {
    args: {

    },
};
Dark.decorators = [
    ThemeDecorator(Theme.DARK), 
    StoreDecorator({
        user: {
            authData: {}
        }
    })
]

export const DarkRedesigned: Story = {
    args: {

    },
};
DarkRedesigned.decorators = [
  ThemeDecorator(Theme.LIGHT), 
  FeaturesFlagsDecorator({
    isAppRedesigned: true
  })
]

export const NoAuth: Story = {
  args: {

  },
};

NoAuth.decorators = [
    StoreDecorator({
        user: {}
    })
]

