import type { Meta, StoryObj } from '@storybook/react';
import LoginForm from './LoginForm';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { FeaturesFlagsDecorator } from '@/shared/config/storybook/FeaturesFlagsDecorator/FeaturesFlagsDecorator';

const loginForm = {username: '123', password: 'ddpt'}

const meta = {
  title: 'feature/loginFrom',
  component: LoginForm,
  tags: ['autodocs'],
} satisfies Meta<typeof LoginForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {

    },
};
Primary.decorators = [StoreDecorator({
    loginForm: loginForm
})];

export const WithError: Story = {
  args: {

  },
};
WithError.decorators = [StoreDecorator({
  loginForm: loginForm
})];

export const IsLoading: Story = {
  args: {

  },
};
IsLoading.decorators = [StoreDecorator({
  loginForm: {isLoading: true}
})];

export const PrimaryRedesigned: Story = {
  args: {

  },
};
PrimaryRedesigned.decorators = [StoreDecorator({
  loginForm: loginForm
}),
FeaturesFlagsDecorator({isAppRedesigned: true})
];

export const WithErrorRedesigned: Story = {
args: {

},
};
WithErrorRedesigned.decorators = [StoreDecorator({
    loginForm: loginForm
}),
    FeaturesFlagsDecorator({isAppRedesigned: true})
];

export const IsLoadingRedesigned: Story = {
args: {

},
};
IsLoadingRedesigned.decorators = [StoreDecorator({
  loginForm: {isLoading: true}
}),
  FeaturesFlagsDecorator({isAppRedesigned: true})
];