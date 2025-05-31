// 已上传文件列表单独组件 ：
import { FC } from 'react';
import { FileTypePro } from './Upload'; // 引入文件类型定义
import Icon from '../Icon/Icon';
import Progress from '../Progress/Progress';
interface UploadListProps {
  fileList?: FileTypePro[]; // 文件列表
  onRemove?: (file: FileTypePro) => void; // 删除文件的回调函数
}

const UploadList: FC<UploadListProps> = (props) => {
  const { fileList = [], onRemove } = props; // 默认文件列表为空数组

  const handleRemove = (file: FileTypePro) => {
    if (onRemove) {
      onRemove(file); // 调用删除回调函数
    }
  };
  return (
    <>
      <ul className="instant-upload-list">
        {fileList.map(
          (
            file // 遍历文件列表 ：
          ) => (
            <div key={file.uid}>
              <li className="instant-upload-list-item">
                <span style={{ flex: 1 }}>
                  <Icon icon="file" style={{ marginRight: '0.5rem' }}></Icon>
                  {file.name}
                </span>
                <span className="instant-upload-list-item-status">
                  {file.status === 'uploading' && (
                    <Icon icon="spinner" spin></Icon>
                  )}
                  {file.status === 'success' && (
                    <Icon icon="check-circle" theme="success"></Icon>
                  )}
                  {file.status === 'error' && (
                    <Icon icon="times-circle" theme="danger"></Icon>
                  )}
                </span>
                <span className="instant-upload-list-item-remove">
                  <Icon
                    icon="times-circle"
                    onClick={() => handleRemove(file)}
                  ></Icon>
                  {/*注意易错处  
                        1. 组件的onClick事件中不能直接调用函数 ：onClick={handleRemove(file)}  -- 会立即执行 ：\
                        2. 当函数不需要参数时可以直接传递函数引用：onClick={handleRemove}-- 不会立即执行 -当做 函数引用传递 
                        3. 存在参数 使用 箭头函数 处理 
                      */}
                </span>
              </li>
              <Progress percent={file.percent as number}></Progress>
            </div>
          )
        )}
      </ul>
    </>
  );
};

export default UploadList;
