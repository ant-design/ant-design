import * as React from 'react';
import Icon from '../icon';
import classNames from 'classnames';

export default function InputIcon(props: { suffixIcon: React.ReactNode; prefixCls: string }) {
  const { suffixIcon, prefixCls } = props;
  return (
    (suffixIcon &&
      (React.isValidElement<{ className?: string }>(suffixIcon) ? (
        React.cloneElement(suffixIcon, {
          className: classNames({
            [suffixIcon.props.className!]: suffixIcon.props.className,
            [`${prefixCls}-picker-icon`]: true,
          }),
        })
      ) : (
        <span className={`${prefixCls}-picker-icon`}>{suffixIcon}</span>
      ))) || <Icon type="calendar" className={`${prefixCls}-picker-icon`} />
  );
}
