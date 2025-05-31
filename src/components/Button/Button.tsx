/**
 * 枚举 ： 组件 -按钮 - size ， type  ,设置 props类型 ， 设置 default 值 ,
 * 问题 1 ： 对于传递props的传入进行 className的动态设置  -- className js包
 * 问题 2 ： 按钮 --链接关系
 *  初始值 问题
 */
import React from 'react';
import classNames from 'classnames';
import { ButtonHTMLAttributes } from 'react';
import { AnchorHTMLAttributes } from 'react';
import './_style.scss';

interface ButtonProps {
  size?: 'large' | 'small' | 'middle' | string; // 按钮大小
  type?:
    | 'primary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'default'
    | 'link'
    | string; // 按钮类型
  children?: React.ReactNode;
  disabled?: boolean; // 是否禁用
  href?: string;
  className?: string; // 自定义类名
}

// 扩展 props

// 获取原生 button 的 props 类型
type NativeBtnProps = ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps; // 交叉类型

// 获取原生 a 标签的 props 类型
type NativeAnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> & ButtonProps;

// 使用类型谓词进行类型守卫-- 对传入props 进行判断 判断使用 标签类型
//  ----此处的NativeAnchorProps 没有实际作用 ？
// function isAnchorProps(props: ButtonPropsPro): props is NativeAnchorProps {
//   return ;
// }
// 联合类型 可以是 a标签原生或者是 button 原生 props
type ButtonPropsPro = Partial<NativeBtnProps | NativeAnchorProps>;

const Button: React.FC<ButtonPropsPro> = (props: ButtonPropsPro) => {
  const {
    size,
    type = 'default',
    children,
    disabled = false,
    href,
    className,
    ...restprops
  } = props; // 解构赋值
  /**
   * 参数 ： 接收字符串和键值对 对象
   * 字符串是真值键值对的缩写- 默认包含该类名
   * 参数的键如果为动态的可以使用 [模板字符串的方式设置 ]
   */

  // 默认 btn
  const classes = classNames('btn', `${className}`, {
    [`btn-${size}`]: size,
    [`btn-${type}`]: type,
    disabled: type === 'link' && disabled, //当且仅当 类型为链接 且 传递的disable Props 的值为 true时 表达值式返回值才为true
  });

  // 在使用类型断言之前需要做到类型检查 确保 type为link 才可设置props --
  //  a标签属性
  // isAnchorProps(props)
  // "href" in 操作 判断属性存在行
  if (props.type === 'link' && 'href' in props) {
    return (
      <a
        className={classes}
        href={href}
        {...(restprops as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {/*  此处必须做断言呀  */}
        {children}
      </a>
    );
  }

  return (
    <button
      className={classes}
      disabled={disabled}
      // 使用断言解决类型检查
      {...(restprops as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
};

/*
两部分待处理 ： 
1. disabled 的处理 分析 
2. 类型断言的使用分析  
*/

export default Button;
