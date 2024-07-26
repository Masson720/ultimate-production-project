import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Modal } from './Modal';
import { Theme } from '@/app/providers/ThemeProvider';


// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'shared/ModalRedesigned',
  component: Modal,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
const modalText = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem voluptate eligendi quis necessitatibus rerum? Optio neque expedita sed vitae corrupti laudantium quasi aspernatur quam, in dolore laborum illum possimus ab.Reiciendis labore corporis repellendus, nisi odit fugiat consectetur odio rerum nam delectus impedit dolor nostrum eveniet deleniti doloribus eaque repellat blanditiis dolorum modi ipsam natus voluptas quibusdam doloremque. Unde, porro.'

export const Primary: Story = {
    args: {
        isOpen: true,
        children: modalText
    },
};

Primary.decorators = [ThemeDecorator(Theme.LIGHT)];

export const Dark: Story = {
    args: {
        isOpen: true,
        children: modalText
    },
};

Dark.decorators = [ThemeDecorator(Theme.DARK)];