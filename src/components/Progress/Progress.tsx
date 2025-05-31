// 进度条组件设置
// import classNames from "classnames";
import React, { FC } from 'react';
import { ThemeProps } from './../Icon/Icon';
import './_style.scss';
interface ProgressProps {
  percent: number;
  showText?: boolean;
  strokeHeight?: number;
  styles?: React.CSSProperties;
  theme?: ThemeProps;
}

const Progress: FC<ProgressProps> = (props) => {
  const {
    percent = 0,
    showText = true,
    strokeHeight = 15,
    styles,
    theme = 'primary',
  } = props;

  return (
    <>
      <div className={`instant-progress`}>
        <div
          className="instant-progress-outer"
          style={{ height: `${strokeHeight}px`, ...styles }}
        >
          <div
            className={`instant-progress-inner instant-progress-${theme}`}
            style={{ width: `${percent}%` }}
          >
            <span className="inner-text"> {showText && `${percent}`}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Progress;
