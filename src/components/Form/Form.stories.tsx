import { Meta, StoryObj } from '@storybook/react';
import { FormItem } from './FormItem';
import Form from './Form';
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
  args: {
    children: (
      <>
        <Form>
          <FormItem label="用户名">
            <Input placeholder="请输入用户名" />
          </FormItem>
        </Form>
        <Form>
          <FormItem label="密码">
            <Input type="password" placeholder="请输入密码" />
          </FormItem>
          <FormItem>
            <Button type="primary">登录</Button>
          </FormItem>
        </Form>
      </>
    ),
  },
};
