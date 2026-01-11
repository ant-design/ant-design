import * as React from 'react';
import { clsx } from 'clsx';

import { genCssVar } from '../theme/util/genStyleUtils';

export interface ProgressIconProps {
  prefixCls: string;
  rootPrefixCls: string;
  percent: number;
}

const ProgressIcon: React.FC<React.PropsWithChildren<ProgressIconProps>> = (props) => {
  const { prefixCls, rootPrefixCls, children, percent } = props;

  const progressCls = `${prefixCls}-item-progress-icon`;
  const circleCls = `${progressCls}-circle`;

  const [, varRef] = genCssVar(rootPrefixCls, '_steps_'); // TODO: change `_steps_` to `steps`

  const dashArray = `calc(${varRef('progress-radius')} * 2 * ${(Math.PI * percent) / 100}) 9999`;

  return (
    <>
      <svg
        className={`${progressCls}-svg`}
        viewBox="0 0 100 100"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={percent}
      >
        <title>Progress</title>
        <circle className={clsx(circleCls, `${circleCls}-rail`)} />
        <circle
          className={clsx(circleCls, `${circleCls}-ptg`)}
          strokeDasharray={dashArray}
          transform="rotate(-90 50 50)"
        />
      </svg>
      {children}
    </>
  );
};

export default ProgressIcon;
