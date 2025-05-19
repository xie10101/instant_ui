import Button, { ButtonSize, ButtonType } from './Button';

import { Meta, StoryObj } from '@storybook/react';

// Meta 对象用于控制文档story的展示设置   : 元参数 ;

const buttonMeta: Meta<typeof Button> = {
  title: '按钮', // 单个组件文档页 - 标题
  component: Button, //组件来源
  argTypes: {
    size: {
      options: ['large', 'small'], //底层组件参数选项
      control: { type: 'radio' },
    },
  },
  parameters: {
    docs: {
      description: {
        component: '这是按钮组件',
      },
    },
    layout: 'centered', // 组件显示的布局设置
    backgrounds: {
      default: 'light',
      values: [{ name: '宏', value: '#f00' }],
    },
  },
  tags: ['autodocs'], // 自动生成文档
};

export default buttonMeta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    size: ButtonSize.Large,
    type: ButtonType.Primary,
    children: 'Primary',
  },
};

export const Danger: Story = {
  args: {
    size: ButtonSize.Large,
    type: ButtonType.Danger,
    children: 'Danger',
  },
};

export const Link: Story = {
  args: {
    size: ButtonSize.Large,
    type: ButtonType.Link,
    children: 'Link',
  },
};
