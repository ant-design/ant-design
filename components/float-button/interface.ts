import type React from 'react';

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
  tooltip?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export interface ContentProps {
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
