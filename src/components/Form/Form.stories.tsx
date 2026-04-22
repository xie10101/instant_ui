import { Meta, StoryObj } from '@storybook/react';
import { Form, FormItem } from './index';
import Input from '../Input';
import Button from '../Button';
import { CoustomRule } from './useStore';

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

const confirmRules: CoustomRule[] = [
  {
    type: 'string',
    required: true,
    min: 3,
    max: 10,
    message: '用户名长度不能小于3且不能大于10',
  },
  // 关键自定义验证规则的设置 -- validator会交给自定义方法自己执行
  ({ getFieldValue }) => ({
    // asyncValidator 参数的含义是固定的
    asyncValidator(rule, value, callback, source, options) {
      console.log(value);
      if (value !== getFieldValue('password')) {
        callback('密码不一致');
      } else {
        callback();
      }
    },
  }),
];
export const Default: Story = {
  args: {},
  render: () => (
    <>
      <Form name="asa">
        <FormItem
          name="username"
          label="用户名"
          rules={[
            {
              required: true,
              message: '请输入用户名',
              min: 3,
              max: 10,
            },
          ]}
        >
          <Input placeholder="请输入用户名" />
        </FormItem>
        <FormItem
          name="password"
          label="密码"
          rules={[
            {
              required: true,
              message: '请输入用户名',
              min: 3,
              max: 10,
            },
          ]}
        >
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
        <FormItem name="againPassword" label="确认密码" rules={confirmRules}>
          <Input type="password" placeholder="请再次输入密码" />
        </FormItem>
        <FormItem name="xx">
          <Button type="primary">登录</Button>
        </FormItem>
      </Form>
    </>
  ),
};
