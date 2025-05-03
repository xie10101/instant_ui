
/**
 * 枚举 ： 组件 -按钮 - size ， type  ,设置 props类型 ， 设置 default 值 ,
 * 问题 1 ： 对于传递props的传入进行 className的动态设置  -- className js包 
 * 问题 2 ： 按钮 --链接关系 
 *  初始值 问题 
 */
import React from "react";
import classNames from "classnames";
import "./_style.scss";
export  enum ButtonSize {
  Large= "large",
  Small="small",
}

export  enum ButtonType {
  Primary = "primary",
  Success = "success",
  Danger = "danger",
  Warning = "warning",
  default = "default",
  Link = "link",
}

interface ButtonProps {
  size?: ButtonSize; // 按钮大小
  type?: ButtonType; // 按钮类型
  children?: React.ReactNode;
  disabled?: boolean; // 是否禁用
  href? :string; 
  onClick?: () => void
  className?: string; // 自定义类名
}

const Button: React.FC<ButtonProps> = (props : ButtonProps) => {
    
    const { size,type=ButtonType.default,children,disabled=false,href,onClick,className } = props; // 解构赋值
 /**
  * 参数 ： 接收字符串和键值对 对象 
  * 字符串是真值键值对的缩写- 默认包含该类名 
  * 参数的键如果为动态的可以使用 [模板字符串的方式设置 ] 
 */

// 默认 btn  
const classes = classNames("btn",{
    [`btn-${size}`]: size,
    [`btn-${type}`]: type,
    "disabled":(type===ButtonType.Link)&&disabled,  //当且仅当 类型为链接 / 且 传递的disable Props 的值为 true时 表达值式返回值才为true ?? 
}
)
    // 设置动态className
        if(type===ButtonType.Link&&href){
        return (
                <a className={classes} href={href}>{children}</a>
               )
        }
        else{
        return (
                <button className={classes} onClick={onClick} disabled={disabled} >{children}</button>
               )
        }
}


export default Button;