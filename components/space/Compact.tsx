import classNames from 'classnames';
import toArray from 'rc-util/lib/Children/toArray';
import * as React from 'react';

import { ConfigContext } from '../config-provider';
import type { SizeType } from '../config-provider/SizeContext';

interface SpaceCompactItemContextType {
  size?: SizeType;
  direction?: 'horizontal' | 'vertical';
  isItem?: boolean;
  isFirstItem?: boolean;
  isLastItem?: boolean;
}

export const SpaceCompactItemContext = React.createContext<SpaceCompactItemContextType>({});

export interface SpaceCompactProps extends React.HTMLAttributes<HTMLDivElement> {
  prefixCls?: string;
  size?: SizeType;
  direction?: 'horizontal' | 'vertical';
}

const Compact: React.FC<SpaceCompactProps> = props => {
  const { getPrefixCls, direction: directionConfig } = React.useContext(ConfigContext);

  const {
    size = 'middle',
    direction,
    className,
    children,
    prefixCls: customizePrefixCls,
    ...otherProps
  } = props;

  const prefixCls = getPrefixCls('space-compact', customizePrefixCls);
  const clx = classNames(
    prefixCls,
    {
      [`${prefixCls}-rtl`]: directionConfig === 'rtl',
    },
    className,
  );

  const childNodes = toArray(children, { keepEmpty: true });

  const nodes = React.useMemo(
    () =>
      childNodes.map((child, i) => {
        const key = (child && child.key) || `${prefixCls}-item-${i}`;
        // FIXME:  更好实现？
        // eslint-disable-next-line react/jsx-no-constructed-context-values
        const value = {
          size,
          direction,
          isItem: true,
          isFirstItem: i === 0,
          isLastItem: i === childNodes.length - 1,
        };

        return (
          <React.Fragment key={key}>
            <SpaceCompactItemContext.Provider value={value}>
              {child}
            </SpaceCompactItemContext.Provider>
          </React.Fragment>
        );
      }),
    [size, childNodes],
  );

  // =========================== Render ===========================
  if (childNodes.length === 0) {
    return null;
  }

  return (
    <div className={clx} {...otherProps}>
      {nodes}
    </div>
  );
};

export default Compact;
