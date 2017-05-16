import React from 'react';
import PropTypes from 'prop-types';
import RcRadio from 'rc-radio';
import classNames from 'classnames';
import shallowEqual from 'shallowequal';
import { AbstractCheckboxProps } from '../checkbox/Checkbox';
import RadioGroup from './group';
import RadioButton from './radioButton';

export type RadioProps = AbstractCheckboxProps;

export default class Radio extends React.Component<RadioProps, any> {
  static Group: typeof RadioGroup;
  static Button: typeof RadioButton;

  static defaultProps = {
    prefixCls: 'ant-radio',
  };

  static contextTypes = {
    radioGroup: PropTypes.any,
  };

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return !shallowEqual(this.props, nextProps) ||
           !shallowEqual(this.state, nextState) ||
           !shallowEqual(this.context.radioGroup, nextContext.radioGroup);
  }

  render() {
    const { props, context } = this;
    const {
      prefixCls,
      className,
      children,
      style,
      ...restProps,
    } = props;
    const { radioGroup } = context;
    let radioProps: RadioProps = { ...restProps };
    if (radioGroup) {
      radioProps.onChange = radioGroup.onChange;
      radioProps.checked = props.value === radioGroup.value;
      radioProps.disabled = props.disabled || radioGroup.disabled;
    }
    const wrapperClassString = classNames(className, {
      [`${prefixCls}-wrapper`]: true,
      [`${prefixCls}-wrapper-checked`]: radioProps.checked,
      [`${prefixCls}-wrapper-disabled`]: radioProps.disabled,
    });

    return (
      <label
        className={wrapperClassString}
        style={style}
        onMouseEnter={props.onMouseEnter}
        onMouseLeave={props.onMouseLeave}
      >
        <RcRadio
          {...radioProps}
          prefixCls={prefixCls}
        />
        {children !== undefined ? <span>{children}</span> : null}
      </label>
    );
  }
}
