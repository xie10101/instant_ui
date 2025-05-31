// 设置 测试 项 ：
import Input from './Input';
import { InputProps } from './Input';
import { render } from '@testing-library/react';

const defaultProps: InputProps = {
  placeholder: 'test-input',
  size: 'large',
  disabled: false,
};

// 单独创建Input组件创建函数 ：
const createInput = (defaultProps: InputProps) => {
  return <Input {...defaultProps} />;
};

describe('Input 组件测试', () => {
  it('测试 Input 组件', () => {
    const wrapper = render(createInput(defaultProps)); // 渲染组件
    const inputElement = wrapper.getByPlaceholderText('test-input'); // 获取组件元素
    expect(inputElement).toBeInTheDocument();
  });
});
