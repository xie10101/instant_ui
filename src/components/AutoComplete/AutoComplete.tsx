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
    if (onSelect) {
      onSelect(value);
    }
  } 
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  }
//   查询后列表的函数生成 
     const generateDropdown = ()=>{ 
//    return (
//     // <div className="viking-auto-complete-dropdown">
//     //   {options?.map((option) => (
//     //     <div key={option} className="viking-auto-complete-dropdown-item">
//     //       {option}
//     //     </div>
//     //   ))}
//     </div>
//   );  
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
            {generateDropdown()}
            </div>
        </>
     );
}
 
export default AutoComplete ;
