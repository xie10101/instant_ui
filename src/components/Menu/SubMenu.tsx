import classNames from "classnames";
import { Children, ReactElement } from "react";
import { MenuItemProps } from "./MenuItem";
// index -作为标识？实际和一般的MenuItem一致
// title 设置存在区别 
export interface SubMenuProps {
    index?:number|string;
    title :string ;
    className?:string;
    children?:React.ReactNode;
}
const SubMenu :React.FC<SubMenuProps> = (props) => {
    const { className, title, index, children } = props;
    const classes = classNames("sub-menu",className);
   
    // 使用 函数组件渲染内部嵌套菜单 
    const renderChildren = () => { 
    const filterchildren = Children.map(children, (child, ) => { 
    const childrenElement = child as ReactElement<MenuItemProps> ;
     if((childrenElement.type as React.FC<MenuItemProps>).displayName === 'MenuItem')
      {
         return childrenElement
      } 
    })
    return (
      <ul className="sub-menu-ul">
        {filterchildren}
      </ul>
     )
    }

    return ( 
        <>
        {/* 单个sub菜单项  */}
        <li className={classes} key={index}>
            <div className="sub-menu-title">
                {title}
            </div>
            {
              // 实际一个Ul列表中包含多个li 
            renderChildren()
            }
        </li>
        </>
     );
}
//  设置displayName属性: 为父组件识别该组件提供机会 
SubMenu.displayName = "SubMenu";
export default SubMenu;