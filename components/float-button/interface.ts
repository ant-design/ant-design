import type React from 'react';

import type { BadgeProps } from '../badge';
import type { ButtonHTMLType } from '../button';
import type { TooltipProps } from '../tooltip';

export type FloatButtonElement = HTMLAnchorElement & HTMLButtonElement;

export interface FloatButtonRef {
  nativeElement: FloatButtonElement | null;
}

export type FloatButtonType = 'default' | 'primary';

export type FloatButtonShape = 'circle' | 'square';

export type FloatButtonGroupTrigger = 'click' | 'hover';

export type FloatButtonBadgeProps = Omit<BadgeProps, 'status' | 'text' | 'title' | 'children'>;

export interface FloatButtonProps extends React.DOMAttributes<FloatButtonElement> {
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
  /**
   * @since 5.21.0
   * @default button
   */
  htmlType?: ButtonHTMLType;
  'aria-label'?: React.HtmlHTMLAttributes<HTMLElement>['aria-label'];
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
  // 菜单弹出方向
  placement?: 'top' | 'left' | 'right' | 'bottom';
  // 展开收起的回调
  onOpenChange?: (open: boolean) => void;
}

export interface BackTopProps extends Omit<FloatButtonProps, 'target'> {
  visibilityHeight?: number;
  onClick?: React.MouseEventHandler<FloatButtonElement>;
  target?: () => HTMLElement | Window | Document;
  prefixCls?: string;
  children?: React.ReactNode;
  className?: string;
  rootClassName?: string;
  style?: React.CSSProperties;
  duration?: number;
}
