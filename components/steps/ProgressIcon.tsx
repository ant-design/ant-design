import * as React from 'react';
import cls from 'classnames';

export interface ProgressIconProps {
  prefixCls: string;
  children?: React.ReactNode;
  percent: number;
}

export default function ProgressIcon(props: ProgressIconProps) {
  const { prefixCls, children, percent } = props;

  const progressCls = `${prefixCls}-item-progress-icon`;
  const circleCls = `${progressCls}-circle`;

  const dashArray = `calc(var(--progress-r) * 2 * ${(Math.PI * percent) / 100}) 9999`;

  return (
    <>
      <svg
        className={`${progressCls}-svg`}
        viewBox={`0 0 100 100`}
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle className={cls(circleCls, `${circleCls}-rail`)} />
        <circle
          className={cls(circleCls, `${circleCls}-ptg`)}
          strokeDasharray={dashArray}
          transform="rotate(-90 50 50)"
        />
      </svg>
      {children}
    </>
  );
}
