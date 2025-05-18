import type { Preview } from '@storybook/react'

// 插件功能配置 
const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

  },
};

export default preview;