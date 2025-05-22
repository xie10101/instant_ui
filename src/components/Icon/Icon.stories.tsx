import { Meta,StoryObj } from "@storybook/react";
import Icon from "./Icon";

// 其中 Meta 作为故事Meta 元类型使用 
 const IconMeta : Meta<typeof Icon> = {
   title:"Instant图标",
  argTypes: {
  },
  component: Icon,
  parameters: {
    docs: {
      description: {
        component: '图标实例',
      },
    },
    layout: 'centered',// 组件显示的布局设置
  } ,
    tags: ['autodocs'], // 自动生成文档
}


export  default IconMeta;


 type Story = StoryObj<typeof Icon>;  // 设置故事类型 

 export const Default: Story = {
  args:{
      icon:'ghost',
  }
 }

 export const DifferentTheme: Story = {
  args:{
      icon:'ghost',
      theme:'primary',
  }
 }

 export const DifferentSize: Story = {
  args:{
      icon:'ghost',
      size:'2x',
  }
 }
  export const smallSize: Story = {
  args:{
      icon:'ghost',
      size:'sm',
  }
 }
// FontAwesomeIconPr  size 传递一些预设尺寸字符串- ： 
/**
 *xs 
 * sm
 * lg
 * xl 
 * 2x 1x 10x 
 */
