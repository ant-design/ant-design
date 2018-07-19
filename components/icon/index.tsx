import * as React from 'react';
import classNames from 'classnames';
import omit from 'omit.js';
import { antDesignIcons } from '@ant-design/icons';
import AntdIcon from '@ant-design/icons-react';
import CustomIcon, { create } from './CustomIcon';

AntdIcon.library.add(...antDesignIcons);

export interface IconProps {
  type: string;
  className?: string;
  title?: string;
  onClick?: React.MouseEventHandler<any>;
  spin?: boolean;
  style?: React.CSSProperties;
}

const Icon: React.SFC<IconProps> = (props: IconProps) => {
  const { type, className = '', spin } = props;
  const classString = classNames({
    anticon: true,
    'anticon-spin': !!spin || type === 'loading',
  }, className);
  return (
    <i className={classString}>
      <AntdIcon {...omit(props, ['type', 'spin'])} type={type} />
    </i>
  );
};

export type IconType = React.SFC<IconProps> & {
  CustomIcon: typeof CustomIcon;
  create: typeof create;
};

(Icon as IconType).CustomIcon = CustomIcon;
(Icon as IconType).create = create;

export default Icon as IconType;
