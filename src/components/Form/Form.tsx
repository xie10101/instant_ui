import classNames from 'classnames';
import './_style.scss';
import useStore from './useStore';
import React, { useEffect, useMemo } from 'react';
import Card from '../Card';
/**
 * 
 * (alias) function useStore(): {
    form: FormState;
    fields: FieldState;
    dispatch: React.ActionDispatch<[action: FieldsAction]>;
    setForm: React.Dispatch<React.SetStateAction<FormState>>;
}
 */
/**
 *   Pick <ReturnType<typeof useStore>, 'dispatch'>  // 从 useStore 返回值中提取 dispatch 类型
 *   与之对应的是 - Omit<> 反向提取 -- 排除指定的类型
 *   type Pick<T, K extends keyof T> = { [P in K]: T[P] }
 *   ReturnType<T>：提取函数 T 的返回值类型（内置工具）
 */

// dispatch type ：
//   dispatch: React.Dispatch<FieldsAction>
//  dispatch: React.ActionDispatch<[action: FieldsAction]>;

interface FormProps {
  name?: string;
  children?: React.ReactNode;
  initialValues?: Record<string, any>;
}

// 交叉和联合类型应该从对象类型和基本类型不同角度看
export type tFormContext = Pick<
  ReturnType<typeof useStore>,
  'dispatch' | 'fields' | 'form' | 'validateForm'
> &
  Pick<FormProps, 'initialValues'>;

//从顶层Form组件向下传递内容
export const FormContext = React.createContext<tFormContext>(
  {} as tFormContext
);
const Form: React.FC<FormProps> = (props) => {
  const { form, fields, dispatch, validateForm } = useStore();
  const instantFormClass = classNames('instant-form');

  //从顶层Form组件向下传递内容--新Context
  const passedContext: tFormContext = useMemo(
    () => ({
      dispatch,
      fields,
      form,
      initialValues: props.initialValues,
      validateForm,
    }),
    [dispatch, fields, form, props.initialValues, validateForm]
  );

  return (
    <>
      <form className={instantFormClass} name={props.name}>
        <FormContext.Provider value={{ ...passedContext }}>
          {props.children}
        </FormContext.Provider>
      </form>

      {/* 用于展示 form - fields 数据内容 */}
      <Card className="" title="表单数据">
        <pre>{JSON.stringify({ form, fields }, null, 2)}</pre>
      </Card>
    </>
  );
};

export default Form;
