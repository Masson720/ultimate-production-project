import type { Meta, StoryObj } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { RatingCard } from './RatingCard';

const meta = {
  title: 'entities/Rating/RatingCard',
  component: RatingCard,
  tags: ['autodocs'],
  args: {}
} satisfies Meta<typeof RatingCard>;


export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        
    },
};

Primary.decorators = [StoreDecorator({

})];