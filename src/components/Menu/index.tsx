import Menu from './Menu';
import MenuItem from './MenuItem';
import SubMenu from './SubMenu';
import { MenuPropsPro } from './Menu';
import { FC } from 'react';
// 设置联合类型：
export type transMenu = FC<MenuPropsPro> & {
  Item: typeof MenuItem;
  SubMenu: typeof SubMenu;
};
//  为 Menu组件重新定义类型

const TransMenu = Menu as transMenu; // 断言使用 ？
TransMenu.Item = MenuItem;
TransMenu.SubMenu = SubMenu;

export default TransMenu;
