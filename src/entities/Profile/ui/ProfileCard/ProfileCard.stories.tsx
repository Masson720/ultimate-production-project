import type { Meta, StoryObj } from '@storybook/react';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { ProfileCard } from './ProfileCard';
import AvatarImg from 'shared/assets/tests/storybook_avatar.jpg'; 

const meta = {
  title: 'entities/ProfileCard',
  component: ProfileCard,
  tags: ['autodocs'],
} satisfies Meta<typeof ProfileCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        data: {
            username: 'admin',
            age: 22,
            country: Country.Ukraine,
            lastname: 'ulbi tv',
            first: 'admin',
            city: 'Moscow',
            currency: Currency.RUB,
            avatar: AvatarImg
        }
    },
};


export const WithError: Story = {
    args: {
        error: 'error'
    },
};


export const IsLoading: Story = {
    args: {
        isLoading: true
    },
};
