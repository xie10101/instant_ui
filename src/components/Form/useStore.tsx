export interface FormState {
  isValid: boolean;
}

export interface FieldDetail {
  name: string;
  value: string;
  isValid: boolean;
  rules: any[];
  errors: any[];
}

export interface FieldState {
  [key: string]: FieldDetail;
}

// 对action—— 处理对象设置 类型 ：
export interface FieldsAction {
  type: 'addfield' | 'updatefield'; // 应该设置 字符串字面量联合型的 add
  name: string;
  value: any; // 包含多个  FieldDetail?
}

//  value数据提取规则 ：
// formItem可以获得、Form组件也可以获得
//  form中实现整体验证 , formItem实现单项验证

// 针对中间层：files 数据操作的主体设置 -- hooks更加便利
// react hooks **  / class - ant design form

import { useReducer, useState } from 'react';

//  设置一个hook 统一管理 表单数据
function useStore() {
  //  表单状态
  const [form, setForm] = useState<FormState>({
    isValid: true,
  });
  //   对 Fields 进行管理
  const [fields, dispatch] = useReducer(fieldsReducer, {}); // 设置初识状态

  //   存在对一种复杂数据结构的复杂操作 ：

  return {
    form,
    fields,
    dispatch,
    setForm,
  };
}

function fieldsReducer(state: FieldState, action: FieldsAction): FieldState {
  switch (action.type) {
    case 'addfield':
      return { ...state, [action.name]: { ...action.value } }; // 返回的值会被
    case 'updatefield':
      console.log(action.name, action.value);
      return {
        ...state,
        [action.name]: { ...state[action.name], value: action.value },
      };
    default:
      return state;
  }
}

export default useStore;
