import { Meta, StoryObj } from '@storybook/react';
import { Form, FormItem } from './index';
import Input from '../Input';
import Button from '../Button';

const FormMeta: Meta<typeof Form> = {
  title: 'Instant表单',
  component: Form,
  parameters: {
    docs: {
      description: {
        component: '这是表单组件',
      },
    },
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default FormMeta;

type Story = StoryObj<typeof Form>; // 设置故事类型

export const Default: Story = {
  args: {},
  render: () => (
    <>
      <Form name="asa">
        <FormItem name="username" label="用户名">
          <Input placeholder="请输入用户名" />
        </FormItem>
      </Form>
      <Form>
        <FormItem name="password" label="密码">
          <Input type="password" placeholder="请输入密码" />
        </FormItem>
        <FormItem
          name="radio"
          label="记住我"
          valuePropName="value"
          trigger="onChange"
          getValueFormEvent={(e) => e.target.checked}
        >
          <Input type="radio" />
        </FormItem>
        <FormItem
          name="checkbox"
          label="记住我"
          valuePropName="checked"
          trigger="onChange"
          getValueFormEvent={(e) => e.target.checked}
        >
          <Input type="checkbox" />
        </FormItem>
        <FormItem name="xx">
          <Button type="primary">登录</Button>
        </FormItem>
      </Form>
    </>
  ),
};
