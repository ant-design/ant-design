import classNames from 'classnames';
import type {
  SegmentedLabeledOption as RcSegmentedLabeledOption,
  SegmentedProps as RCSegmentedProps,
  SegmentedRawOption,
} from 'rc-segmented';
import RcSegmented from 'rc-segmented';
import * as React from 'react';
import { ConfigContext } from '../config-provider';
import useSize from '../config-provider/hooks/useSize';
import type { SizeType } from '../config-provider/SizeContext';
import useStyle from './style';

export type { SegmentedValue } from 'rc-segmented';

interface SegmentedLabeledOptionWithoutIcon extends RcSegmentedLabeledOption {
  label: RcSegmentedLabeledOption['label'];
}

interface SegmentedLabeledOptionWithIcon extends Omit<RcSegmentedLabeledOption, 'label'> {
  label?: RcSegmentedLabeledOption['label'];
  /** Set icon for Segmented item */
  icon: React.ReactNode;
}

function isSegmentedLabeledOptionWithIcon(
  option: SegmentedRawOption | SegmentedLabeledOptionWithIcon | SegmentedLabeledOptionWithoutIcon,
): option is SegmentedLabeledOptionWithIcon {
  return typeof option === 'object' && !!(option as SegmentedLabeledOptionWithIcon)?.icon;
}

export type SegmentedLabeledOption =
  | SegmentedLabeledOptionWithIcon
  | SegmentedLabeledOptionWithoutIcon;

export interface SegmentedProps extends Omit<RCSegmentedProps, 'size' | 'options'> {
  rootClassName?: string;
  options: (SegmentedRawOption | SegmentedLabeledOption)[];
  /** Option to fit width to its parent's width */
  block?: boolean;
  /** Option to control the display size */
  size?: SizeType;
}

const Segmented = React.forwardRef<HTMLDivElement, SegmentedProps>((props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    rootClassName,
    block,
    options = [],
    size: customSize = 'middle',
    style,
    ...restProps
  } = props;

  const { getPrefixCls, direction, segmented } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('segmented', customizePrefixCls);
  // Style
  const [wrapSSR, hashId] = useStyle(prefixCls);

  // ===================== Size =====================
  const mergedSize = useSize(customSize);

  // syntactic sugar to support `icon` for Segmented Item
  const extendedOptions = React.useMemo<RCSegmentedProps['options']>(
    () =>
      options.map((option) => {
        if (isSegmentedLabeledOptionWithIcon(option)) {
          const { icon, label, ...restOption } = option;
          return {
            ...restOption,
            label: (
              <>
                <span className={`${prefixCls}-item-icon`}>{icon}</span>
                {label && <span>{label}</span>}
              </>
            ),
          };
        }
        return option;
      }),
    [options, prefixCls],
  );

  const cls = classNames(
    className,
    rootClassName,
    segmented?.className,
    {
      [`${prefixCls}-block`]: block,
      [`${prefixCls}-sm`]: mergedSize === 'small',
      [`${prefixCls}-lg`]: mergedSize === 'large',
    },
    hashId,
  );

  const mergedStyle: React.CSSProperties = { ...segmented?.style, ...style };

  return wrapSSR(
    <RcSegmented
      {...restProps}
      className={cls}
      style={mergedStyle}
      options={extendedOptions}
      ref={ref}
      prefixCls={prefixCls}
      direction={direction}
    />,
  );
});

if (process.env.NODE_ENV !== 'production') {
  Segmented.displayName = 'Segmented';
}

export default Segmented;
