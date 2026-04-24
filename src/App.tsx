import Card from './components/Card';
import { Form, FormItem } from './components/Form';
import Input from './components/Input';
import { CoustomRule } from './components/Form/useStore';
import { useRef } from 'react';
import { IFormRef } from './components/Form/Form';
export default function App() {
  const confirmRules: CoustomRule[] = [
    {
      type: 'string',
      required: true,
      min: 3,
      max: 10,
      message: '密码长度不能小于3且不能大于10',
    },
    // 关键自定义验证规则的设置 -- validator会交给自定义方法自己执行
    ({ getFieldValue }) => ({
      // asyncValidator 参数的含义是固定的
      asyncValidator(rule, value, callback, source, options) {
        if (value !== getFieldValue('password')) {
          callback('密码不一致');
        } else {
          callback();
        }
      },
    }),
  ];

  const handleFinish = () => {
    console.log('handleFinish');
  };

  //  补充 对 reset/set/get 方法使用的回调
  const ref = useRef<IFormRef>(null);
  const resetAll = () => {
    console.log(ref.current && ref.current.resetFields());
  };

  return (
    <div>
      <Card title="My Card">
        <Card.Content>
          <p>
            This is the content of the card.
            <span>This is a span element.</span>
            <strong>This is a strong element.</strong>
            <em>This is an em element.</em>
            <a href="#">This is a link.</a>s
          </p>
        </Card.Content>
        <Card.Footer>
          footer
          <a href="#">Link 1</a>
          <a href="#">Link 2</a>
        </Card.Footer>
      </Card>

      <Form
        name="asa"
        initialValues={{
          username: '123123',
          password: '123132',
          checkbox: true,
        }}
        onFinish={handleFinish}
        ref={ref}
      >
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
              message: '密码长度不能小于3且不能大于10',
              min: 3,
              max: 10,
            },
          ]}
        >
          <Input type="password" placeholder="请输入密码" />
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
        {/*  添加确认密码的操作 */}
        <FormItem name="confirmPassword" label="确认密码" rules={confirmRules}>
          <Input type="password" placeholder="请输入确认密码" />
        </FormItem>
        <FormItem name="submit">
          <button type="submit">登录</button>
        </FormItem>
        <FormItem name="reset">
          <button type="button" onClick={resetAll}>
            重置
          </button>
        </FormItem>
      </Form>
    </div>
  );
}
