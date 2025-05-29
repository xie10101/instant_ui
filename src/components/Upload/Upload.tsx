// 上传组件的实现：
import axios from 'axios';
import Button from '../Button/Button';
import { FC, useRef } from 'react';
import { AxiosResponse } from 'axios';
import { useState } from 'react';
import UploadList from './UploadList';
import './_style.scss';
// File 文件类型

export interface UploadProps {
  defaultFileList?: FileTypePro[]; // 默认文件列表
  action: string; // 上传的地址
  onProgress?: (percent: number, file: FileTypePro) => void;
  onSuccess?: (data: AxiosResponse, file: FileTypePro) => void;
  onError?: (error: Error, file: FileTypePro) => void;

  /**
   * 验证转换处理 ？
   * 1. 上传地址是否合法
   * 2. 上传文件的类型是否合法
   *
   * onChange
   */
  beforeUpload?: (File: FileTypePro) => boolean | Promise<File>; // 上传前的回调函数
  onChange?: (file: FileTypePro, filelist: FileTypePro[]) => void;
  onRemove?: (file: FileTypePro) => void; // 删除文件的回调函数
  headers: { [key: string]: any }; // 上传的请求头 ： //  Record<string,string>
  //   表示一个对象 其中属性值为any类型
  name?: string; // 上传的文件的name属性
  multiple?: boolean; // 是否支持多选文件
  accept?: string;
  withCredentials?: boolean; // 是否携带cookie
  data?: { [key: string]: any }; // 上传的请求体 ： //  Record<string,string>
}

//创建单个文件对象类型：
type FileType = 'ready' | 'uploading' | 'success' | 'error';
export interface FileTypePro {
  uid?: string;
  name: string;
  status?: FileType; // 上传状态：uploading / done / error
  size: number; // 上传成功后的地址
  percent?: number; // 上传进度
  url?: string; // 上传成功后的地址  -- 图片一般可以使用 - 文件下载可以使用 ?
  raw?: File; // 原始文件对象
  error?: Error; // 上传失败的错误信息
  response?: AxiosResponse; // 上传成功的响应信息
}

const Upload: FC<UploadProps> = (props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    action,
    onProgress,
    onSuccess,
    onError,
    beforeUpload,
    onChange,
    defaultFileList,
    onRemove,
    accept,
    name = 'file',
    multiple,
    data,
    headers,
    withCredentials,
  } = props;

  const [files, setFiles] = useState<FileTypePro[]>(defaultFileList || []); // 文件列表状态管理

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return; // 没有选择文件  -- null /undefined 类型守卫同时判断
    const fileList = Array.from(e.target.files);
    // 实际上传前的回调执行 ：
    if (beforeUpload) {
      const result = beforeUpload(fileList[0]);
      if (result instanceof Promise) {
        // 异步的情况 ：
        result.then((fileData) => {
          // 上传成功的回调
          post(fileData); // 调用上传请求
        });
      } else if (result === false) {
        // 同步失败的回调
        return; // 阻止上传
      } // 同步成功的回调
      else {
        post(fileList[0]); // 调用上传请求
      }
    }
    fileList.forEach((file) => {
      post(file); // 调用上传请求
    });
    /**
     * 单个file对象具有的属性：
     * 1. name
     * 2. size
     * 3. type
     * 4. lastModified -- 最后修改的时间戳
     */
  };

  /**
   *
   * @param file 当前文件对象- 可以不是最新值
   * @param status  - 需要修改更新的文件属性
   */
  const updateFileStatus = (
    file: FileTypePro,
    changeObj: Partial<FileTypePro>
  ) => {
    setFiles((prevFiles) => {
      return prevFiles.map((item) => {
        // 遍历文件列表 ：
        if (item.uid === file.uid) {
          // 找到对应的文件对象
          return { ...item, ...changeObj }; // 更新文件对象  -  关键 扩展运算时的覆盖问题
        }

        return item; // 没有找到对应的文件对象 ：
      });
    });
  };
  // 上传请求单独封装 :
  const post = (file: File) => {
    const _file = {
      uid: `${Date.now()}-${file.name}`, // 生成一个唯一的id
      name: file.name, // 文件名
      status: 'ready' as FileType, // 上传状态：uploading / done / error
      size: file.size, // 上传成功后的地址
      raw: file, // 原始文件对象
    };
    setFiles((prevFiles) => [...prevFiles, _file as FileTypePro]); // 此处获取到的是最新值

    const formData = new FormData(); // 创建一个FormData对象 --类型数据键值对
    formData.append(name || 'file', file!, name); // 此处上传的为文件对象时 参数为 文件名
    //  上传请求 ：
    if (data) {
      for (const key in data) {
        // 遍历data对象 ：
        formData.append(key, data[key]); // 将data对象中的属性添加到formData对象中 ：
      }
    }
    axios
      .post(action, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // 告诉服务器上传的是文件数据
          ...headers,
        },
        withCredentials,
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total && onProgress) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            if (percentCompleted < 100)
              // 更新对象状态
              updateFileStatus(_file, {
                status: 'uploading',
                percent: percentCompleted,
              });
            setFiles((prevFiles) => {
              console.log(prevFiles);
              return prevFiles;
            });
            onProgress(percentCompleted, _file);
          }
        },
      })
      .then((res) => {
        if (onSuccess) {
          updateFileStatus(_file, {
            status: 'success',
            percent: 100,
            response: res,
          });
          console.log('xxxx');
          setFiles((prevFiles) => {
            console.log(prevFiles);
            return prevFiles;
          });
          onSuccess(res.data, _file);
        }
        if (onChange) onChange(_file, files);
      })
      .catch((err) => {
        if (onError) {
          onError(err, _file);
          updateFileStatus(_file, {
            status: 'error',
            error: err,
          });
          setFiles((prevFiles) => {
            console.log(prevFiles);
            return prevFiles;
          });
        }
        if (onChange) onChange(_file, files);
      });
  };

  const handleClick = () => {
    //触发input的点击:
    if (inputRef.current) {
      inputRef.current.click(); // 触发input的点击事件
    }
  };
  const handleRemove = (file: FileTypePro) => {
    setFiles((prevFiles) => {
      return prevFiles.filter((item) => item.uid !== file.uid); // 过滤掉被删除的文件
    });
    if (onRemove) {
      onRemove(file); // 调用删除回调函数
    }
  };
  return (
    <div>
      <Button type="primary" onClick={handleClick}>
        上传文件
      </Button>
      <input
        type="file"
        className="instant-upload-input"
        ref={inputRef}
        multiple={multiple}
        accept={accept}
        onChange={handleChange}
      />
      <UploadList fileList={files} onRemove={handleRemove}></UploadList>
    </div>
  );
};

export default Upload;
