import * as React from 'react';
import type {
  SegmentedLabeledOption as RcSegmentedLabeledOption,
  SegmentedProps as RCSegmentedProps,
  SegmentedValue as RcSegmentedValue,
  SegmentedRawOption,
} from '@rc-component/segmented';
import RcSegmented from '@rc-component/segmented';
import useId from '@rc-component/util/lib/hooks/useId';
import { clsx } from 'clsx';

import useMergeSemantic from '../_util/hooks/useMergeSemantic';
import type { SemanticClassNamesType, SemanticStylesType } from '../_util/hooks/useMergeSemantic';
import useOrientation from '../_util/hooks/useOrientation';
import type { Orientation } from '../_util/hooks/useOrientation';
import { useComponentConfig } from '../config-provider/context';
import useSize from '../config-provider/hooks/useSize';
import type { SizeType } from '../config-provider/SizeContext';
import Tooltip from '../tooltip';
import type { TooltipProps } from '../tooltip';
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

export type SegmentedClassNamesType = SemanticClassNamesType<SegmentedProps, SemanticName>;
export type SegmentedStylesType = SemanticStylesType<SegmentedProps, SemanticName>;

export interface SegmentedProps<ValueType = RcSegmentedValue>
  extends Omit<
    RCSegmentedProps<ValueType>,
    'size' | 'options' | 'itemRender' | 'styles' | 'classNames'
  > {
  rootClassName?: string;
  options: SegmentedOptions<ValueType>;
  /** Option to fit width to its parent's width */
  block?: boolean;
  /** Option to control the display size */
  size?: SizeType;
  vertical?: boolean;
  orientation?: Orientation;
  classNames?: SegmentedClassNamesType;
  styles?: SegmentedStylesType;
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
    orientation,
    shape = 'default',
    name = defaultName,
    styles,
    classNames: segmentedClassNames,
    ...restProps
  } = props;

  const {
    getPrefixCls,
    direction,
    className: contextClassName,
    style: contextStyle,
    classNames: contextClassNames,
    styles: contextStyles,
  } = useComponentConfig('segmented');

  const mergedProps: SegmentedProps = {
    ...props,
    options,
    size: customSize,
    shape,
  };
  const [mergedClassNames, mergedStyles] = useMergeSemantic<
    SegmentedClassNamesType,
    SegmentedStylesType,
    SegmentedProps
  >([contextClassNames, segmentedClassNames], [contextStyles, styles], undefined, {
    props: mergedProps,
  });

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
                  className={clsx(`${prefixCls}-item-icon`, mergedClassNames.icon)}
                  style={mergedStyles.icon}
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
    [options, prefixCls, mergedClassNames.icon, mergedStyles.icon],
  );

  const [, mergedVertical] = useOrientation(orientation, vertical);

  const cls = clsx(
    className,
    rootClassName,
    contextClassName,
    mergedClassNames.root,
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
    ...mergedStyles.root,
    ...contextStyle,
    ...style,
  };

  const itemRender = (node: React.ReactNode, { item }: { item: SegmentedLabeledOption }) => {
    if (!item.tooltip) {
      return node;
    }

    const tooltipProps: TooltipProps =
      typeof item.tooltip === 'object' ? item.tooltip : { title: item.tooltip };
    return <Tooltip {...tooltipProps}>{node}</Tooltip>;
  };

  return (
    <RcSegmented
      {...restProps}
      name={name}
      className={cls}
      style={mergedStyle}
      classNames={{
        label: mergedClassNames.label,
        item: mergedClassNames.item,
      }}
      styles={{
        item: mergedStyles.item,
        label: mergedStyles.label,
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
