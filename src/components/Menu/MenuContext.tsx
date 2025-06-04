import React from 'react';
type onSelectType = (
  selectedKey: string,
  event?: React.SyntheticEvent<HTMLUListElement>
) => void;
type Mode = 'horizontal' | 'vertical';
//context 传递的类型设置 ：
export interface MenuContextType {
  index: string; // 索引值 ： 用于设置激活样式;
  onSelect?: onSelectType; // 对于该回调函数的执行处理？
  mode?: Mode;
  defaultOpenSubMenus?: string[];
}

export const MenuContext = React.createContext<MenuContextType>({
  index: '0',
});
