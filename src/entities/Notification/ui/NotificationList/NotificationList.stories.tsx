import type { Meta, StoryObj } from '@storybook/react';
import { NotificationList } from './NotificationList';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

const meta = {
  title: 'entities/notification/NotificationList',
  component: NotificationList,
  tags: ['autodocs'],
  args: {}
} satisfies Meta<typeof NotificationList>;


export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        
    },
};

Primary.decorators = [StoreDecorator({

})];
