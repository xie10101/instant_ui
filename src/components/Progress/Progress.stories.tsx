import { Meta, StoryObj } from '@storybook/react';
import Progress from './Progress';

// 其中 Meta 作为故事Meta 元类型使用
const ProgressMeta: Meta<typeof Progress> = {
  title: 'Instant进度条',
  component: Progress,
  parameters: {
    docs: {
      description: {
        component: '进度条实例',
      },
    },
    layout: 'centered', // 组件显示的布局设置
  },
  tags: ['autodocs'], // 自动生成文档
};

export default ProgressMeta;

type Story = StoryObj<typeof Progress>; // 设置故事类型

export const Default: Story = {
  args: {
    percent: 50,
    showText: true,
  },
  render: (args) => (
    <div style={{ width: '200px' }}>
      <Progress {...args} />
    </div>
  ),
};

export const DifferentTheme: Story = {
  args: {
    percent: 70,
    showText: true,
    theme: 'danger',
  },
  render: (args) => (
    <div style={{ width: '200px' }}>
      <Progress {...args} />
    </div>
  ),
};

export const offText: Story = {
  args: {
    percent: 30,
    showText: false,
  },
  render: (args) => (
    <div style={{ width: '200px' }}>
      <Progress {...args} />
    </div>
  ),
};
export const heightHuge: Story = {
  args: {
    percent: 80,
    showText: true,
    strokeHeight: 30,
  },
  render: (args) => (
    <div style={{ width: '200px' }}>
      <Progress {...args} />
    </div>
  ),
};
// FontAwesomeIconPr  size 传递一些预设尺寸字符串- ：
/**
 *xs
 * sm
 * lg
 * xl
 * 2x 1x 10x
 */
