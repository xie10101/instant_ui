// 自动完成组件故事内容 ：
import {Meta, StoryObj} from '@storybook/react';
import AutoComplete from './AutoComplete'; 
import {AutoCompleteProps} from './AutoComplete'; 
import { useState } from 'react';
 const AutoCompleteMeta: Meta<typeof AutoComplete> = {
 title:"自动完成组件",
  component: AutoComplete,
  parameters: {
    docs: {
      description: {
        component: '自动完成组件 ',
      },
    },
    layout: 'centered',// 组件显示的布局设置
    
  } ,
      tags: ['autodocs'], // 自动生成文档
 }

 export default AutoCompleteMeta;


type Story = StoryObj<AutoCompleteProps>;

function Try (){
    
   const strArrays= ["123","456","789","abc","def","ghi","jkl","mno","pqr","stu","vwx","yz"];

    const [value, setValue] = useState("123"); 
    const handleSelect = (value: string) => {
        console.log(value);
    }
    const handleFilterOption = (value : string )=>{
        const filtersOptions = strArrays.filter((item) => item.includes(value)); 
        return filtersOptions
    }
    return (
        <AutoComplete value={value} onSelect = {handleSelect }   filterOption={handleFilterOption}
 />
) }   


export const Default: Story = {
    args:{
         placeholder: '请输入内容',
    },
    render: (args) => <Try {...args}  />,
}

