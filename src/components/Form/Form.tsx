import classNames from 'classnames';
import './_style.scss';
import useStore, { FormState } from './useStore';
import React, { useMemo } from 'react';
import Card from '../Card';
import { ValidateError } from 'async-validator';
import { useImperativeHandle } from 'react';
export type RenderProps = (form: FormState) => React.ReactNode;

interface FormProps {
  name?: string;
  children?: React.ReactNode | RenderProps;
  initialValues?: Record<string, any>;
  onFinish?: (values: Record<string, any>) => void;
  onFinishFailed?: (
    values: Record<string, any>,
    errors: Record<string, ValidateError[]>
  ) => void;
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

export type IFormRef = Omit<
  ReturnType<typeof useStore>,
  'fields' | 'dispatch' | 'form'
>;
const Form = React.forwardRef<IFormRef, FormProps>((props, ref) => {
  const { form, fields, dispatch, ...restFun } = useStore(props.initialValues);

  const { validateForm, validateAllFields } = restFun;

  useImperativeHandle(ref, () => {
    return {
      ...restFun,
    };
  });

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

  /**
   * 表单提交逻辑
   */

  const handleSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
    // 阻止默认事件触发以及阻止冒泡
    e.preventDefault();
    e.stopPropagation();
    const { isValid, errors, values } = await validateAllFields();
    if (isValid && props.onFinish) {
      props.onFinish(values);
    } else if (!isValid && props.onFinishFailed) {
      props.onFinishFailed(values, errors);
    }
  };

  /**
   *  判断 children 的类型 判断渲染
   */
  let childrenNode: React.ReactNode;
  if (typeof props.children === 'function') {
    childrenNode = props.children(form);
  } else {
    childrenNode = props.children;
  }
  return (
    <>
      <form
        className={instantFormClass}
        name={props.name}
        onSubmit={handleSumbit}
        ref={ref}
      >
        <FormContext.Provider value={{ ...passedContext }}>
          {childrenNode}
        </FormContext.Provider>
      </form>

      {/* 用于展示 form - fields 数据内容 */}
      <Card className="" title="表单数据">
        <pre>{JSON.stringify({ form, fields }, null, 2)}</pre>
      </Card>
    </>
  );
});

export default Form;
