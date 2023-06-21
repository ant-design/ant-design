import type React from 'react';
import type { BadgeProps } from '../badge';
import type { TooltipProps } from '../tooltip';
import type BackTop from './BackTop';
import type Group from './FloatButtonGroup';
import type PurePanel from './PurePanel';

export type FloatButtonType = 'default' | 'primary';

export type FloatButtonShape = 'circle' | 'square';

export type FloatButtonGroupTrigger = 'click' | 'hover';

export type FloatButtonBadgeProps = Omit<BadgeProps, 'status' | 'text' | 'title' | 'children'>;

export interface FloatButtonProps {
  prefixCls?: string;
  className?: string;
  rootClassName?: string;
  style?: React.CSSProperties;
  icon?: React.ReactNode;
  description?: React.ReactNode;
  type?: FloatButtonType;
  shape?: FloatButtonShape;
  tooltip?: TooltipProps['title'];
  href?: string;
  target?: React.HTMLAttributeAnchorTarget;
  badge?: FloatButtonBadgeProps;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

export interface FloatButtonContentProps extends React.DOMAttributes<HTMLDivElement> {
  className?: string;
  icon?: FloatButtonProps['icon'];
  description?: FloatButtonProps['description'];
  prefixCls: FloatButtonProps['prefixCls'];
}

export interface FloatButtonGroupProps extends FloatButtonProps {
  // 包含的 Float Button
  children: React.ReactNode;
  // 触发方式 (有触发方式为菜单模式）
  trigger?: FloatButtonGroupTrigger;
  // 受控展开
  open?: boolean;
  // 关闭按钮自定义图标
  closeIcon?: React.ReactNode;
  // 展开收起的回调
  onOpenChange?: (open: boolean) => void;
}

export interface BackTopProps extends Omit<FloatButtonProps, 'target'> {
  visibilityHeight?: number;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  target?: () => HTMLElement | Window | Document;
  prefixCls?: string;
  children?: React.ReactNode;
  className?: string;
  rootClassName?: string;
  style?: React.CSSProperties;
  duration?: number;
}

export type CompoundedComponent = React.ForwardRefExoticComponent<
  FloatButtonProps & React.RefAttributes<HTMLAnchorElement | HTMLButtonElement>
> & {
  Group: typeof Group;
  BackTop: typeof BackTop;
  _InternalPanelDoNotUseOrYouWillBeFired: typeof PurePanel;
};
