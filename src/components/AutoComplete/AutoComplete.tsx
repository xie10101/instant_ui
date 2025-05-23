import { useState } from 'react';
import Input from '../Input/Input'; 
import  {InputProps} from '../Input/Input';

export interface AutoCompleteProps  extends Omit<InputProps, "onSelect">{ 
    value?:string ;
onSelect?: (value: string) => void ;
filterOption?: (inputValue: string) => string[]; //输入框内容作为参数传给用户进行处理-返回值在组件内部处理  
 ///此处返回值 是否决定了最终过滤结果    ? -- 异步处理 -- 
} 

const AutoComplete :React.FC<AutoCompleteProps> = (props)=>  {
     const {  onSelect, filterOption,value , ...restProps} = props; 
   


     const [inputValue, setInputValue] = useState(value); // 受控组件 
     const [suggestions, setSuggestions] = useState<string[]>([]); // 过滤后的选项 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 为空的处理 
    const inputValue = e.target.value.trim();
    setInputValue(inputValue);
    if(inputValue&& filterOption){
    const result = filterOption(inputValue);
    console.log(result);
    setSuggestions(result);
    }
    else{
      setSuggestions([]);
    }
}

const handleSelect = (value: string) => { 
    setInputValue(value);
    setSuggestions([]);
    // 需要使用时 - 传递 参数 - value
    if (onSelect) {
      onSelect(value);
    }
  } 
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  }
//   查询后列表的函数生成 
     const generateDropdown = ()=>{ 
    //  map循环实现 - 列表生成  -- 当数组 为空时回调不执行 - 不进行渲染 ：
  return ( 
     <ul>
    {suggestions.map((item, index) => {
      return (
        <li key={index} onClick={() => handleSelect(item)}>
          {item}
        </li>
      );
    }) 
}     </ul>)
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
            {(suggestions.length>0) && generateDropdown()}
            </div>
        </>
     );
}
 
export default AutoComplete ;
