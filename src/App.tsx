import Card from './components/Card';
import { Form, FormItem } from './components/Form';
import Input from './components/Input';
import Schema from 'async-validator';
export default function App() {
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
              message: '请输入用户名',
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
      </Form>
    </div>
  );
}
