import classNames from 'classnames';
import React, { Children, cloneElement, ReactElement } from 'react';
import { MenuItemProps } from './MenuItem';
import { useState, useRef } from 'react';
import { MenuContext } from './Menu';
import Icon from '../Icon/Icon';
import { CSSTransition } from 'react-transition-group';
import '../../styles/_animation.scss';
// index -作为标识？实际和一般的MenuItem一致
// title 设置存在区别
export interface SubMenuProps {
  index?: string;
  title: string;
  className?: string;
  children?: React.ReactNode;
}

const SubMenu: React.FC<SubMenuProps> = (props) => {
  const { className, title, index, children } = props;
  // 获取context ：
  const context = React.useContext(MenuContext);
  //此处需要对 context.defaultOpenSubMenus做断言 ？
  //强制断言任然会报错 编译错误
  let isOpen: boolean = false;
  if (context.defaultOpenSubMenus !== undefined) {
    isOpen =
      index && context.mode === 'vertical'
        ? context.defaultOpenSubMenus.includes(index!)
        : false; // 判断处理包含: 1.mode判断 2. index 存在 3. 包含
  }
  // index 选中与否 决定 是否状态为 true
  const [open, setOpen] = useState(isOpen);
  const classes = classNames('sub-menu', className, {
    'is-active': context.index === index,
    'is-vertical': context.mode === 'vertical',
    'is-opened': open,
  });

  // 为 ul设置class
  const subMenuUlClasses = classNames('sub-menu-ul', {
    // 添加类名
    open: open,
  });
  // let timer:NodeJS.Timeout;
  /***
   * 用于点击事件处理回调 --封装后
   */
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    e.preventDefault();
    //设置计时器
    setOpen(toggle);
    if (context.onSelect !== undefined && index) {
      // 当 onSelect props 存在时，执行回调函数 ：
      context.onSelect(index);
    }
  };
  /**
   *
   * 设置两个事件对象
   * 三元表达式 处理
   * 两个事件 - 鼠标进入 和鼠标离开 -
   * MouseEnter
   * MouseLeave
   */
  const clickEvents =
    context.mode === 'vertical'
      ? {
          onClick: (e: React.MouseEvent) => {
            handleMouse(e, !open);
          },
        }
      : {};
  const hoverEvents =
    context.mode === 'horizontal'
      ? {
          onMouseEnter: (e: React.MouseEvent) => {
            handleMouse(e, true);
          }, // 鼠标进入事件
          // 鼠标进入事件
          onMouseLeave: (e: React.MouseEvent) => {
            handleMouse(e, false);
          }, // 鼠标离开事件
        }
      : {};
  const ref = useRef<HTMLElement>(null);
  // 使用 函数组件渲染内部嵌套菜单
  const renderChildren = () => {
    const filterchildren = Children.map(children, (child, i) => {
      const childrenElement = child as ReactElement<MenuItemProps>;
      if (
        (childrenElement.type as React.FC<MenuItemProps>).displayName ===
        'MenuItem'
      ) {
        // 不在外部设置index 变量 - 造成名字重叠 /
        return cloneElement(childrenElement, {
          index: `${index}-${i.toString()}`,
        });
      }
    });

    return (
      <CSSTransition
        nodeRef={ref}
        in={open}
        timeout={300}
        classNames="zoom-in-top"
        appear
      >
        <ul className={subMenuUlClasses}>{filterchildren}</ul>
      </CSSTransition>
    );
  };

  return (
    <>
      {/* 单个sub菜单项  */}
      <li className={classes} key={index} {...hoverEvents}>
        <div className="sub-menu-title" {...clickEvents}>
          {title}
          {/* Icon */}
          <Icon icon="chevron-down" className="icon-chevron"></Icon>
        </div>
        {
          // 实际一个Ul列表中包含多个li --MenuItem
          renderChildren()
        }
      </li>
    </>
  );
};
//  设置displayName属性: 为父组件识别该组件提供机会
SubMenu.displayName = 'SubMenu';
export default SubMenu;
