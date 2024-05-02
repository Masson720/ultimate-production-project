import type { Meta, StoryObj } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { Page } from './Page';

const meta = {
  title: 'widgets/Page',
  component: Page,
  tags: ['autodocs'],
  args: {}
} satisfies Meta<typeof Page>;


export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        children: 'text'
    },
};

Primary.decorators = [StoreDecorator({

})];