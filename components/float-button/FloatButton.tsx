import React from 'react';
import FileTextOutlined from '@ant-design/icons/FileTextOutlined';
import { omit } from '@rc-component/util';
import { clsx } from 'clsx';

import convertToTooltipProps from '../_util/convertToTooltipProps';
import { useMergeSemantic, useZIndex } from '../_util/hooks';
import type { SemanticClassNamesType, SemanticStylesType } from '../_util/hooks';
import { devUseWarning } from '../_util/warning';
import Badge from '../badge';
import type { BadgeProps } from '../badge';
import Button from '../button/Button';
import type { ButtonHTMLType } from '../button/buttonHelpers';
import type { ButtonSemanticName } from '../button/Button';
import { ConfigContext } from '../config-provider';
import useCSSVarCls from '../config-provider/hooks/useCSSVarCls';
import Tooltip from '../tooltip';
import type { TooltipProps } from '../tooltip';
import type BackTop from './BackTop';
import { GroupContext } from './context';
import type FloatButtonGroup from './FloatButtonGroup';
import type PurePanel from './PurePanel';
import useStyle from './style';

export type FloatButtonElement = HTMLAnchorElement & HTMLButtonElement;

export interface FloatButtonRef {
  nativeElement: FloatButtonElement | null;
}

export type FloatButtonType = 'default' | 'primary';

export type FloatButtonShape = 'circle' | 'square';

export type FloatButtonGroupTrigger = 'click' | 'hover';

export type FloatButtonBadgeProps = Omit<BadgeProps, 'status' | 'text' | 'title' | 'children'>;

export type FloatButtonSemanticName = ButtonSemanticName;

export type FloatButtonClassNamesType = SemanticClassNamesType<
  FloatButtonProps,
  FloatButtonSemanticName
>;
export type FloatButtonStylesType = SemanticStylesType<FloatButtonProps, FloatButtonSemanticName>;

export interface FloatButtonProps extends React.DOMAttributes<FloatButtonElement> {
  // Style
  prefixCls?: string;
  className?: string;
  rootClassName?: string;
  style?: React.CSSProperties;
  classNames?: FloatButtonClassNamesType;
  styles?: FloatButtonStylesType;

  // Others
  icon?: React.ReactNode;
  /** @deprecated Please use `content` instead. */
  description?: React.ReactNode;
  content?: React.ReactNode;
  type?: FloatButtonType;
  shape?: FloatButtonShape;
  tooltip?: React.ReactNode | TooltipProps;
  href?: string;
  target?: React.HTMLAttributeAnchorTarget;
  badge?: FloatButtonBadgeProps;
  /**
   * @since 5.21.0
   * @default button
   */
  htmlType?: ButtonHTMLType;
  'aria-label'?: React.HtmlHTMLAttributes<HTMLElement>['aria-label'];
}

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
    content,
    tooltip,
    badge = {},
    classNames,
    styles,
    ...restProps
  } = props;
  const { getPrefixCls, direction } = React.useContext(ConfigContext);
  const groupContext = React.useContext(GroupContext);
  const prefixCls = getPrefixCls(floatButtonPrefixCls, customizePrefixCls);
  const rootCls = useCSSVarCls(prefixCls);

  const {
    shape: contextShape,
    individual: contextIndividual,
    classNames: contextClassNames,
    styles: contextStyles,
  } = groupContext || {};

  const mergedShape = contextShape || shape;
  const mergedIndividual = contextIndividual ?? true;

  const mergedContent = content ?? description;

  // =========== Merged Props for Semantic ==========
  const mergedProps: FloatButtonProps = {
    ...props,
    type,
    shape: mergedShape,
  };

  // ============================ Styles ============================
  const [hashId, cssVarCls] = useStyle(prefixCls, rootCls);

  const floatButtonClassNames = React.useMemo<FloatButtonProps['classNames']>(
    () => ({ icon: `${prefixCls}-icon`, content: `${prefixCls}-content` }),
    [prefixCls],
  );

  const [mergedClassNames, mergedStyles] = useMergeSemantic<
    FloatButtonClassNamesType,
    FloatButtonStylesType,
    FloatButtonProps
  >([floatButtonClassNames, contextClassNames, classNames], [contextStyles, styles], {
    props: mergedProps,
  });

  // ============================= Icon =============================
  const mergedIcon = !mergedContent && !icon ? <FileTextOutlined /> : icon;

  // ============================ zIndex ============================

  const [zIndex] = useZIndex('FloatButton', style?.zIndex as number);

  const mergedStyle: React.CSSProperties = { ...style, zIndex };

  // ============================ Badge =============================
  // 虽然在 ts 中已经 omit 过了，但是为了防止多余的属性被透传进来，这里再 omit 一遍，以防万一
  const badgeProps = omit(badge, ['title', 'children', 'status', 'text'] as any[]) as typeof badge;

  const badgeNode = 'badge' in props && (
    <Badge
      {...badgeProps}
      className={clsx(badgeProps.className, `${prefixCls}-badge`, {
        [`${prefixCls}-badge-dot`]: badgeProps.dot,
      })}
    />
  );

  // =========================== Tooltip ============================
  const tooltipProps = convertToTooltipProps(tooltip);

  // =========================== Warning ============================
  if (process.env.NODE_ENV !== 'production') {
    const warning = devUseWarning('FloatButton');

    warning(
      !(mergedShape === 'circle' && mergedContent),
      'usage',
      'supported only when `shape` is `square`. Due to narrow space for text, short sentence is recommended.',
    );

    warning.deprecated(!description, 'description', 'content');
  }

  // ============================ Render ============================
  let node = (
    <Button
      {...restProps}
      ref={ref}
      // Styles
      className={clsx(
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
          [`${prefixCls}-individual`]: mergedIndividual,
          [`${prefixCls}-icon-only`]: !mergedContent,
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
      {mergedContent}
      {badgeNode}
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
