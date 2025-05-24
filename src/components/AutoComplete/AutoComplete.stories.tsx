// 自动完成组件故事内容 ：
import {Meta, StoryObj} from '@storybook/react';
import AutoComplete from './AutoComplete'; 
import {AutoCompleteProps} from './AutoComplete'; 
import { useState } from 'react';
// - 该泛型参数用于定义回调函数的参数类型：
import {ItemType} from "./AutoComplete"

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

//对象形式的数据：
const strArrays2 = [
    { value: "John Doe", age: 30 },
    { value: "Jane Smith", age: 25 },
    { value: "Bob Johnson", age: 35 },
    { value: "Alice Brown", age: 28 },
]
type DataType = {
    value: string;
    age: number;
}

    const [value, setValue] = useState("123"); 

    // 选中项1
    const handleSelect = (value:ItemType<DataType>) => {
        console.log(value);
    }
    // 用户希望该函数只做数据的返回- 不做模版样式的渲染
    const handleFilterOption = (value : string ) =>{
        const filtersOptions = strArrays2.filter((item) =>item.value.includes(value) ); 
        console.log(filtersOptions)
        return filtersOptions ;  
        //  返回值 -函数签名和实际定义的函数签名不一致 - 
    }
    // 每个列表项 
    const handleRenderOption = (item: ItemType<DataType>) => {
        return <div>value: {item.value}, Age: {item.age}</div>;
    }
    // 
    return (
        <AutoComplete<DataType> value={value} onSelect = {handleSelect } filterOption={handleFilterOption} renderOption={handleRenderOption}  
 />
//  此时- 自动完成列表项 包含-- value属性 和其他 自定义 属性： 对象；

) }   


function Test  (){
    
   const strArrays= ["123","1123","11124","456","789","abc","def","ghi","jkl","mno","pqr","stu","vwx","yz"];

    const [value, setValue] = useState("123"); 

    // 选中项1
    const handleSelect = (value:ItemType) => {
        console.log(value);
    }
    // 用户希望该函数只做数据的返回- 不做模版样式的渲染
    const handleFilterOption = (value : string ) =>{
      console.log(value)
        const filtersOptions = strArrays.filter((item) => item.includes(value)) ; 
        const newOptions =  filtersOptions.map((item) => ({ value: item })) ; 
        return newOptions ;  
        //  返回值 -函数签名和实际定义的函数签名不一致 - 
    }
    // 每个列表项 
    const handleRenderOption = (item: ItemType) => {
        return <div>value: {item.value}</div>;
    }
    // 
    return (
        <AutoComplete value={value} onSelect = {handleSelect } filterOption={handleFilterOption} renderOption={handleRenderOption}  
 />
//  此时- 自动完成列表项 包含-- value属性 和其他 自定义 属性： 对象；

) }   



// 异步处理实现 ：
function AsyncTest  (){
    
type DataType = {
    id: number;
    url: string;
  }
    const [value, setValue] = useState(""); 
    // 选中项1
    const handleSelect = (value:ItemType) => {
        console.log(value);
    }
    // 设置一个函数专门处理- 异步数据的返回：？ -起始不用 
    // 用户希望该函数只做数据的返回- 不做模版样式的渲染
    const handleFilterOption = async  (query : string ) =>{
   
        //  返回值 -函数签名和实际定义的函数签名不一致 - 
      // const data =  await   fetch(`https://api.github.com/search/users?q=${query}`)
      //   .then(response => response.json())
      //  .then(data => {
      //    setTimeout(() => {
      //   return data.items.map((item:any) => ({ value: item.login, id: item.id, url: item.url })); ;    
      //   } ,1000) 
      // })
      //  .catch(error => {
      //   console.error('Error:', error);
      // })
      //  return data ;
      try {
    // 1. 发起请求
    const response = await fetch(`https://api.github.com/search/users?q=${query}`);
    
    // 2. 检查响应状态
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    
    // 3. 解析JSON数据
    const jsonData = await response.json();
    
    // 4. 添加延迟后返回处理后的数据
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          jsonData.items.map((item: any) => ({
            value: item.login,
            id: item.id,
            url: item.url
          }))
        );
      }, 1000);
    });
    
  } catch (error) {
    console.error('Error fetching data:', error);
    // 返回空数组或根据业务需求处理错误
    return [];
  }
    }


    /**
     * 
     * @param item {
  "login": "SlexAxton",
  "id": 96554,
  "node_id": "MDQ6VXNlcjk2NTU0",
  "avatar_url": "https://avatars.githubusercontent.com/u/96554?v=4",
  "gravatar_id": "",
  "url": "https://api.github.com/users/SlexAxton",
  "html_url": "https://github.com/SlexAxton",
  "followers_url": "https://api.github.com/users/SlexAxton/followers",
  "following_url": "https://api.github.com/users/SlexAxton/following{/other_user}",
  "gists_url": "https://api.github.com/users/SlexAxton/gists{/gist_id}",
  "starred_url": "https://api.github.com/users/SlexAxton/starred{/owner}{/repo}",
  "subscriptions_url": "https://api.github.com/users/SlexAxton/subscriptions",
  "organizations_url": "https://api.github.com/users/SlexAxton/orgs",
  "repos_url": "https://api.github.com/users/SlexAxton/repos",
  "events_url": "https://api.github.com/users/SlexAxton/events{/privacy}",
  "received_events_url": "https://api.github.com/users/SlexAxton/received_events",
  "type": "User",
  "user_view_type": "public",
  "site_admin": false,
  "score": 1
}
     * @returns 
     */
    // 每个列表项 
    const handleRenderOption = (item: ItemType) => {
        return <div>login: {item.value}</div>;
    }
    return (
        <AutoComplete<DataType> value={value} onSelect = {handleSelect } filterOption={handleFilterOption} renderOption={handleRenderOption}  
 />
    ) 
}
export const Async: Story = {
    args:{
          placeholder: '请输入内容',
    },
    render: (args) => <AsyncTest {...args}  />
    }


export const Default: Story = {
    args:{
         placeholder: '请输入内容',
    },
    render: (args) => <Try {...args}  />,
}

export const Test1: Story = {
    args:{
         placeholder: '请输入内容',
    },
    render: (args) => <Test {...args}  />
  }

