import type { Meta, StoryObj } from '@storybook/react';
import { CurrencySelect } from './CurrencySelect';
import { FeaturesFlagsDecorator } from '@/shared/config/storybook/FeaturesFlagsDecorator/FeaturesFlagsDecorator';

const meta = {
  title: 'entities/CurrencySelect',
  component: CurrencySelect,
  tags: ['autodocs'],
  args: {}
} satisfies Meta<typeof CurrencySelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
    },
};

export const Readonly: Story = {
  args: {
    readonly: true    
  },
};

export const PrimaryRedesigned: Story = {
  args: {
      
  },
};
PrimaryRedesigned.decorators = [
  FeaturesFlagsDecorator({isAppRedesigned: true})
];

export const ReadonlyRedesigned: Story = {
  args: {
      readonly: true
  },
};
ReadonlyRedesigned.decorators = [
  FeaturesFlagsDecorator({isAppRedesigned: true})    
];
