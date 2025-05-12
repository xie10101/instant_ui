
import React from 'react'; // 
import  classNames from 'classnames';
type onSelectType = (selectedKey:string|number)=>void ;
type Mode = "horizontal"|"vertical";
export interface MenuProps {
  className?:string;
  style?:React.CSSProperties;
  activeIndex?:string|number;
  onSelect?: onSelectType ;    //点击菜单后的回调- 参数是 当前被点击菜单项的index- 被激活的index 
  mode?:Mode;
  children?:React.ReactNode;
}

//context 传递的类型设置 ：
interface MenuContextType {
    index:number|string; // 索引值 ： 用于设置激活样式;
    onSelect?: onSelectType; // 对于该回调函数的执行处理？ 
}

export const MenuContext = React.createContext<MenuContextType>({
    index:0,
})
const Menu:React.FC<MenuProps> = (props) => {
const {className , style ,children, activeIndex,onSelect,mode="horizontal"} = props;
// 设置实现类名 ：
const classes = classNames("menu",className,{ // 添加类名
    [`menu-${mode}`]:mode,
})
// 设置高亮菜单项的状态：
const [currentActiveIndex , setActiveIndex] = React.useState<number|string>(activeIndex ? activeIndex :0); // 初始化索引值 0 ；
// 点击事件处理 ： 
const handleClick = (index:number|string) => {
    setActiveIndex(index);
    if(onSelect){ // 当 onSelect props 存在时，执行回调函数 ：
        onSelect(index);
    }
}

// 传递给子组件的Context ： 
const passedContext:MenuContextType={
    index:currentActiveIndex, // 索引值 ： 用于设置激活样式;
    onSelect:handleClick, // 对于该回调函数的执行处理？
}


// 子传父实现
    return (
        <ul className={classes} style={style}>
            <MenuContext.Provider value={passedContext}>
                 {children}
            </MenuContext.Provider>
           </ul>
      );
}
 
export default Menu;