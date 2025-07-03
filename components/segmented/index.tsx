import * as React from 'react';
import type {
  SegmentedLabeledOption as RcSegmentedLabeledOption,
  SegmentedProps as RCSegmentedProps,
  SegmentedValue as RcSegmentedValue,
  SegmentedRawOption,
} from '@rc-component/segmented';
import RcSegmented from '@rc-component/segmented';
import useId from '@rc-component/util/lib/hooks/useId';
import omit from '@rc-component/util/lib/omit';
import { Tooltip, TooltipProps } from 'antd';
import classNames from 'classnames';

import useOrientation from '../_util/hooks/useOrientation';
import type { Orientation } from '../_util/hooks/useOrientation';
import { useComponentConfig } from '../config-provider/context';
import useSize from '../config-provider/hooks/useSize';
import type { SizeType } from '../config-provider/SizeContext';
import useStyle from './style';

export type { SegmentedValue } from '@rc-component/segmented';
export type SemanticName = 'root' | 'icon' | 'label' | 'item';

interface SegmentedLabeledOptionWithoutIcon<ValueType = RcSegmentedValue>
  extends RcSegmentedLabeledOption<ValueType> {
  label: RcSegmentedLabeledOption['label'];
  tooltip?: string | Omit<TooltipProps, 'children'>;
}

interface SegmentedLabeledOptionWithIcon<ValueType = RcSegmentedValue>
  extends Omit<RcSegmentedLabeledOption<ValueType>, 'label'> {
  label?: RcSegmentedLabeledOption['label'];
  /** Set icon for Segmented item */
  icon: React.ReactNode;
  tooltip?: string | Omit<TooltipProps, 'children'>;
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
  orientation?: Orientation;
  classNames?: Partial<Record<SemanticName, string>>;
  styles?: Partial<Record<SemanticName, React.CSSProperties>>;
  shape?: 'default' | 'round';
}

type InternalSegmentedProps = Omit<SegmentedProps, 'itemRender'>;

const InternalSegmented = React.forwardRef<HTMLDivElement, InternalSegmentedProps>((props, ref) => {
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
    orientation,
    shape = 'default',
    name = defaultName,
    styles,
    classNames: segmentedClassNames,
    ...rest
  } = props;

  const restProps = omit(rest as RCSegmentedProps, ['itemRender']);
  const {
    getPrefixCls,
    direction,
    className: contextClassName,
    style: contextStyle,
    classNames: contextClassNames,
    styles: contextStyles,
  } = useComponentConfig('segmented');
  const prefixCls = getPrefixCls('segmented', customizePrefixCls);
  // Style
  const [hashId, cssVarCls] = useStyle(prefixCls);

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
                <span
                  className={classNames(
                    `${prefixCls}-item-icon`,
                    contextClassNames.icon,
                    segmentedClassNames?.icon,
                  )}
                  style={{
                    ...contextStyles.icon,
                    ...styles?.icon,
                  }}
                >
                  {icon}
                </span>
                {label && <span>{label}</span>}
              </>
            ),
          };
        }
        return option;
      }),
    [options, prefixCls],
  );

  const [, mergedVertical] = useOrientation(orientation, vertical);

  const cls = classNames(
    className,
    rootClassName,
    contextClassName,
    segmentedClassNames?.root,
    contextClassNames.root,
    {
      [`${prefixCls}-block`]: block,
      [`${prefixCls}-sm`]: mergedSize === 'small',
      [`${prefixCls}-lg`]: mergedSize === 'large',
      [`${prefixCls}-vertical`]: mergedVertical,
      [`${prefixCls}-shape-${shape}`]: shape === 'round',
    },
    hashId,
    cssVarCls,
  );

  const mergedStyle: React.CSSProperties = {
    ...contextStyles.root,
    ...contextStyle,
    ...styles?.root,
    ...style,
  };

  const itemRender = (node: React.ReactNode, { item }: { item: SegmentedLabeledOption }) => {
    if (!item?.tooltip) return node;

    const tooltipProps: TooltipProps =
      typeof item.tooltip === 'object'
        ? { ...item.tooltip, children: node }
        : { title: item.tooltip, children: node };

    return <Tooltip {...tooltipProps} />;
  };

  return (
    <RcSegmented
      {...restProps}
      name={name}
      className={cls}
      style={mergedStyle}
      classNames={{
        label: classNames(segmentedClassNames?.label, contextClassNames.label),
        item: classNames(segmentedClassNames?.item, contextClassNames.item),
      }}
      styles={{
        item: { ...contextStyles.item, ...styles?.item },
        label: { ...contextStyles.label, ...styles?.label },
      }}
      itemRender={itemRender}
      options={extendedOptions}
      ref={ref}
      prefixCls={prefixCls}
      direction={direction}
      vertical={mergedVertical}
    />
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
