export interface FormState {
  isValid: boolean;
  isSumbitting: boolean;
  errors: ValidateError[];
  // 这个错误可能是一个
}

export interface FieldState {
  [key: string]: FieldDetail;
}

export interface FieldDetail {
  name: string;
  value: any;
  label?: string;
  isValid?: boolean;
  rules?: CoustomRule[];
  errors?: ValidateError[];
}
export interface FieldsAction {
  type: 'addfield' | 'updatefield' | 'validated';
  name: string;
  actionValue: {
    name: string;
    value: any;
    label?: string;
    isValid?: boolean;
    errors?: ValidateError[];
    rules?: CoustomRule[];
  };
}
export type GetFieldValue = (key: string) => any;

//外部对象类型也要设置类型补充
export type CustomRuleFunc = (helpers: {
  getFieldValue: GetFieldValue;
}) => RuleItem;

export type CoustomRule = RuleItem | CustomRuleFunc;
//对 除了value之外的属性设置 可选 - 因为 value输入时最频繁基础的操作

/**
 * 可能的数据结构 ：
 *   fields：{
 *   username: {
 *       name: username;
 *       label:xx
 *       value: xx
 *       rules:
 *       errors:
 *       isValid :
 *   }
 *  password:  {
 *   }
 * *  ……
 * }
 */

//  value数据提取规则 ：
// formItem可以获得、Form组件也可以获得
//  form中实现整体验证 , formItem实现单项验证
// 针对中间层：files 数据操作的主体设置 -- hooks更加便利
// react hooks **  / class - ant design form

import { useReducer, useState } from 'react';
import Schema from 'async-validator';
//  针对 规则和错误结构应该获取特定 ：
import { RuleItem, ValidateError } from 'async-validator';

//  设置一个hook 统一管理 表单数据
function useStore() {
  const [form, setForm] = useState<FormState>({
    isValid: true,
    isSumbitting: false,
    errors: [],
  });
  const [fields, dispatch] = useReducer(fieldsReducer, {}); // 设置初识状态

  //  设置一个验证回调函数

  const validateForm = async (name: string) => {
    /**
   *const descriptor = {
    name: {
      type: 'string',
      required: true,
      validator: (rule, value) => value === 'muji',
    },
   */
    // 自定义rule的回调参数-之后
    const getFieldValue = (key: string) => {
      return fields[key] && fields[key].value;
    };

    //  转换验证规则
    const transfromRules = (rules: CoustomRule[]) => {
      return rules.map((rule) => {
        if (typeof rule == 'function') {
          const calledRule = rule({ getFieldValue });
          return calledRule;
        }
        return rule;
      });
    };
    const { value, rules } = fields[name];
    const afterRules = transfromRules(rules!);
    //  校验规则
    const descriptor = {
      [name]: afterRules,
    };

    //  获取校验对象
    const validateItem = {
      [name]: value,
    };
    const validator = new Schema(descriptor);

    validator
      .validate(validateItem)
      .then((data) => {
        // 通过了更新 - errors为空 - isValid= true
        dispatch({
          type: 'validated',
          name,
          actionValue: {
            name,
            value: fields[name].value,
            isValid: true,
            errors: [],
          },
        });

        //   如果通过了
        // 是否可以简化 -- 初始值设置为 true ？
      })
      .catch(({ errors }) => {
        const isValid = false;
        console.log(errors);
        dispatch({
          type: 'validated',
          name,
          actionValue: {
            name,
            value: fields[name].value,
            isValid: isValid,
            errors: errors,
          },
        });
      })
      .finally(() => {
        console.log(' 最终 ');
      });
  };

  //表单整体验证逻辑
  /**
   *    先获取整体的规则 + values
   *     设置 validateAllFields 执行 整体验证
   *
   *  // 数据结构需要 进行的转变
   * {
   *   username : {
   *   value:"abc" , rules:R[]
   * }
   *  {username: value}
   *  {username : rules[]}
   * }
   */

  const validateAllFields = () => {
    const descriptors = {};
    const validateItems = {};
  };

  return {
    form,
    fields,
    dispatch,
    setForm,
    validateForm,
  };
}

function fieldsReducer(state: FieldState, action: FieldsAction): FieldState {
  switch (action.type) {
    case 'addfield':
      return { ...state, [action.name]: { ...action.actionValue } }; // 返回的值会被
    case 'updatefield':
      return {
        ...state,
        [action.name]: { ...state[action.name], ...action.actionValue },
      };
    case 'validated':
      return {
        ...state,
        [action.name]: { ...state[action.name], ...action.actionValue },
      };
    default:
      return state;
  }
}

export default useStore;
