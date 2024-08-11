import type { Meta, StoryObj } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { RatingCard } from './RatingCard';
import { FeaturesFlagsDecorator } from '@/shared/config/storybook/FeaturesFlagsDecorator/FeaturesFlagsDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

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

export const Dark: Story = {
  args: {
      
  },
};

Dark.decorators = [StoreDecorator({

}),
ThemeDecorator(Theme.DARK)];

export const PrimaryRedesigned: Story = {
  args: {
      
  },
};

PrimaryRedesigned.decorators = [StoreDecorator({

}),
FeaturesFlagsDecorator({isAppRedesigned: true})
];

export const DarkRedesigned: Story = {
  args: {
      
  },
};

DarkRedesigned.decorators = [StoreDecorator({

}),
FeaturesFlagsDecorator({isAppRedesigned: true}),
ThemeDecorator(Theme.DARK)
];