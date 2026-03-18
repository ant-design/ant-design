import * as React from 'react';
import { Tag } from 'antd';
import type { TagProps } from 'antd';

// https://github.com/umijs/dumi/blob/master/src/client/theme-default/builtins/Badge/index.tsx
interface BadgeProps extends TagProps {
  type: 'info' | 'warning' | 'error' | 'success';
}

const colorMap = {
  info: 'blue',
  warning: 'orange',
  error: 'red',
  success: 'green',
};

const Badge: React.FC<BadgeProps> = (props) => {
  const { type = 'info', style, children, ...rest } = props;
  return (
    <Tag
      variant="filled"
      color={colorMap[type]}
      style={{ verticalAlign: 'top', ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export default Badge;
