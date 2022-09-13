import type React from 'react';
import type Group from './FloatButtonGroup';
import type BackTop from '../back-top';
import type { TooltipProps } from '../tooltip';

type FloatButtonType = 'default' | 'primary';

type FloatButtonShape = 'circle' | 'square';

type FloatButtonGroupTrigger = 'click' | 'hover';

export interface FloatButtonProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  icon?: React.ReactNode;
  description?: string;
  type?: FloatButtonType;
  shape?: FloatButtonShape;
  tooltip?: TooltipProps['title'];
  href?: string;
  target?: React.HTMLAttributeAnchorTarget;
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
}

export interface FloatButtonContentProps {
  icon: FloatButtonProps['icon'];
  description: FloatButtonProps['description'];
  prefixCls: FloatButtonProps['prefixCls'];
  shape: FloatButtonProps['shape'];
  type: FloatButtonProps['type'];
  CSSMotionClassName?: string;
}

export interface FloatButtonGroupProps extends FloatButtonProps {
  // 包含的 Float Button
  children?: React.ReactElement;
  // 触发方式 (有触发方式为菜单模式）
  trigger?: FloatButtonGroupTrigger;
  // 受控展开
  open?: boolean;
  // 展开收起的回调
  onOpenChange?: (open: boolean) => void;
}

export interface CompoundedComponent {
  Group: typeof Group;
  BackTop: typeof BackTop;
}
