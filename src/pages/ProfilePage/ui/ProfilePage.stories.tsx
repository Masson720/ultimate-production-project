import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/app/providers/ThemeProvider';
import ProfilePage from './ProfilePage';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { Currency } from '@/entities/Currency';
import { Country } from '@/entities/Country';
import { FeaturesFlagsDecorator } from '@/shared/config/storybook/FeaturesFlagsDecorator/FeaturesFlagsDecorator';

const profileInfo = {
    form: {
      username: 'admin',
      age: 22,
      country: Country.Ukraine,
      lastname: 'ulbi tv',
      first: 'admin',
      city: 'Moscow',
      currency: Currency.RUB,
    }
}

const meta = {
    title: 'pages/ProfilePage',
    component: ProfilePage,
    tags: ['autodocs'],
} satisfies Meta<typeof ProfilePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
    args: {

    },
};
Light.decorators = [StoreDecorator({
    profile: profileInfo
})]

export const LightRedesigned: Story = {
    args: {

    },
};
LightRedesigned.decorators = [
    StoreDecorator({
        profile: profileInfo
    }),
    FeaturesFlagsDecorator({
        isAppRedesigned: true
    })
]

export const Dark: Story = {
    args: {

    },
};
Dark.decorators = [
    ThemeDecorator(Theme.DARK), 
    StoreDecorator({
        profile: profileInfo
    })
]


export const DarkRedesigned: Story = {
    args: {

    },
};
DarkRedesigned.decorators = [
    ThemeDecorator(Theme.DARK), 
    StoreDecorator({
        profile: profileInfo
    }),
    FeaturesFlagsDecorator({
        isAppRedesigned: true
    })
]