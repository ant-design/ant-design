import * as React from 'react';
import classNames from 'classnames';
import omit from 'omit.js';

export interface IconProps {
  type: string;
  className?: string;
  title?: string;
  onClick?: React.MouseEventHandler<any>;
  spin?: boolean;
  style?: React.CSSProperties;
}

const icon = (props: IconProps) => {
  const { type, className = '', spin } = props;
  const classString = classNames({
    anticon: true,
    'anticon-spin': !!spin || type === 'loading',
    [`anticon-${type}`]: true,
  }, className);
  return <i {...omit(props, ['type', 'spin'])} className={classString} />;
}

(icon as any).displayName = 'Icon';

export default icon;
