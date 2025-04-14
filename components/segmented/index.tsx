import * as React from 'react';
import classNames from 'classnames';
import type {
  SegmentedLabeledOption as RcSegmentedLabeledOption,
  SegmentedProps as RCSegmentedProps,
  SegmentedValue as RcSegmentedValue,
  SegmentedRawOption,
} from 'rc-segmented';
import RcSegmented from 'rc-segmented';
import useId from 'rc-util/lib/hooks/useId';

import { useComponentConfig } from '../config-provider/context';
import useSize from '../config-provider/hooks/useSize';
import type { SizeType } from '../config-provider/SizeContext';
import useStyle from './style';

export type { SegmentedValue } from 'rc-segmented';

interface SegmentedLabeledOptionWithoutIcon<ValueType = RcSegmentedValue>
  extends RcSegmentedLabeledOption<ValueType> {
  label: RcSegmentedLabeledOption['label'];
}

interface SegmentedLabeledOptionWithIcon<ValueType = RcSegmentedValue>
  extends Omit<RcSegmentedLabeledOption<ValueType>, 'label'> {
  label?: RcSegmentedLabeledOption['label'];
  /** Set icon for Segmented item */
  icon: React.ReactNode;
}

function isSegmentedLabeledOptionWithIcon(
  option: SegmentedRawOption | SegmentedLabeledOptionWithIcon | SegmentedLabeledOptionWithoutIcon,
): option is SegmentedLabeledOptionWithIcon {
  return typeof option === 'object' && !!(option as SegmentedLabeledOptionWithIcon)?.icon;
}

export type SegmentedLabeledOption<ValueType = RcSegmentedValue> =
  | SegmentedLabeledOptionWithIcon<ValueType>
  | SegmentedLabeledOptionWithoutIcon<ValueType>;

export type SegmentedOptions<T = SegmentedRawOption> = (T | SegmentedLabeledOption<T>)[];

export interface SegmentedProps<ValueType = RcSegmentedValue>
  extends Omit<RCSegmentedProps<ValueType>, 'size' | 'options'> {
  rootClassName?: string;
  options: SegmentedOptions<ValueType>;
  /** Option to fit width to its parent's width */
  block?: boolean;
  /** Option to control the display size */
  size?: SizeType;
  vertical?: boolean;
  shape?: 'default' | 'round';
}

const InternalSegmented = React.forwardRef<HTMLDivElement, SegmentedProps>((props, ref) => {
  const defaultName = useId();

  const {
    prefixCls: customizePrefixCls,
    className,
    rootClassName,
    block,
    options = [],
    size: customSize = 'middle',
    style,
    vertical,
    shape = 'default',
    name = defaultName,
    ...restProps
  } = props;

  const {
    getPrefixCls,
    direction,
    className: contextClassName,
    style: contextStyle,
  } = useComponentConfig('segmented');
  const prefixCls = getPrefixCls('segmented', customizePrefixCls);
  // Style
  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls);

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
    contextClassName,
    {
      [`${prefixCls}-block`]: block,
      [`${prefixCls}-sm`]: mergedSize === 'small',
      [`${prefixCls}-lg`]: mergedSize === 'large',
      [`${prefixCls}-vertical`]: vertical,
      [`${prefixCls}-shape-${shape}`]: shape === 'round',
    },
    hashId,
    cssVarCls,
  );

  const mergedStyle: React.CSSProperties = { ...contextStyle, ...style };

  return wrapCSSVar(
    <RcSegmented
      {...restProps}
      name={name}
      className={cls}
      style={mergedStyle}
      options={extendedOptions}
      ref={ref}
      prefixCls={prefixCls}
      direction={direction}
      vertical={vertical}
    />,
  );
});

const Segmented = InternalSegmented as (<ValueType>(
  props: SegmentedProps<ValueType> & React.RefAttributes<HTMLDivElement>,
) => ReturnType<typeof InternalSegmented>) &
  Pick<React.FC, 'displayName'>;

if (process.env.NODE_ENV !== 'production') {
  Segmented.displayName = 'Segmented';
}

export default Segmented;
