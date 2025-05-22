// 编写 input组件 story ：

import Input from "./Input";
import { useState } from "react";
import { Meta, StoryObj } from '@storybook/react';

 const inputMeta: Meta<typeof Input> = {
 title:"输入框",
  argTypes: {
    size: {
      options: ['large','middle', 'small'], //底层组件参数选项
      control: { type: 'radio' },
    },
  },
  component: Input,
  parameters: {
    docs: {
      description: {
        component: '这是输入框组件',
      },
    },
    layout: 'centered',// 组件显示的布局设置
    
  } ,
      tags: ['autodocs'], // 自动生成文档
 }

 export default inputMeta;

 type Story = StoryObj<typeof Input>;
 export const controlInput: Story = {
  
  args:{
      size: 'middle',
      placeholder: '请输入内容',

  },
  render: (args) => { 
    const  [value , setValue] = useState('123456');
    return <Input value={value} onChange={(e)=>{setValue(e.target.value)}} {...args} /> }
 }

 export const Default: Story = {
  args:{
      size: 'middle',
      placeholder: '请输入内容',
  }
 }
  export const Large: Story = {
  args:{
      size: 'large',
        placeholder: '请输入内容',
  }
 }
  export const Disabled: Story = {
  args:{
    disabled: true,
    placeholder: '不填写内容',
  } 
}
  export const includePrepend: Story = {
  args:{
    prepend: 'https://',
  } 
}
  export const includeAppend: Story = {
  args:{
    append: '@',
  } 
}