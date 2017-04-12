import React, { PropTypes } from 'react';
import classNames from 'classnames';
import RcCheckbox from 'rc-checkbox';
import PureRenderMixin from 'rc-util/lib/PureRenderMixin';
import CheckboxGroup from './Group';

export interface AbstractCheckboxProps {
  prefixCls?: string;
  className?: string;
  defaultChecked?: boolean;
  checked?: boolean;
  style?: React.CSSProperties;
  disabled?: boolean;
  onChange?: React.FormEventHandler<any>;
  onMouseEnter?: React.MouseEventHandler<any>;
  onMouseLeave?: React.MouseEventHandler<any>;
  value?: any;
}

export interface CheckboxProps extends AbstractCheckboxProps {
  indeterminate?: boolean;
}

export default class Checkbox extends React.Component<CheckboxProps, any> {
  static Group: typeof CheckboxGroup;
  static defaultProps = {
    prefixCls: 'ant-checkbox',
    indeterminate: false,
  };
  shouldComponentUpdate(...args) {
    return PureRenderMixin.shouldComponentUpdate.apply(this, args);
  }
  render() {
    const {
      prefixCls, style, children, className, indeterminate,
      onMouseEnter, onMouseLeave, ...restProps,
     } = this.props;
    const classString = classNames(className, {
      [`${prefixCls}-wrapper`]: true,
    });
    const checkboxClass = classNames({
      [`${prefixCls}-indeterminate`]: indeterminate,
    });
    return (
      <label
        className={classString}
        style={style}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <RcCheckbox
          {...restProps}
          prefixCls={prefixCls}
          className={checkboxClass}
          children={null}
        />
        {children !== undefined ? <span>{children}</span> : null}
      </label>
    );
  }
}
