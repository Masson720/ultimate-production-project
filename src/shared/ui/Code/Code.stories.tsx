import type { Meta, StoryObj } from '@storybook/react';
import { Code } from './Code';

const meta = {
  title: 'shared/Code',
  component: Code,
  tags: ['autodocs'],
} satisfies Meta<typeof Code>;

export default meta;
type Story = StoryObj<typeof meta>;

const text = 'const meta = \{\n'
+  '     title: \'shared/Code/\',\n'
+  '     component: Code,\n'
+  '     tags: [\'autodocs\'],\n'
+  '}\n' 
+  'satisfies Meta<typeof Code>;\n'
+  'export default meta;\n'
+  'type Story = StoryObj<typeof meta>;\n';

export const Primary: Story = {
    args: {
        text
    },
};