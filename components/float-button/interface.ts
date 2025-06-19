import type React from 'react';

import type { BadgeProps } from '../badge';
import type { ButtonHTMLType } from '../button';
import type { ButtonSemanticName } from '../button/button';
import type { TooltipProps } from '../tooltip';

export type FloatButtonElement = HTMLAnchorElement & HTMLButtonElement;

export interface FloatButtonRef {
  nativeElement: FloatButtonElement | null;
}

export type FloatButtonType = 'default' | 'primary';

export type FloatButtonShape = 'circle' | 'square';

export type FloatButtonGroupTrigger = 'click' | 'hover';

export type FloatButtonBadgeProps = Omit<BadgeProps, 'status' | 'text' | 'title' | 'children'>;

export type FloatButtonSemanticName = ButtonSemanticName;

export interface FloatButtonProps extends React.DOMAttributes<FloatButtonElement> {
  // Style
  prefixCls?: string;
  className?: string;
  rootClassName?: string;
  style?: React.CSSProperties;
  classNames?: Partial<Record<FloatButtonSemanticName, string>>;
  styles?: Partial<Record<FloatButtonSemanticName, React.CSSProperties>>;

  // Others
  icon?: React.ReactNode;
  description?: React.ReactNode;
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

export interface FloatButtonContentProps extends React.DOMAttributes<HTMLDivElement> {
  className?: string;
  icon?: FloatButtonProps['icon'];
  description?: FloatButtonProps['description'];
  prefixCls: FloatButtonProps['prefixCls'];
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
