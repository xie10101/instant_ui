// 上传组件的实现：
import axios from "axios";
import Button from "../Button/Button";
import { FC, useRef } from "react";
import { AxiosResponse } from "axios";
import { useState } from "react"; 
import UploadList from "./UploadList";
import "./_style.scss"
// File 文件类型
  
export interface UploadProps {
  defaultFileList?: FileTypePro[]; // 默认文件列表  
  action: string; // 上传的地址 
    onProgress:(percent:number,file:File)=>void;
    onSuccess:(data:AxiosResponse,file:File)=>void;
    onError:(error:Error,file:File)=>void;
    
    /**
 * 验证转换处理 ？ 
 * 1. 上传地址是否合法
 * 2. 上传文件的类型是否合法
 * 
 * onChange 
 */
    beforeUpload:(File:File)=>boolean | Promise<File>; // 上传前的回调函数
    onChange?:(file:File)=>void;
    onRemove ?:(file:FileTypePro)=>void; // 删除文件的回调函数 
} 



//创建单个文件对象类型：
type FileType =  "ready" |"uploading" | "success" | "error" ;
export interface FileTypePro {
   uid:string;
   name:string;
    status:FileType ; // 上传状态：uploading / done / error
    size:number; // 上传成功后的地址
    percent?:number; // 上传进度
    url?:string; // 上传成功后的地址  -- 图片一般可以使用 - 文件下载可以使用 ? 
    raw?:File; // 原始文件对象
    error?:Error; // 上传失败的错误信息
    response?:AxiosResponse; // 上传成功的响应信息
} 


const Upload :FC<UploadProps> = (props ) => {
const inputRef = useRef<HTMLInputElement>(null); 

const {action, onProgress,onSuccess,onError,beforeUpload,onChange,defaultFileList,onRemove } = props;  


const [files,setFiles] = useState<FileTypePro[]>(defaultFileList||[]); // 文件列表状态管理   

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

/**
 * 
 * @param file 当前文件对象- 可以不是最新值  
 * @param status  - 需要修改更新的文件属性 
 */
const updateFileStatus = (file:FileTypePro, changeObj:Partial<FileTypePro>) =>  {
    setFiles((prevFiles) => {
        return prevFiles.map((item) => { // 遍历文件列表 ：
          if(item.uid === file.uid) // 找到对应的文件对象
          {
            return { ...item ,...changeObj}; // 更新文件对象  -  关键 扩展运算时的覆盖问题 
          }
          return item; // 没有找到对应的文件对象 ：
        })
       }
      )
}
// 上传请求单独封装 :
const post = (file: File) => { 
 const _file = {
  uid: `${Date.now()}-${file.name}`, // 生成一个唯一的id
  name:file.name, // 文件名
  status: "ready" as FileType , // 上传状态：uploading / done / error
  size:file.size, // 上传成功后的地址
  raw:file, // 原始文件对象
 } 
 setFiles((prevFiles) => [...prevFiles,_file]); 
 

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
          // 更新对象状态 
        updateFileStatus(_file, {
          status: "uploading",
          percent: percentCompleted,
        });
          setFiles((prevFiles) =>  { console.log(prevFiles) ;  return prevFiles}  )
        onProgress(percentCompleted,file)
      }
  }
    }).then((res) => {
      if(onSuccess){
          updateFileStatus(_file, {
          status: "success",
          percent: 100,
          response: res,
        });
        console.log("xxxx")
          setFiles((prevFiles) =>  { console.log(prevFiles) ;  return prevFiles}  )
        onSuccess(res.data,file); 
      }
      if(onChange)
     onChange(file);
   }).catch((err) => {
    if(onError){
      onError(err,file); 
      updateFileStatus(_file, {
        status: "error",
        error: err, 
      })
      setFiles((prevFiles) =>  { console.log(prevFiles) ;  return prevFiles}  )
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
  const handleRemove = (file: FileTypePro) => { 
    setFiles((prevFiles) => {
      return prevFiles.filter((item) => item.uid !== file.uid); // 过滤掉被删除的文件
    });
    if(onRemove) {
      onRemove(file); // 调用删除回调函数
    }
  }
    return (
        <div>
                <Button type="primary" onClick={handleClick}>上传文件</Button>
                <input type="file"  className="instant-upload-input" ref={inputRef}  onChange={handleChange }/>
                <UploadList fileList={files} onRemove={handleRemove}></UploadList>
        </div>
      );
}
 
export default Upload;