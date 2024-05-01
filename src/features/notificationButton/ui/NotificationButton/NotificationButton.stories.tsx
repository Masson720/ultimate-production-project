import type { Meta, StoryObj } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { NotificationButton } from './NotificationButton';

const meta = {
  title: 'features/NotificationButton',
  component: NotificationButton,
  tags: ['autodocs'],
  args: {}
} satisfies Meta<typeof NotificationButton>;


export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        
    },
};

Primary.decorators = [StoreDecorator({

})];