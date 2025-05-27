// 尝试使用 svg图标:
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon,FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FC } from "react";
import './_style.scss';
// FontAwesomeIconProps 配套Icon组件的props 属性 
import classNames from "classnames";
library.add(fas);  //整体导入使用 
export type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark'; 

export interface IconProps extends FontAwesomeIconProps{ 
     // 继承 FontAwesomeIconProps 组件的属性 包含 icon属性 - 通过以上注册就可以通过字符串形式进行使用 
    theme?:ThemeProps;  // 主题
}
const Icon :FC<IconProps> = (props) => {
    // 设置动态类名 ：
    const { className,theme,...restProps} = props; 
    const classes = classNames("instant-icon",className,{  // 添加类名
        [`icon-${theme}`]:theme
    })
    return (
        <>
        <FontAwesomeIcon className={classes}  { ...restProps}></FontAwesomeIcon>
        </>
      );
}
 
export default Icon;