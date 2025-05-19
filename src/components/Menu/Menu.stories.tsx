import Menu from './Menu';
import { Meta, StoryObj } from '@storybook/react';
import MenuItem from './MenuItem';
import SubMenu from './SubMenu';
// Meta 对象用于控制文档story的展示设置   : 元参数 ;

const menuMeta: Meta<typeof Menu> = {
  title: '菜单', // 单个组件文档页 - 标题
  component: Menu, //组件来源
  argTypes: {
    mode: {
      control: 'radio', // 显示为单选按钮
      options: ['horizontal', 'vertical'], // 可选值
      description: '菜单排列方向', // 属性描述
    },
  },
  parameters: {
    docs: {
      description: {
        component: '这是菜单组件',
      },
    },
    layout: 'none', // 组件显示的布局设置
    backgrounds: {
      default: 'light',
      values: [
        { name: '浅色', value: '#ffffff' },
        { name: '深色', value: '#333333' },
        { name: '品牌色', value: 'var(--brand-color)' },
      ],
    },
  },
  tags: ['autodocs'], // 自动生成文档
};

export default menuMeta;

type Story = StoryObj<typeof Menu>;

export const Default: Story = {
  // 实际props参数
  args: {
    mode: 'horizontal',
  },
  render: (args) => {
    // 自定义渲染函数
    return (
      <Menu {...args}>
        <MenuItem>菜单1</MenuItem>
        <MenuItem>菜单2</MenuItem>
        <MenuItem>菜单3</MenuItem>
        <SubMenu title="子菜单">
          <MenuItem>菜单4</MenuItem>
          <MenuItem>菜单5</MenuItem>
        </SubMenu>
      </Menu>
    );
  },
};
export const Vertical: Story = {
  // 实际props参数
  args: {
    mode: 'vertical',
  },
  render: (args) => {
    // 自定义渲染函数
    return (
      <Menu {...args}>
        <MenuItem>菜单1</MenuItem>
        <MenuItem>菜单2</MenuItem>
        <MenuItem>菜单3</MenuItem>
        <SubMenu title="折叠菜单">
          <MenuItem>菜单4</MenuItem>
          <MenuItem>菜单5</MenuItem>
        </SubMenu>
      </Menu>
    );
  },
};
