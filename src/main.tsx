// 全局导入使用的样式文件
import './styles/index.scss';
export { default as Button } from './components/Button';
export { default as Input } from './components/Input';
export { default as AutoComplete } from './components/AutoComplete';
export { default as Icon } from './components/Icon';
export { default as Progress } from './components/Progress';
export { default as Upload } from './components/Upload';
export { default as Menu } from './components/Menu/index';
export { default as Card } from './components/Card';
// 聚合导出 -- 实际是 import Button xx + export { Button }

import { createRoot } from 'react-dom/client';
import App from './App';

//  ---React处理基础 --根容器 -- 根容器渲染 - 虚拟DOM 设置
createRoot(document.getElementById('root') as HTMLElement).render(<App />);
