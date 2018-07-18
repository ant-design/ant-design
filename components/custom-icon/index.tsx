import * as React from 'react';
import classNames from 'classnames';
import { Omit } from '../_util/type';
import omit from 'omit.js';
import { IconProps } from '../icon';

export interface CustomIconProps extends Omit<IconProps, 'type'> {
  src?: string;
}

const CustomIcon: React.SFC<CustomIconProps> = (props) => {
  const { className = '', spin, src, children } = props;
  const classString = classNames({
    anticon: true,
    'anticon-spin': !!spin,
  }, className);

  if (typeof src === 'string' && src.length) {
    return (
      <object
        {...omit(props, ['spin'])}
        className={classString}
        width={'1em'}
        height={'1em'}
        fill={'currentColor'}
        type={'image/svg+xml'}
        aria-hidden={'true'}
        data={src}
      />
    );
  }

  return (
    <svg
      {...omit(props, ['spin'])}
      className={classString}
      width={'1em'}
      height={'1em'}
      fill={'currentColor'}
      aria-hidden={'true'}
    >
      {children}
    </svg>
  );
};

export default CustomIcon;
