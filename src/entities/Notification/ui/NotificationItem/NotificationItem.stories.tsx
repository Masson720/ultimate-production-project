import type { Meta, StoryObj } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { NotificationItem } from './NotificationItem';

const meta = {
  title: 'entities/notification/NotificationItem',
  component: NotificationItem,
  tags: ['autodocs'],
  args: {}
} satisfies Meta<typeof NotificationItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        item: {
            id: '1',
            title: 'Text',
            description: 'Text'
        }
    },
};

Primary.decorators = [StoreDecorator({

})];
