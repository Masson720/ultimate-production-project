import type { Meta, StoryObj } from '@storybook/react';
import { CountrySelect } from '@/entities/Country';
import { FeaturesFlagsDecorator } from '@/shared/config/storybook/FeaturesFlagsDecorator/FeaturesFlagsDecorator';

const meta = {
  title: 'entities/CountrySelect',
  component: CountrySelect,
  tags: ['autodocs'],
} satisfies Meta<typeof CountrySelect>;

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