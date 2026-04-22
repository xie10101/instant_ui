export interface FormState {
  isValid: boolean;
  isSumbitting: boolean;
  errors: ValidateError[];
}

export interface FieldState {
  [key: string]: FieldDetail;
}

export interface FieldDetail {
  name: string;
  value?: any;
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
    value?: any;
    label?: string;
    isValid?: boolean;
    errors?: ValidateError[];
    rules?: CoustomRule[];
  };
}

export type GetFieldValue = (key: string) => any;
//返回的RuleItem包含async-validator-异步校验器类型
export type CustomRuleFunc = (helpers: {
  getFieldValue: GetFieldValue;
}) => RuleItem;

export type CoustomRule = RuleItem | CustomRuleFunc;

import { useReducer, useState } from 'react';
import Schema from 'async-validator';
//  针对 规则和错误结构应该获取特定 ：
import { RuleItem, ValidateError } from 'async-validator';

/**
 * @returns 表单数据维护和校验逻辑处理的useHook
 */
function useStore() {
  const [form, setForm] = useState<FormState>({
    isValid: true,
    isSumbitting: false,
    errors: [],
  });
  const [fields, dispatch] = useReducer(fieldsReducer, {}); // 设置初识状态

  const validateForm = async (name: string) => {
    // 自定义rule的回调参数-之后
    const getFieldValue = (key: string) => {
      return fields[key] && fields[key].value;
    };

    //  转换验证规则
    const transfromRules = (rules: CoustomRule[]) => {
      return rules.map((rule) => {
        if (typeof rule == 'function') {
          const calledRule = rule({ getFieldValue }); // 使用到了闭包方式在异步校验器中获取到了其他控件的value
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
        dispatch({
          type: 'validated',
          name,
          actionValue: {
            name,
            isValid: true,
            errors: [],
          },
        });
      })
      .catch(({ errors }) => {
        const isValid = false;
        dispatch({
          type: 'validated',
          name,
          actionValue: {
            name,
            isValid,
            errors: errors,
          },
        });
      })
      .finally(() => {
        console.log('校验结束');
      });
  };

  //  待完成
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

/**
 *
 * @param state fields
 * @param action 表单项的设置
 * @returns
 */

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

/**
 * 用户输入确认密码
        ↓
  触发 onBlur → 调用 validateForm
        ↓
  transfromRules 执行函数规则，注入 getFieldValue
        ↓
  创建 Schema → 执行 asyncValidator
        ↓
  callback('密码不一致') → dispatch 更新 errors 状态
        ↓
  FormItem 显示错误提示
 */
