import classNames from 'classnames';
import { useContext } from 'react';
import { MenuContext } from './MenuContext';
export interface MenuItemProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  disabled?: boolean;
  index?: string; // index设置为必传项
}

const MenuItem: React.FC<MenuItemProps> = (porps) => {
  const { index: contextIndex, onSelect } = useContext(MenuContext);
  const { index, className, style, children, disabled = false } = porps; // 解构赋值
  const classes = classNames('menu-item', className, {
    // 添加类名
    'is-disabled': disabled, // 禁用样式 ： 类名：is-disabled ， 样式： opacity: 0.5; cursor: not-allowed; pointer-events: none; "menu-item
    'is-active': contextIndex === index, // 激活样式 ： 类名：is-active ， 样式： color: #1890ff; background-color: #e6f7ff; border-color: #1890ff;
  });
  const handleClick = () => {
    if (onSelect && !disabled && index) {
      onSelect(index);
    }
  };
  return (
    <li className={classes} onClick={handleClick} style={style}>
      {children}
    </li>
  );
};
MenuItem.displayName = 'MenuItem'; //显示设置displayName属性 ： 用于识别子组件;
export default MenuItem;
