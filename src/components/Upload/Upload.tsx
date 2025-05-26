// 上传组件的实现：
import axios from "axios";
import Button from "../Button/Button";
import { FC, useRef } from "react";
import { AxiosResponse } from "axios";

// File 文件类型
  
export interface UploadProps {
    action: string; // 上传的地址 
    onProgress:(percent:number,file:File)=>void;
    onSuccess:(data:AxiosResponse,file:File)=>void;
    onError:(error:Error,file:File)=>void;
    beforeUpload:(File:File)=>boolean | Promise<File>; // 上传前的回调函数
    onChange?:(file:File)=>void;
} 

/**
 * 验证转换处理 ？ 
 * 1. 上传地址是否合法
 * 2. 上传文件的类型是否合法
 * 
 * onChange 
 */

const Upload :FC<UploadProps> = (props ) => {
const inputRef = useRef<HTMLInputElement>(null); 

const {action, onProgress,onSuccess,onError,beforeUpload,onChange } = props;  


const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
  if(!e.target.files) return; // 没有选择文件  -- null /undefined 类型守卫同时判断 
  const fileList= Array.from(e.target.files); 
  // 实际上传前的回调执行 ：
if(beforeUpload)
{
   const result =beforeUpload(fileList[0]); 
   if(result instanceof Promise) // 异步的情况 ：
   {
    result.then((fileData) => { // 上传成功的回调
      post(fileData); // 调用上传请求
    })
  }
   else if(result === false) // 同步失败的回调
   {
    return; // 阻止上传
   }
   else // 同步成功的回调
   { 
    post(fileList[0]); // 调用上传请求
   }
}
   fileList.forEach((file) => {
   post(file); // 调用上传请求
  })
  /**
   * 单个file对象具有的属性：
   * 1. name 
   * 2. size
   * 3. type
   * 4. lastModified -- 最后修改的时间戳
   */
} 
// 上传请求单独封装 :
const post = (file: File) => { 

 const formData = new FormData(); // 创建一个FormData对象 --类型数据键值对  
   formData.append("myFile",file!);
//  上传请求 ：
   axios.post(action,formData,{
    headers:{
        "Content-Type":"multipart/form-data" // 告诉服务器上传的是文件数据
     },
     onUploadProgress: progressEvent => {
      if(progressEvent.total&&onProgress)
      {
      const   percentCompleted = Math.round(
      (progressEvent.loaded * 100) / progressEvent.total
     );
        if(percentCompleted<100)
        onProgress(percentCompleted,file);

      }
  }
    }).then((res) => {
      if(onSuccess){
        
        onSuccess(res.data,file); 
      }
      if(onChange)
     onChange(file);
   }).catch((err) => {
    if(onError){
      onError(err,file); 
    }
     if(onChange)
      onChange(file);
   })
}
   const handleClick = () => { 
  //触发input的点击:
  if(inputRef.current){
    inputRef.current.click(); // 触发input的点击事件  
  } 
  
}

    return (
        <div>
                <Button type="primary" onClick={handleClick}>上传文件</Button>
                <input type="file"   ref={inputRef}  onChange={handleChange }/>
        </div>
      );
}
 
export default Upload;