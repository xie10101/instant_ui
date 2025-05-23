//对于自动完成组件的前期构想 ：


//props
 
// 输入内容 - value -被过滤内容 Options
// 当被选择时的回调 - onSelect 
// 过滤函数 - filterOption--自定义过滤形式 ？  

/**
 * 每次 过滤过程是调用后端接口查询过程 ： 
 */

export interface AutoCompleteProps { 
value?:string ;
options?: string[] ;  
onSelect?: (value: string) => void ;
filterOption?: (inputValue: string, options: string[]) => string[]  |
Promise<string[]> ;   ///此处返回值 是否决定了最终过滤结果    ? -- 异步处理 -- 
} 


//  其中组件结构待处理 


<AutoComplete 
></AutoComplete>

