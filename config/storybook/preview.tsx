import type { Preview } from "@storybook/react";
import { StyleDecorator } from '../../src/shared/config/storybook/StyleDecorator/StyleDecorator';
import { ThemeDecorator } from '../../src/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { RouterDecorator } from '../../src/shared/config/storybook/RouterDecorator/RouterDecorator';
import { SuspenseDecorator} from '../../src/shared/config/storybook/SuspenseDecorator/SuspenseDecorator';
import {Theme} from '../../src/app/providers/ThemeProvider/index';

const preview: Preview = {
  decorators: [
      StyleDecorator,
      ThemeDecorator(Theme.LIGHT),
      RouterDecorator,
      SuspenseDecorator
  ],
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;


