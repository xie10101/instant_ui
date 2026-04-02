import classNames from 'classnames';
import './_style.scss';
import { FormContext } from './Form';
import {
  cloneElement,
  Children,
  useContext,
  useEffect,
  useState,
  ReactElement,
} from 'react';

interface FormItemProps {
  label?: string;
  children?: React.ReactNode;
  name: string;
}
const FormItem: React.FC<FormItemProps> = ({
  name,
  label,
  children,
}: FormItemProps) => {
  const { dispatch } = useContext(FormContext);
  const [Inputvalue, setInputvalue] = useState('');
  const instantFormItemClass = classNames('instant-form-item', {
    'instant-from-item-label': !label,
  });

  const instantFormItemLabelClass = classNames('instant-form-item-label', {
    'form-label-colon': label && !label.endsWith(':') && !label.endsWith('：'),
  });

  useEffect(() => {
    // 传递的是action - 参数值

    dispatch({
      type: 'addfield',
      name: 'username',
      value: 'xie',
    });
  }, []);

  // cloneElement(Children.toArray(children)[0] as JSXElementConstructor<any>);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputvalue(e.target.value);
    console.log(e.target.value);
    dispatch({
      type: 'updatefield',
      name: name,
      value: e.target.value,
    });
  };

  // 将clone 后的组件的props 进行创建 ：
  //  对象的属性类型签名
  const controlProps: Record<string, any> = {
    value: Inputvalue,
    onChange: handleChange,
  };

  const handle = () => {
    const child = Children.toArray(children)[0] as ReactElement<any>;
    return cloneElement(child, {
      ...child.props,
      ...controlProps,
    });
  };

  return (
    <div className={instantFormItemClass}>
      <span className={instantFormItemLabelClass}>{label}</span>
      <div className="instant-form-item-control">{handle()}</div>
    </div>
  );
};

export { FormItem };

/**
 * const FormItem: React.FC<FormItemProps> = ({
  label,
  children,
}: FormItemProps) => {
 */

/**
 *
 *  针对 表单组件的处理存在差别 -- 需要了解一般的使用方式 -- 一般不会对FormItem内部组件进行绑定 -- 直接由Form表单 - 组件处理全部 ;
 *
 */

/***
 *
 * 6  -  处理思路
 *
 * 1. 关键方法 - React.cloneElement --获取Children第一个元素 --
 *   克隆后为其设置自定义的Props- （视频当前仅是写死的- input处理），
 *   onChange 回调中执行 dispatch 调用完成fileds修改、
 */
