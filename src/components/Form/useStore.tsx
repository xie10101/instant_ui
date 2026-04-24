export interface FormState {
  isValid: boolean;
  isSumbitting: boolean;
  errors: Record<string, ValidateError[]>;
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

// 针对自定义规则函数- 回调类型
export type GetFieldValue = (key: string) => any;
//返回的RuleItem包含async-validator-异步校验器类型
export type CustomRuleFunc = (helpers: {
  getFieldValue: GetFieldValue;
}) => RuleItem;

export type CoustomRule = RuleItem | CustomRuleFunc;

//  主要认知 -- 为啥该类型继承Error 原始类型
export interface ValidateErrorType extends Error {
  fields: Record<string, ValidateError[]>;
  errors: ValidateError[];
}

import { useReducer, useState } from 'react';
import Schema from 'async-validator';
//  针对 规则和错误结构应该获取特定 ：
import { RuleItem, ValidateError } from 'async-validator';
import lodash, { each } from 'lodash';

/**
 * @returns 表单数据维护和校验逻辑处理的useHook
 */
function useStore(initialValues?: Record<string, any>) {
  const [form, setForm] = useState<FormState>({
    isValid: true,
    errors: {},
    isSumbitting: false,
  });
  const [fields, dispatch] = useReducer(fieldsReducer, {}); // 设置初识状态

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
  /**
   * 验证表单字段
   *
   */
  const validateForm = async (name: string) => {
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
      .finally(() => {});
  };

  const validateAllFields = async () => {
    let isValid = true;
    let errors: Record<string, ValidateError[]> = {};

    // 对当前的fields 处理
    const descriptors = lodash.mapValues(fields, (field) => {
      if (field.rules) {
        return transfromRules(field.rules);
      } else {
        return {};
      }
    });

    const validateItems = lodash.mapValues(fields, (field) => {
      return field.value;
    });
    console.log(validateItems, descriptors);
    const validator = new Schema(descriptors);
    setForm((pre) => {
      return { ...pre, isSumbitting: true };
    });
    try {
      await validator.validate(validateItems);
    } catch (e) {
      console.log(e);
      isValid = false;
      const err = e as ValidateErrorType; // 设置该类型会帮助之后的参数选择/配合TS提示
      errors = err.fields;
      lodash.each(fields, (value, name) => {
        // 这段的逻辑再思考
        const err = errors[name];
        if (err) {
          dispatch({
            type: 'validated',
            name,
            actionValue: {
              name,
              isValid: false,
              errors: err,
            },
          });
        } else if (fields[name].rules && fields[name].rules.length > 0) {
          dispatch({
            type: 'validated',
            name,
            actionValue: {
              name,
              errors: [],
            },
          });
        }
      });
    } finally {
      setForm((pre) => {
        return {
          ...pre,
          isSumbitting: false,
          isValid,
        };
      });
      // 返回部分信息
    }
    return {
      isValid,
      errors,
      values: validateItems,
    };
  };

  // 向外暴露多种操作方法 ：
  const getFieldsValue = () => {
    return lodash.mapValues(fields, (field) => {
      return field.value;
    });
  };

  const setFieldsValue = (newFields: Record<string, any>) => {
    /**
     * 更新表单字段值
     * @param value - 字段的新值
     * @param name - 字段名称
     */
    lodash.each(newFields, (value, name) => {
      if (!fields[name]) return;
      dispatch({
        type: 'updatefield',
        name,
        actionValue: {
          name,
          value,
        },
      });
    });
  };

  const resetFields = () => {
    if (initialValues) {
      lodash.each(initialValues, (value, name) => {
        if (fields[name]) {
          dispatch({
            type: 'updatefield',
            name,
            actionValue: {
              name,
              value,
            },
          });
        }
      });
    }
  };
  return {
    form,
    fields,
    dispatch,
    setForm,
    validateForm,
    validateAllFields,
    getFieldsValue,
    setFieldsValue,
    resetFields,
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
