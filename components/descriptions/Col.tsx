import * as React from 'react';
import classNames from 'classnames';
import { DescriptionsItemProps } from './index';

interface ColProps {
  child: React.ReactElement<DescriptionsItemProps>;
  bordered: boolean;
  colon: boolean;
  type?: 'label' | 'content';
  layout?: 'horizontal' | 'vertical';
}

const Col: React.SFC<ColProps> = props => {
  const { child, bordered, colon, type, layout } = props;
  const { prefixCls, label, className, children, span = 1 } = child.props;
  const labelProps: any = {
    className: classNames(`${prefixCls}-item-label`, {
      [`${prefixCls}-item-colon`]: colon,
      [`${prefixCls}-item-no-label`]: !label,
    }),
    key: 'label',
  };
  if (layout === 'vertical') {
    labelProps.colSpan = span * 2 - 1;
  }

  if (bordered) {
    if (type === 'label') {
      return <th {...labelProps}>{label}</th>;
    }
    return (
      <td
        className={classNames(`${prefixCls}-item-content`, className)}
        key="content"
        colSpan={span * 2 - 1}
      >
        {children}
      </td>
    );
  }
  if (layout === 'vertical') {
    if (type === 'content') {
      return (
        <td colSpan={span} className={classNames(`${prefixCls}-item`, className)}>
          <span className={`${prefixCls}-item-content`} key="content">
            {children}
          </span>
        </td>
      );
    }
    return (
      <td colSpan={span} className={classNames(`${prefixCls}-item`, className)}>
        <span
          className={classNames(`${prefixCls}-item-label`, { [`${prefixCls}-item-colon`]: colon })}
          key="label"
        >
          {label}
        </span>
      </td>
    );
  }
  return (
    <td colSpan={span} className={classNames(`${prefixCls}-item`, className)}>
      <span {...labelProps}>{label}</span>
      <span className={`${prefixCls}-item-content`} key="content">
        {children}
      </span>
    </td>
  );
};

export default Col;
