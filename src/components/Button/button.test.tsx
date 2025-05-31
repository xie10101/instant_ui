// 测试 button组件
// 存在 jsx的语法 ： 测试库提供的 render函数 ： 模拟dom环境
import { fireEvent, render } from '@testing-library/react';
import Button from './Button';

import userEvent from '@testing-library/user-event';
const defaultProps = {
  onClick: jest.fn(),
};
/**
 * 测试 - 大号 Primary类型 className 测试自定义类名 是否存在
 *
 */
const test1Props = {
  type: 'primary',
  className: 'test',
  size: 'large',
};
const disabledProps = {
  disabled: true,
  onClick: jest.fn(),
};

// 测试套件：
// 分类 :
describe('测试 Button 组件', () => {
  it('渲染出默认组件', () => {
    const wrapper = render(<Button {...defaultProps}>测试</Button>);
    const element = wrapper.queryByText('测试') as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element).toBeEnabled();
    expect(element?.tagName).toEqual('BUTTON'); // 标签名判断
    expect(element).toHaveClass('btn btn-default'); // 类名判断
    // 点击事件测试
    /**
     * fireEvent 是一个测试库提供的函数，用于模拟用户在DOM元素上的事件。
     * userEvent 是相似的事件操作库
     */
    fireEvent.click(element as Element); // 模拟点击事件
    expect(defaultProps.onClick).toHaveBeenCalled(); // 点击次数
  });
  /**
   * 实际是根据渲染树进行测试？
   */
  it('根据不同props 渲染出不同类型button ', () => {
    const wrapper = render(<Button {...test1Props}>测试</Button>);
    const element = wrapper.queryByText('测试');
    expect(element).toBeInTheDocument();
    // 主要检查类名是否存在 正确
    expect(element).toHaveClass('btn btn-primary test btn-large');
  });
  it('渲染 link 根据 type和href ', () => {
    const wrapper = render(
      <Button type="link" href="xxx">
        Link
      </Button>
    );
    const element = wrapper.queryByText('Link');
    expect(element).toBeInTheDocument();
    expect(element?.tagName).toEqual('A');
    expect(element).toHaveClass('btn btn-link');
  });
  it('渲染带禁止样式button', () => {
    const wrapper = render(<Button {...disabledProps}>测试</Button>);
    const element = wrapper.queryByText('测试');
    expect(element).toBeInTheDocument();
    // 状态测试 -element.disabled
    expect(element).toBeDisabled();
    expect(element).toHaveClass('btn btn-default');
    userEvent.click(element as Element); // 会自动忽略 disabled 按钮
    expect(disabledProps.onClick).not.toHaveBeenCalled(); // 现在会通过
  });
});

// 测试组件流程 ：
/**
 * 1.渲染组件
 * 2. 传递props - 写props
 * 3.写测试断言：
 *   1. 组件是否渲染
 *   2. 组件是否有默认样式 - 类名
 *   3. 组件是否存在相应类型样式
 *   4. 组件是否可触发事件
 */
