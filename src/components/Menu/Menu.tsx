
import React, { Children, cloneElement, ReactElement } from 'react'; // 
import  classNames from 'classnames';
type onSelectType = (selectedKey:string, event?: React.SyntheticEvent<HTMLUListElement>)=>void ;
type Mode = "horizontal"|"vertical";
import './_style.scss';
import { MenuItemProps  } from './MenuItem';
export interface MenuProps {
  className?:string;
  style?:React.CSSProperties;
  activeIndex?:string;
  onSelect?: onSelectType ;    //点击菜单后的回调- 参数是 当前被点击菜单项的index- 被激活的index 
  mode?:Mode;
  children?:React.ReactNode;
  defaultOpenSubMenus?:string[];
}

//context 传递的类型设置 ：
interface MenuContextType {
    index:string; // 索引值 ： 用于设置激活样式;
    onSelect?: onSelectType; // 对于该回调函数的执行处理？ 
    mode?:Mode;
    defaultOpenSubMenus?:string[];
}

// 获取原生的ul 类型 ：
export type Props =React.HTMLAttributes<HTMLUListElement> & MenuProps;

export const MenuContext = React.createContext<MenuContextType>({
    index:"0",
})
const Menu:React.FC<Props> = (props) => {
const {className , style ,children, activeIndex,onSelect,mode="horizontal",defaultOpenSubMenus} = props;
// 设置实现类名 ：
const classes = classNames("menu",className,{ // 添加类名
    [`menu-${mode}`]:mode,
})
// 设置高亮菜单项的状态：
const [currentActiveIndex , setActiveIndex] = React.useState<string>(activeIndex ? activeIndex :"0"); // 初始化索引值 0 ；
// 点击事件处理 ： 
const handleClick = (index:string) => {
    setActiveIndex(index);
    if(onSelect){ // 当 onSelect props 存在时，执行回调函数 ：
        onSelect(index);
    }
}

// 传递给子组件的Context ： 
const passedContext:MenuContextType={
    index:currentActiveIndex, // 索引值 ： 用于设置激活样式;
    onSelect:handleClick, // 对于该回调函数的执行处理？
    mode,
    defaultOpenSubMenus
}

 const renderChildren = Children.map(children, (child,i) => { // 遍历子组件 ： 子组件的类型设置 ：
   //映射依次处理：
   const  childElement =child as ReactElement<MenuItemProps>;
   const {displayName} = childElement.type as React.FC<MenuItemProps>; // 获取子组件的类型 ：  // 获取存在问题 -- 标签名获取 用于判断子组件是否正确  
/**
 * element.type : .type指代的是创建该React元素和函数式组件或是类组件；
 * /**
 * cloneElement element ,props 对象形式 ,...children
 * 
 */
 

   if(displayName === 'MenuItem'||displayName==="SubMenu"){
     // 判断子组件的类型 ：
    const index = i.toString(); // 索引值 ： 用于设置激活样式;
       return cloneElement(childElement,{ // 获取子组件的属性
       index})
   }else{
       console.error("Warning: Menuhas a child which is not a MenuItem component");
   } 
// 子节点类型没有明确 ： 所以需要进行类型判断 
} )

// 子传父实现
    return (
           <ul className={classes} style={style} data-testid="menu-test">
            <MenuContext.Provider value={passedContext}>
               {renderChildren}
            </MenuContext.Provider>
           </ul>
         );
}

/**
 * 5_14 视频6 之后 ： 
 * 对于 组件的完善:
 * 1.展开操作 2，折叠菜单设计,子菜单设计 ;
 * 
1. 目的：识别子组件，不能将li 标签同时作为 一个子组件 
2. 目的：index不再作为 必须传递的prop , index作为默认值自动设置 
 */
// * 在 React 中，displayName 是一个静态属性，用于指定组件的显示名称。它通常用于调试和错误报告中，以便更好地了解组件的结构和层次。
export default Menu;