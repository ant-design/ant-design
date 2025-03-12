import React, { useContext, useMemo } from 'react';
import classNames from 'classnames';
import omit from 'rc-util/lib/omit';

import convertToTooltipProps from '../_util/convertToTooltipProps';
import { useZIndex } from '../_util/hooks/useZIndex';
import { devUseWarning } from '../_util/warning';
import Badge from '../badge';
import type { ConfigConsumerProps } from '../config-provider';
import { ConfigContext } from '../config-provider';
import useCSSVarCls from '../config-provider/hooks/useCSSVarCls';
import Tooltip, { TooltipProps } from '../tooltip';
import type BackTop from './BackTop';
import FloatButtonGroupContext from './context';
import Content from './FloatButtonContent';
import type FloatButtonGroup from './FloatButtonGroup';
import type {
  FloatButtonContentProps,
  FloatButtonElement,
  FloatButtonProps,
  FloatButtonShape,
} from './interface';
import type PurePanel from './PurePanel';
import useStyle from './style';

export const floatButtonPrefixCls = 'float-btn';

const InternalFloatButton = React.forwardRef<FloatButtonElement, FloatButtonProps>((props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    rootClassName,
    style,
    type = 'default',
    shape = 'circle',
    icon,
    description,
    tooltip,
    htmlType = 'button',
    badge = {},
    ...restProps
  } = props;
  const { getPrefixCls, direction } = useContext<ConfigConsumerProps>(ConfigContext);
  const groupShape = useContext<FloatButtonShape | undefined>(FloatButtonGroupContext);
  const prefixCls = getPrefixCls(floatButtonPrefixCls, customizePrefixCls);
  const rootCls = useCSSVarCls(prefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls, rootCls);

  const mergedShape = groupShape || shape;

  const classString = classNames(
    hashId,
    cssVarCls,
    rootCls,
    prefixCls,
    className,
    rootClassName,
    `${prefixCls}-${type}`,
    `${prefixCls}-${mergedShape}`,
    {
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
  );

  // ============================ zIndex ============================
  const [zIndex] = useZIndex('FloatButton', style?.zIndex as number);

  const mergedStyle: React.CSSProperties = { ...style, zIndex };

  // 虽然在 ts 中已经 omit 过了，但是为了防止多余的属性被透传进来，这里再 omit 一遍，以防万一
  const badgeProps = omit(badge, ['title', 'children', 'status', 'text'] as any[]);

  const contentProps = useMemo<FloatButtonContentProps>(
    () => ({ prefixCls, description, icon, type }),
    [prefixCls, description, icon, type],
  );

  let buttonNode = (
    <div className={`${prefixCls}-body`}>
      <Content {...contentProps} />
    </div>
  );

  if ('badge' in props) {
    buttonNode = <Badge {...badgeProps}>{buttonNode}</Badge>;
  }

  // ============================ Tooltip ============================
  let tooltipProps: TooltipProps | null = null;
  /**
   * 理论上直接 `const tooltipProps = convertToTooltipProps(tooltip);` 即可。同 Form.Item 的 tooltip 逻辑。
   * 但在 https://github.com/ant-design/ant-design/pull/39425 存在 tooltip 为 0 的 unit test，所以这里做了特殊处理。
   */
  if (tooltip === 0) {
    tooltipProps = { title: tooltip };
    if (process.env.NODE_ENV !== 'production') {
      const warning = devUseWarning('FloatButton');
      warning(
        false,
        'usage',
        'The `tooltip` value is `0`(number). If you want to show `0`, please use string `"0"` instead.',
      );
    }
  } else {
    tooltipProps = convertToTooltipProps(tooltip);
  }

  if (tooltipProps) {
    buttonNode = <Tooltip {...tooltipProps}>{buttonNode}</Tooltip>;
  }

  if (process.env.NODE_ENV !== 'production') {
    const warning = devUseWarning('FloatButton');

    warning(
      !(shape === 'circle' && description),
      'usage',
      'supported only when `shape` is `square`. Due to narrow space for text, short sentence is recommended.',
    );
  }

  return wrapCSSVar(
    props.href ? (
      <a ref={ref} {...restProps} className={classString} style={mergedStyle}>
        {buttonNode}
      </a>
    ) : (
      <button ref={ref} {...restProps} className={classString} style={mergedStyle} type={htmlType}>
        {buttonNode}
      </button>
    ),
  );
});

type CompoundedComponent = typeof InternalFloatButton & {
  Group: typeof FloatButtonGroup;
  BackTop: typeof BackTop;
  _InternalPanelDoNotUseOrYouWillBeFired: typeof PurePanel;
};

const FloatButton = InternalFloatButton as CompoundedComponent;

if (process.env.NODE_ENV !== 'production') {
  FloatButton.displayName = 'FloatButton';
}

export default FloatButton;
