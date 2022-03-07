import * as React from 'react';
import classNames from 'classnames';
import RcSegmented from 'rc-segmented';
import type {
  SegmentedProps as RCSegmentedProps,
  SegmentedRawOption,
  SegmentedLabeledOption as RcSegmentedLabeledOption,
} from 'rc-segmented';

import { ConfigContext } from '../config-provider';

export type { SegmentedValue } from 'rc-segmented';

export interface SegmentedLabeledOption extends RcSegmentedLabeledOption {
  /** Set icon for Segmented item */
  icon?: React.ReactNode;
}

export interface SegmentedProps extends RCSegmentedProps {
  options: (SegmentedRawOption | SegmentedLabeledOption)[];
  /** Option to fit width to its parent's width */
  block?: boolean;
}

const Segmented = React.forwardRef<HTMLDivElement, SegmentedProps>((props, ref) => {
  const { prefixCls: customizePrefixCls, className, block, options, ...restProps } = props;

  const { getPrefixCls, direction } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('segmented', customizePrefixCls);

  // syntactic sugar to support `icon` for Segmented Item
  const extendedOptions = React.useMemo(
    () =>
      options.map(option => {
        if (typeof option === 'object' && option?.icon) {
          const { icon, label, ...restOption } = option;
          return {
            ...restOption,
            label: (
              <>
                <span className={`${prefixCls}-item-icon`}>{icon}</span>
                <span>{label}</span>
              </>
            ),
          };
        }
        return option;
      }),
    [options, prefixCls],
  );

  return (
    <RcSegmented
      {...restProps}
      className={classNames(className, { [`${prefixCls}-block`]: block })}
      options={extendedOptions}
      ref={ref}
      prefixCls={prefixCls}
      direction={direction}
    />
  );
});

Segmented.displayName = 'Segmented';
Segmented.defaultProps = {
  options: [],
};

export default Segmented;
