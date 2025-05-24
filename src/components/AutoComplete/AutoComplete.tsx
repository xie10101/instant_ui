import { useState,useEffect } from 'react';
import Input from '../Input/Input'; 
import  {InputProps} from '../Input/Input';
import "./_style.scss"
import Icon from '../Icon/Icon';
export interface AutoCompleteProps<T=object>  extends Omit<InputProps, "onSelect">{ 
value?:string ;
onSelect?: (value: ItemType<T>) => void ;
filterOption?: (inputValue: string) => ItemType<T>[]|Promise<ItemType<T>[]>; //输入框内容作为参数传给用户进行处理-返回值在组件内部处理  
 ///此处返回值 是否决定了最终过滤结果    ? -- 异步处理 -- 
renderOption?: (item: ItemType<T>) => React.ReactNode; // 传递给用户的函数 - 用于渲染列表项的模版
} 

// 设置列表项的类型- 泛型设置 ：// 其中数据项中一定存在 value属性 
type ListItemType = {
    value: string;
}
export type ItemType<T=object>= T & ListItemType;



const AutoComplete=<T=object>(props:AutoCompleteProps<T>)=>  {
     const {  onSelect, filterOption,value ,renderOption, ...restProps} = props; 
     const [inputValue, setInputValue] = useState(value); // 受控组件 
     const [suggestions, setSuggestions] = useState<ItemType<T>[]>([]); // 过滤后的选项 
     const [loading, setLoading] = useState(false); // 加载状态
  useEffect(() => {
  console.log('Loading state:', loading);
}, [loading]);
     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 为空的处理 
// 监听 loading 状态变化

    const inputValue = e.target.value.trim();
    setInputValue(inputValue);
    if(inputValue&& filterOption){
   
    const result = filterOption(inputValue);
    if(result instanceof Promise){ // 异步处理 
     
        setLoading(true);
        // 此时异步函数如果没有返回不会执行以下的逻辑吗？ 
      result.then(data=>{  //异步处理
        setSuggestions(data);
        setLoading(false);
           console.log('异步处理');
      })
    }else 
    setSuggestions(result);
    console.log('同步处理');
    }
/**
 *     if(result instanceof Promise){ // 异步处理 
     
        setLoading(true);
        // 此时异步函数如果没有返回不会执行以下的逻辑吗？ 
      result.then(data=>{  //异步处理
        setSuggestions(data);
        setLoading(false);
           console.log('异步处理');
      })
    }else 
    setSuggestions(result);
    console.log('同步处理');
    }此段代码有意思 - 立即同步执行和异步执行 
 */

    else{
      setSuggestions([]);
    }
}

// 此处使用 
const handleSelect = (item: ItemType<T>) => { 
    setInputValue(item.value);
    setSuggestions([]);
    // 需要使用时 - 传递 参数 - value
    if (onSelect) {
      onSelect(item);
    }
  } 


  // 处理键盘事件 - 选择列表项
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  }

  /**
   * 函数 用于 生成列表项渲染的模版  
   * @returns 
   */
 
  const renderTemplate= (item: ItemType<T>)=>{
    if(renderOption){
      // 传递给用户的函数 - 用于渲染列表项的模版
    return renderOption(item)? renderOption(item): item.value
      } else{
        return item.value;
      }
     }
  //   查询后列表的函数生成 
     const generateDropdown = ()=>{ 
    //  map循环实现 - 列表生成  -- 当数组 为空时回调不执行 - 不进行渲染 ：
   return ( 
     <ul className='instant-auto-complete-list'>
    {suggestions.map((item, index) => {
      return (
        
        <li key={index}  className='instant-auto-complete-item' onClick={() => handleSelect(item)}>
          {renderTemplate(item)}
        </li>
      );
    }) 
     }
</ul>)
}  
    
     return ( 
        <>
            <div className="instant-auto-complete" >
            <Input
                {...restProps}
                value={inputValue}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />
            {loading && <Icon icon={'spinner'} spin></Icon>}     
            {(suggestions.length>0) && generateDropdown()}
            </div>
        </>
     );
}
 
export default AutoComplete ;
