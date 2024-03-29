import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { Sidebar } from './Sidebar';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'widget/Sidebar',
  component: Sidebar,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
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
  ThemeDecorator(Theme.DARK), 
  StoreDecorator({
      user: {
          authData: {}
      }
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

export const NoAuth: Story = {
  args: {

  },
};

NoAuth.decorators = [
    StoreDecorator({
        user: {}
    })
]