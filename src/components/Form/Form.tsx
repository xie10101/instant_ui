/**
 * Form 表单组件封装思路：
 *
 * 1. 核心功能拆分
 *    - Form: 表单容器，负责数据管理、校验、提交
 *    - Form.Item: 表单项包装器，负责字段绑定、错误展示
 *    - 使用 Context 在 Form 和 Form.Item 之间传递数据
 *
 * 2. Props 设计
 *    - initialValues: 初始表单数据对象
 *    - onFinish: 提交成功回调 (values) => void
 *    - onFinishFailed: 提交失败/校验失败回调
 *    - onValuesChange: 字段值变化回调
 *    - form: 外部传入的 form 实例 (类似 Ant Design 的 Form.useForm())
 *    - layout: 布局方式 (horizontal/vertical/inline)
 *    - disabled: 整体禁用
 *
 * 3. 状态管理
 *    - values: 当前表单值 { [name]: value }
 *    - errors: 校验错误 { [name]: string }
 *    - touched: 是否被触碰过 { [name]: boolean }
 *    - isSubmitting: 提交中状态
 *
 * 4. Form.Item 职责
 *    - name: 字段名，用于数据绑定
 *    - label: 标签文本
 *    - rules: 校验规则数组 [{ required: true, message: '必填' }]
 *    - children: 表单控件 (Input, Select 等)
 *    - 通过 cloneElement 给子元素注入 value + onChange
 *
 * 5. 校验机制
 *    - 支持 rules 配置: required, min, max, pattern, validator
 *    - 触发时机: onChange / onBlur / onSubmit
 *    - 错误信息展示在 Form.Item 下方
 *
 * 6. 表单控件约定
 *    - 受控组件标准接口: value + onChange(event|value)
 *    - 支持自定义控件 (只要实现 value/onChange)
 *
 * 7. 高级功能 (可逐步添加)
 *    - 表单联动: 一个字段变化影响其他字段
 *    - 动态增减表单项 (Form.List)
 *    - 嵌套对象/数组字段名 (name="user.name" 或 name={['user', 'name']})
 *    - 异步校验 (debounce)
 *
 * 8. 参考实现
 *    - Ant Design Form 源码
 *    - rc-field-form (AntD 底层表单库)
 *    - React Hook Form (轻量方案)
 */
import classNames from 'classnames';
import './_style.scss';
import useStore from './useStore';
import React from 'react';
/**
 * 
 * (alias) function useStore(): {
    form: FormState;
    fields: FieldState;
    dispatch: React.ActionDispatch<[action: FieldsAction]>;
    setForm: React.Dispatch<React.SetStateAction<FormState>>;
}
 */
interface FormProps {
  name?: string;
  children?: React.ReactNode;
}

/**
 *   Pick <ReturnType<typeof useStore>, 'dispatch'>  // 从 useStore 返回值中提取 dispatch 类型
 *   与之对应的是 - Omit<> 反向提取 -- 排除指定的类型
 *   type Pick<T, K extends keyof T> = { [P in K]: T[P] }
 *   ReturnType<T>：提取函数 T 的返回值类型（内置工具）
 */

// export type FormContext = {
//   name: string;
//   dispatch: React.Dispatch<FieldsAction>
// };
//  dispatch: React.ActionDispatch<[action: FieldsAction]>;

export type tFormContext = Pick<
  ReturnType<typeof useStore>,
  'dispatch' | 'fields' | 'form'
>; //正向提取
export const FormContext = React.createContext<tFormContext>(
  {} as tFormContext
); // 创建上下文
const Form: React.FC<FormProps> = (props) => {
  const { name, children } = props;
  const { form, fields, dispatch } = useStore(); // 使用自定义hook 管理表单状态
  const instantFormClass = classNames('instant-form');

  // 新赋值 - context
  const passedContext: tFormContext = {
    dispatch,
    fields,
    form,
  };

  return (
    <>
      <form className={instantFormClass} name={name}>
        <FormContext.Provider value={passedContext}>
          {children}
        </FormContext.Provider>
      </form>
      {/* <div>{form.isValid ? '表单有效' : '表单无效'}</div> */}
      <div>{JSON.stringify(fields)}</div>
    </>
  );
};

export default Form;
