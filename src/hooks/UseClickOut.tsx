import { useEffect } from 'react';
// 差异点击：
const useClickOut = (ref: React.RefObject<HTMLElement|null>, callback: () => void) => { 
    useEffect(() => {
        if(!ref.current) return; // 如果 ref.current 不存在，直接返回
      const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                callback(); // 调用回调函数
            }
            else {
                return ;
            }
        };
        // 为 document 添加点击事件监听器 
        document.addEventListener('click', handleClickOutside);

    }, [ref, callback]);
}


export default useClickOut; // 导出自定义钩子 