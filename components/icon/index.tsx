import * as React from 'react';
import classNames from 'classnames';
import omit from 'omit.js';
import { library, antDesignIcons } from 'antd-icons';
import AntdIcon from 'react-antd-icons';

library.add(...antDesignIcons);

export interface IconProps {
  type: string;
  className?: string;
  title?: string;
  onClick?: React.MouseEventHandler<any>;
  spin?: boolean;
  style?: React.CSSProperties;
}

const Icon = (props: IconProps) => {
  const { type, className = '', spin } = props;
  const classString = classNames({
    anticon: true,
    'anticon-spin': !!spin || type === 'loading',
  }, className);
  return <AntdIcon {...omit(props, ['spin'])} className={classString} />;
};

export default Icon;
