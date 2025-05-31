import { useState, useEffect, useRef } from 'react';
import Input from '../Input/Input';
import { InputProps } from '../Input/Input';
import './_style.scss';
import Icon from '../Icon/Icon';
import useDebounce from '../../hooks/UseDebouce';
import classNames from 'classnames';
import useClickOut from '../../hooks/UseClickOut';
export interface AutoCompleteProps<T = object>
  extends Omit<InputProps, 'onSelect'> {
  value?: string;
  onSelect?: (value: ItemType<T>) => void;
  filterOption?: (inputValue: string) => ItemType<T>[] | Promise<ItemType<T>[]>; //输入框内容作为参数传给用户进行处理-返回值在组件内部处理
  ///此处返回值 是否决定了最终过滤结果    ? -- 异步处理 --
  renderOption?: (item: ItemType<T>) => React.ReactNode; // 传递给用户的函数 - 用于渲染列表项的模版
}

// 设置列表项的类型- 泛型设置 ：// 其中数据项中一定存在 value属性
type ListItemType = {
  value: string;
};
export type ItemType<T = object> = T & ListItemType;

const AutoComplete = <T = object,>(props: AutoCompleteProps<T>) => {
  const {
    onSelect,
    filterOption,
    value = '',
    renderOption,
    ...restProps
  } = props;
  const [inputValue, setInputValue] = useState(value); // 受控组件
  const [suggestions, setSuggestions] = useState<ItemType<T>[]>([]); // 过滤后的选项
  const [loading, setLoading] = useState(false); // 加载状态
  const debounceData = useDebounce(inputValue, 300); // 防抖后的值
  const [heightIndex, setHeightIndex] = useState(0); //高亮选中值绑定
  const contentRef = useRef<HTMLDivElement>(null);
  const selectedRef = useRef<boolean>(false); // 选中项的引用
  const inputRef = useRef<HTMLInputElement>(null);

  console.log(inputRef.current);
  useClickOut(contentRef, () => {
    setSuggestions([]); // 点击外部时清空建议列表
  });
  useEffect(() => {
    if (debounceData && filterOption && selectedRef.current) {
      const result = filterOption(debounceData); // 异步代码未执行完成时 返回的是一个状态为pending的Promise对象
      if (result instanceof Promise) {
        // 异步处理
        setLoading(true);
        // 此时异步函数如果没有返回不会执行以下的逻辑吗？  // then函数仅在 Promise 对象的状态为 resolved 时才会执行。
        result.then((data) => {
          //异步处理
          setSuggestions(data);
          setLoading(false);
          setHeightIndex(0); // 重置选中项的索引
        });
      } else {
        setSuggestions(result);
      }
    } else {
      setSuggestions([]);
    }
  }, [debounceData, filterOption]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 为空的处理
    // 监听 loading 状态变化
    selectedRef.current = true; // 取消选中状态
    const inputValue = e.target.value.trim();
    setInputValue(inputValue);
  };

  // 此处使用
  const handleSelect = (item: ItemType<T>) => {
    selectedRef.current = false; // 选中状态
    setInputValue(item.value); // 选择时 InputValue 赋值 之后的所有逻辑都被重新执行-
    setSuggestions([]);
    // 需要使用时 - 传递 参数 - value
    if (onSelect) {
      onSelect(item);
    }
  };

  const handleKeyChange = (index: number) => {
    if (index < 0) {
      index = suggestions.length - 1;
    }
    if (index >= suggestions.length) index = 0;
    setHeightIndex(index);
  };

  //  const inputRef = useRef<HTMLInputElement>(null);
  // 处理键盘事件 - 选择列表项
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // 取消输入框焦点 ：
    //输入框给-选项选中仅使用 上下 键
    switch (e.key) {
      case 'ArrowUp':
        handleKeyChange(heightIndex - 1);
        break;
      case 'ArrowDown':
        handleKeyChange(heightIndex + 1);
        break;
      case 'Enter':
        handleSelect(suggestions[heightIndex]);
        break;
      default:
        break;
    }
  };

  /**
   * 函数 用于 生成列表项渲染的模版
   * @returns
   */

  const renderTemplate = (item: ItemType<T>) => {
    if (renderOption) {
      // 传递给用户的函数 - 用于渲染列表项的模版
      return renderOption(item) ? renderOption(item) : item.value;
    } else {
      return item.value;
    }
  };
  //   查询后列表的函数生成
  const generateDropdown = () => {
    //  map循环实现 - 列表生成  -- 当数组 为空时回调不执行 - 不进行渲染 ：
    return (
      <ul className="instant-auto-complete-list">
        {suggestions.map((item, index) => {
          const classes = classNames('instant-auto-complete-item', {
            'is-active': index === heightIndex,
          });
          return (
            <li
              key={index}
              className={classes}
              onClick={() => handleSelect(item)}
            >
              {renderTemplate(item)}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <>
      <div className="instant-auto-complete" ref={contentRef}>
        <Input
          ref={inputRef}
          {...restProps}
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        {loading && (
          <ul className="instant-auto-complete-list">
            <div className="suggstions-loading-icon">
              <Icon icon={'spinner'} spin></Icon>{' '}
            </div>{' '}
          </ul>
        )}
        {suggestions.length > 0 && generateDropdown()}
      </div>
    </>
  );
};

export default AutoComplete;
