
import { Meta, StoryObj } from "@storybook/react";
import Upload from "./Upload";


// Meta 泛型传入组件整体类型;


const UploadMeta : Meta<typeof Upload> = {
  title: "文件上传",
  component: Upload,
  parameters: {
    layout: "centered"

  },
  tags: ['autodocs'],
}

export default UploadMeta; 


type Story = StoryObj<typeof Upload>;

export const Default: Story = {
  args: { // 传入组件的props参数
    action:"https://jsonplaceholder.typicode.com/posts/",
    onProgress:(percent,file)=>{ // 上传进度
      console.log(percent,file)
    },
    onSuccess:(data,file)=>{ // 上传成功
      console.log(data,file)
    },
    onError:(error,file)=>{ // 上传失败
      console.log(error,file)
    },
    onChange:(file)=>{ // 上传状态改变
      console.log(file,"change")
    },
    onRemove:(file)=>{ // 删除文件
      console.log(file,"remove")
    },
  },
  render: (args)=>{ 
    return <Upload {...args} ></Upload>
  } 
}

const beforeUploadHandle1  = (file:any)=>{ // 上传前的回调函数 ：
  // 验证文件大小 ：
  if(file.size > 1024  * 5) // 5k
  {
    alert("文件大小不能超过5k")
    return false; // 阻止上传 
  }
  return true 
}

export const beforeTest : Story = {
  args :{
    action:"https://jsonplaceholder.typicode.com/posts/",
    beforeUpload:beforeUploadHandle1,
    onChange:(file)=>{ // 上传成功
      console.log(file,"change")
    },
  },
  render: (args)=>{
    return <Upload {...args} ></Upload>
  }
}



 const beforeUploadHandle2  = (file:any)=>{ // 上传前的回调函数 ：
     const fileData = new File([file],`${Date.now()}-${file.name}`,{type:file.type}); // 重命名文件 ： 
  return Promise.resolve(fileData); // 上传成功
}



export const beforeTest2 : Story = {
  args :{
    action:"https://jsonplaceholder.typicode.com/posts/",
    beforeUpload:beforeUploadHandle2,
    onChange:(file)=>{ // 上传成功
      console.log(file,"cahnge")
    },
  },
  render: (args)=>{
    return <Upload {...args} ></Upload>
  }
}


export  const multiOrAccept: Story = {
  args: { // 传入组件的props参数
    action:"https://jsonplaceholder.typicode.com/posts/",
    onProgress:(percent,file)=>{ // 上传进度
      console.log(percent,file)
    },
    onSuccess:(data,file)=>{ // 上传成功
      console.log(data,file)
    },
    onError:(error,file)=>{ // 上传失败
      console.log(error,file)
    },
    onChange:(file)=>{ // 上传状态改变
      console.log(file,"change")
    },
    onRemove:(file)=>{ // 删除文件
      console.log(file,"remove")
    },
        multiple:true,
    accept:"image/*",
  },
  render: (args)=>{ 
    return <Upload {...args} ></Upload>
  } 
}
