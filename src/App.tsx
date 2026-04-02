import Card from './components/Card';

import Form from './components/Form';
import Input from './components/Input';
import Button from './components/Button';
import { FormItem } from './components/Form/FormItem';
export default function App() {
  return (
    <div>
      {/* <Card title="My Card">
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
      </Card> */}

      <Form name="asa">
        <FormItem name="username" label="用户名">
          <Input placeholder="请输入用户名" />
        </FormItem>
      </Form>
      <Form>
        {/* <FormItem name="password" label="密码">
          <Input type="password" placeholder="请输入密码" />
        </FormItem>
        <FormItem name="checkbox">
          <Input type="checkbox" /> 记住我
        </FormItem>
        <FormItem name="xx">
          <Button type="primary">登录</Button>
        </FormItem> */}
      </Form>
    </div>
  );
}
