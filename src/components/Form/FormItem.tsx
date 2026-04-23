import classNames from 'classnames';
import './_style.scss';
import { memo } from 'react';
import { FormContext } from './Form';
import { CoustomRule } from './useStore';
import {
  cloneElement,
  Children,
  useContext,
  useEffect,
  ReactElement,
  useRef,
} from 'react';
import { ValidateError } from 'async-validator';

interface FormItemProps {
  label?: string;
  children?: React.ReactNode;
  name: string;
  valuePropName?: string;
  trigger?: string;
  getValueFormEvent?: (e: any) => any;
  rules?: CoustomRule[];
  errors: ValidateError[];
}
const FormItem: React.FC<FormItemProps> = ({
  name,
  label,
  children,
  valuePropName = 'value',
  trigger = 'onChange',
  rules = [],
  getValueFormEvent = (e: any) => e.target.value,
}: FormItemProps) => {
  const { dispatch, fields, initialValues, validateForm } =
    useContext(FormContext);

  const instantFormItemClass = classNames('instant-form-item', {
    'instant-from-item-label': !label,
  });
  const instantFormItemLabelClass = classNames('instant-form-item-label', {
    'form-label-colon': label && !label.endsWith(':') && !label.endsWith(':'),
    'form-label-required':
      rules &&
      rules.some((rule) => typeof rule !== 'function' && rule.required),
  });
  const instantFormItemControlClass = classNames({
    'instant-form-item-control': fields[name]?.errors?.length,
  });
  // 内部控件的样式设置尝试

  /**
  /组件挂载时补充表单字段
  */
  useEffect(() => {
    const value = initialValues && initialValues[name];
    dispatch({
      type: 'addfield',
      name: name,
      actionValue: {
        name: name,
        label: label as string,
        value: value,
        isValid: true,
        rules,
      },
    });
  }, [initialValues, dispatch, name, label]);

  /**
   *  动态修改回调
   */
  const handleChange = (e: any) => {
    dispatch({
      type: 'updatefield',
      name: name,
      actionValue: {
        name: name,
        value: getValueFormEvent(e),
      },
    });
  };

  /**
   * 表单项value校验
   */
  const handleBlur = () => {
    if (!rules) return;
    validateForm(name);
  };

  const fieldState = fields[name];
  const value = fieldState?.value;
  /**
   * 自定义表单控件props对象
   */
  const controlProps: Record<string, any> = {
    [valuePropName]: value,
    [trigger]: handleChange,
    // 添加 -- onBlur校验处理
    onBlur: handleBlur,
    className: instantFormItemControlClass,
  };

  /**
   * 创建表单控件 -- 自定义props+数量判断
   */
  const handleCreate = () => {
    //保证是的那个子组件对象
    if (Children.count(children) > 1) {
      console.error('FormItem 的 children 只能是单个组件');
    }
    if (Children.count(children) === 0) {
      console.error('FormItem 的 children 不能为空');
    }
    //
    const child = Children.toArray(children)[0] as ReactElement<any>;
    return cloneElement(child, {
      ...child.props,
      ...controlProps,
    });
  };

  const ref = useRef<HTMLElement>(null);
  return (
    <div className={instantFormItemClass}>
      <span className={instantFormItemLabelClass}>{label}</span>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          transition: 'all 0.3s',
          position: 'relative',
          height: '100%',
          flex: 1,
        }}
      >
        {handleCreate()}
        {/*  可选 ? 运算符的处理 - 没法排除对未定义的类型判断的原因 ？  */}
        <>
          {fieldState?.errors && fieldState.errors.length > 0 && (
            <p className="form-item-validate-feedback">
              {fieldState?.isValid ? '' : fieldState?.errors[0].message}
            </p>
          )}
        </>
      </div>
    </div>
  );
};
// 缓存该组件
export default memo(FormItem);
