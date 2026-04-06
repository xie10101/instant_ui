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
interface FormProps {
  name?: string;
  children?: React.ReactNode;
  initialValues?: Record<string, any>;
}

/**
 *   Pick <ReturnType<typeof useStore>, 'dispatch'>  // 从 useStore 返回值中提取 dispatch 类型
 *   与之对应的是 - Omit<> 反向提取 -- 排除指定的类型
 *   type Pick<T, K extends keyof T> = { [P in K]: T[P] }
 *   ReturnType<T>：提取函数 T 的返回值类型（内置工具）
 */

// dispatch type ：
//   dispatch: React.Dispatch<FieldsAction>
//  dispatch: React.ActionDispatch<[action: FieldsAction]>;

export type tFormContext = Pick<
  ReturnType<typeof useStore>,
  'dispatch' | 'fields' | 'form' | 'validateForm'
> &
  Pick<FormProps, 'initialValues'>;

export const FormContext = React.createContext<tFormContext>(
  {} as tFormContext
  // undefined
); // 创建上下文
const Form: React.FC<FormProps> = (props) => {
  const { form, fields, dispatch, validateForm } = useStore(); // 使用自定义hook 管理表单状态
  const instantFormClass = classNames('instant-form');
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
        <FormContext.Provider value={passedContext}>
          {props.children}
        </FormContext.Provider>
      </form>

      <Card className="" title="表单数据">
        {JSON.stringify(
          Array.from(Object.values(fields)).map((item) => {
            return item;
          })
        )}
      </Card>
    </>
  );
};

export default Form;
