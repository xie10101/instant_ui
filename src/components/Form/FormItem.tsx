import classNames from 'classnames';
import './_style.scss';
import { memo } from 'react';
import { FormContext } from './Form';
import { RuleItem } from 'async-validator';
import { CSSTransition } from 'react-transition-group';
import {
  cloneElement,
  Children,
  useContext,
  useEffect,
  ReactElement,
  useRef,
} from 'react';

interface FormItemProps {
  label?: string;
  children?: React.ReactNode;
  name: string;
  valuePropName?: string;
  trigger?: string;
  getValueFormEvent?: (e: any) => any;
  rules?: RuleItem[];
}
const FormItem: React.FC<FormItemProps> = ({
  name,
  label,
  children,
  valuePropName = 'value',
  trigger = 'onChange',
  rules,
  getValueFormEvent = (e: any) => e.target.value,
}: FormItemProps) => {
  const { dispatch, fields, initialValues, validateForm } =
    useContext(FormContext);

  const instantFormItemClass = classNames('instant-form-item', {
    'instant-from-item-label': !label,
  });

  //样式变量
  const instantFormItemLabelClass = classNames('instant-form-item-label', {
    'form-label-colon': label && !label.endsWith(':') && !label.endsWith('：'),
    'form-label-required': rules && rules.some((rule) => rule.required),
  });

  const instantFormItemControlClass = classNames({
    'instant-form-item-control': fields[name]?.errors?.length,
  });

  //测试
  useEffect(() => {
    const value = initialValues && initialValues[name]; // 计算键值 -- 提取动态变量的属性
    dispatch({
      type: 'addfield',
      name: name,
      actionValue: {
        name: name,
        label: label as string,
        value: value,
        isValid: true,
        rules: rules,
      },
    });
  }, [initialValues]);

  // cloneElement(Children.toArray(children)[0] as JSXElementConstructor<any>);

  /**
   *
   * @param e
   * onchange
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
  //  校验处理 ：
  const handleBlur = () => {
    if (!rules) return;
    validateForm(name);
  };

  //直接获取 store 中 value

  /**
   * 是否存在渲染问题
   */
  const fieldState = fields[name];
  const value = fieldState?.value;

  // 将clone 后的组件的props 进行创建 ：
  //  对象的属性类型签名
  const controlProps: Record<string, any> = {
    [valuePropName]: value,
    [trigger]: handleChange,
    // 添加 -- onBlur校验处理
    onBlur: handleBlur,
  };

  const handleCreate = () => {
    //  对 Children 设置验证

    if (Children.count(children) > 1) {
      console.error('FormItem 的 children 只能是单个组件');
    }
    if (Children.count(children) === 0) {
      console.error('FormItem 的 children 不能为空');
    }
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
        }}
      >
        <div className={instantFormItemControlClass}>{handleCreate()}</div>
        {/*  可选 ? 运算符的处理 - 没法排除对未定义的类型判断的原因 ？  */}
        <CSSTransition
          nodeRef={ref}
          in={fieldState?.errors && fieldState.errors.length > 0}
          timeout={300}
          classNames="zoom-in-top"
          appear
        >
          <>
            {fieldState?.errors && fieldState.errors.length > 0 && (
              <p className="form-item-validate-feedback">
                {fieldState?.isValid ? '' : fieldState?.errors[0].message}
              </p>
            )}
          </>
        </CSSTransition>
      </div>
    </div>
  );
};

export default memo(FormItem);

/**
 * const FormItem: React.FC<FormItemProps> = ({
  label,
  children,
}: FormItemProps) => {
 */

/**
 *  针对 表单组件的处理存在差别 -- 需要了解一般的使用方式 -- 一般不会对FormItem内部组件进行绑定 -- 直接由Form表单 - 组件处理全部 ;
 */
/***
 * 6  -  处理思路
 * 1. 关键方法 - React.cloneElement --获取Children第一个元素 --
 *   克隆后为其设置自定义的Props- （视频当前仅是写死的- input处理），
 *   onChange 回调中执行 dispatch 调用完成fileds修改、
 */
