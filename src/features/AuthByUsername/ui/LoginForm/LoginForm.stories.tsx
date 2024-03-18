import type { Meta, StoryObj } from '@storybook/react';
import { LoginForm } from './LoginForm';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';

const meta = {
  title: 'feature/loginFrom',
  component: LoginForm,
  tags: ['autodocs'],
} satisfies Meta<typeof LoginForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        placeholder: 'text',
        value: '12345',
    },
};
Primary.decorators = [StoreDecorator({
    loginForm: {username: '123', password: 'ddpt'}
})];

export const WithError: Story = {
  args: {
      placeholder: 'text',
      value: '12345',
  },
};
WithError.decorators = [StoreDecorator({
  loginForm: {username: '123', password: 'ddpt', error: 'error'}
})];

export const IsLoading: Story = {
  args: {
      placeholder: 'text',
      value: '12345',
  },
};
IsLoading.decorators = [StoreDecorator({
  loginForm: {isLoading: true}
})];