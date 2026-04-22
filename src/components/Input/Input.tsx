import { forwardRef } from 'react';
import classNames from 'classnames';
import './_style.scss';
import Icon from './../Icon/Icon';
import { IconProp } from '@fortawesome/fontawesome-svg-core'; // Font 结构出icon字符串所属类型 - 并非 string
//   获取 原生Input 类型 ：
export interface InputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'size'
> {
  /**设置input大小 ： large middle small*/
  size?: 'large' | 'middle' | 'small';
  /**是否禁用 ： true 禁用 false 启用 */
  disabled?: boolean; // 可选属性 ： 可以不传
  /**设置前置元素 ： 可以是字符串 也可以是JSX 元素 */
  prepend?: React.ReactNode;
  /**设置后置元素 ： 可以是字符串 也可以是JSX 元素 */
  append?: React.ReactNode; // 后置元素 ： 可以是字符串 也可以是元素   可以替换为此类型 :string| ReactElement
  /**设置图标 */
  icon?: IconProp;
  /**设置样式  */
  style?: React.CSSProperties;
  /**设置类名 */
  className?: string;
  // 设置
  placeholder?: string;
}

/**
 * Input 输入框 通过鼠标或键盘输入内容，是最基础的表单域的包装。
 *
 * ~~~js
 * // 这样引用
 * import { Input } from 'vikingship'
 * ~~~
 *
 * 支持 HTMLInput 的所有基本属性
 */
const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    size = 'middle',
    disabled = false,
    prepend,
    append,
    icon,
    style,
    className,
    placeholder,
    ...restprops
  } = props;

  // 其中 size-用于样式不传递给子组件
  const classes = classNames('instant-input-wrapper', className, {
    [`input-${size}`]: size,
    'input-disabled': disabled,
    'input-group': prepend || append,
    'input-group-append': !!append,
    'input-group-prepend': !!prepend,
  });

  /**
   * 用于规避输入框的prop出错-value为 undefined 或者 value 和default
   */

  const fixValue = () => (props.value !== undefined ? props.value : '');

  // 如果value存在删除defaultValue
  if ('value' in restprops) {
    delete restprops.defaultValue;
    restprops.value = fixValue();
  }

  return (
    <>
      <div className={classes} style={style} tabIndex={0}>
        {prepend && (
          <div className="instant-input-group-prepend">{prepend}</div>
        )}
        {icon && (
          <div className="instant-input-icon">
            <Icon icon={icon} title={`title-${icon}`}></Icon>
          </div>
        )}
        <input
          {...restprops}
          ref={ref}
          className="instant-input-inner"
          placeholder={placeholder}
          disabled={disabled}
        ></input>
        {append && <div className="instant-input-group-append">{append}</div>}
      </div>
    </>
  );
});

export default Input;

//  可补充
{
  /* input 属于表单组件 一部分： 常常用于表单提交的快捷方式 ：
            name 表单项字段名 
            type： 表单项类型 ： 文本框 密码框 单选框 复选框 下拉框 日期选择框 等
            placeholder 提示占用文字 
            required : 必填项-简单校验使用
            autocomplete="email" : 自动完成功能- 自动填充邮箱？ 
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" : 正则表达式 邮箱格式校验
            title="请输入有效的邮箱地址" : 错误提示信息
         */
}
