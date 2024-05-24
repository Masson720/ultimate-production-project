import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Tabs } from './Tabs';
const meta = {
  title: 'shared/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  args: {}
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        tabs: [
            {
                value: 'Tab1',
                content: 'Tab1'
            },
            {
                value: 'Tab2',
                content: 'Tab2'
            },
            {
                value: 'Tab3',
                content: 'Tab3'
            },
        ],
        value: 'Tab1',
        onTabClick: action('onTabClick')
    },
};
