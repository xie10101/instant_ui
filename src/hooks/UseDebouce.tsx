//  自定义防抖函数 ：
// 传入一个输入值 和延迟时间：
// 主要使用 useEffect - 监控输入值的变化
// 函数内部使用 useState 记录 改变值
import { useEffect, useState } from 'react';

const useDebounce = (value: string, delay: number) => {
  const [debounceData, setdebounceData] = useState(value);
  // 关键是 - useState的初始值 仅在（组件首次渲染）函数调用时执行一次-即初始值始终为"",
  //useState 有React的状态管理机制- 其set函数执行后的状态改变或者初始值设置不会因为其他state的变化组件的重新渲染而导致变化
  useEffect(() => {
    const timer = setTimeout(() => {
      setdebounceData(value);
    }, delay);
    return () => {
      clearTimeout(timer); // 清除定时器
    };
  }, [value, delay]); // 依赖项： value 和 delay //
  return debounceData; // 返回防抖后的值
};
//  useEffect 使用 注意 挂载只跑副作用，更新先清旧再跑新，卸载必清最后一次。

export default useDebounce; // 导出防抖函数
