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

export default ({ type = 'info', ...props }: BadgeProps) => (
  <Tag
    variant="filled"
    color={colorMap[type]}
    {...props}
    style={{ verticalAlign: 'top', ...props.style }}
  />
);
