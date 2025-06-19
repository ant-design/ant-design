import React from 'react';
import FileTextOutlined from '@ant-design/icons/FileTextOutlined';
import omit from '@rc-component/util/lib/omit';
import cls from 'classnames';

import convertToTooltipProps from '../_util/convertToTooltipProps';
import useMergeSemantic from '../_util/hooks/useMergeSemantic';
import { useZIndex } from '../_util/hooks/useZIndex';
import { devUseWarning } from '../_util/warning';
import Badge from '../badge';
import Button from '../button';
import type { ConfigConsumerProps } from '../config-provider';
import { ConfigContext } from '../config-provider';
import useCSSVarCls from '../config-provider/hooks/useCSSVarCls';
import Tooltip from '../tooltip';
import type BackTop from './BackTop';
import { GroupContext } from './context';
import Content from './FloatButtonContent';
import type FloatButtonGroup from './FloatButtonGroup';
import type { FloatButtonElement, FloatButtonProps, FloatButtonShape } from './interface';
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
    // htmlType = 'button',
    badge = {},
    classNames,
    styles,
    ...restProps
  } = props;
  const { getPrefixCls, direction } = React.useContext(ConfigContext);
  const groupContext = React.useContext(GroupContext);
  const prefixCls = getPrefixCls(floatButtonPrefixCls, customizePrefixCls);
  const rootCls = useCSSVarCls(prefixCls);

  const { shape: contextShape, individual: contextIndividual } = groupContext || {};

  const mergedShape = contextShape || shape;
  const mergedIndividual = contextIndividual ?? true;

  // ============================ Styles ============================
  const [hashId, cssVarCls] = useStyle(prefixCls, rootCls);

  const floatButtonClassNames: FloatButtonProps['classNames'] = React.useMemo(
    () => ({
      icon: `${prefixCls}-icon`,
      content: `${prefixCls}-content`,
    }),
    [prefixCls],
  );

  const [mergedClassNames, mergedStyles] = useMergeSemantic(
    [
      floatButtonClassNames,
      // contextClassNames,
      classNames,
    ],
    [
      // contextStyles,
      styles,
    ],
  );

  // ============================= Icon =============================
  const mergedIcon = !description && !icon ? <FileTextOutlined /> : icon;

  // ============================ zIndex ============================
  const [zIndex] = useZIndex('FloatButton', style?.zIndex as number);

  const mergedStyle: React.CSSProperties = { ...style, zIndex };

  // 虽然在 ts 中已经 omit 过了，但是为了防止多余的属性被透传进来，这里再 omit 一遍，以防万一
  const badgeProps = omit(badge, ['title', 'children', 'status', 'text'] as any[]);

  // let buttonNode = (
  //   <div className={`${prefixCls}-body`}>
  //     <Content prefixCls={prefixCls} description={description} icon={icon} />
  //   </div>
  // );

  // if ('badge' in props) {
  //   buttonNode = <Badge {...badgeProps}>{buttonNode}</Badge>;
  // }

  // =========================== Tooltip ============================
  const tooltipProps = convertToTooltipProps(tooltip);
  // if (tooltipProps) {
  //   buttonNode = <Tooltip {...tooltipProps}>{buttonNode}</Tooltip>;
  // }

  // =========================== Warning ============================
  if (process.env.NODE_ENV !== 'production') {
    const warning = devUseWarning('FloatButton');

    warning(
      !(shape === 'circle' && description),
      'usage',
      'supported only when `shape` is `square`. Due to narrow space for text, short sentence is recommended.',
    );
  }

  // return props.href ? (
  //   <a ref={ref} {...restProps} className={classString} style={mergedStyle}>
  //     {buttonNode}
  //   </a>
  // ) : (
  //   <button ref={ref} {...restProps} className={classString} style={mergedStyle} type={htmlType}>
  //     {buttonNode}
  //   </button>
  // );

  // ============================ Render ============================
  let node = (
    <Button
      {...restProps}
      ref={ref}
      // Styles
      className={cls(
        hashId,
        cssVarCls,
        rootCls,
        prefixCls,
        className,
        rootClassName,
        `${prefixCls}-${type}`,
        // `${prefixCls}-${mergedShape}`,
        {
          [`${prefixCls}-rtl`]: direction === 'rtl',
          [`${prefixCls}-individual`]: mergedIndividual,
          [`${prefixCls}-icon-only`]: !description,
        },
      )}
      classNames={mergedClassNames}
      styles={mergedStyles}
      style={mergedStyle}
      shape={mergedShape}
      // Others
      type={type}
      size="large"
      icon={mergedIcon}
      _skipSemantic
    >
      {/* {buttonNode} */}
      {description}
    </Button>
  );

  if (tooltipProps) {
    node = <Tooltip {...tooltipProps}>{node}</Tooltip>;
  }

  return node;
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
