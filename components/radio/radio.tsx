import * as React from 'react';
import PropTypes from 'prop-types';
import RcCheckbox from 'rc-checkbox';
import classNames from 'classnames';
import shallowEqual from 'shallowequal';
import RadioGroup from './group';
import RadioButton from './radioButton';
import { RadioProps, RadioGroupContext } from './interface';

export default class Radio extends React.Component<RadioProps, {}> {
  static Group: typeof RadioGroup;
  static Button: typeof RadioButton;

  static defaultProps = {
    prefixCls: 'ant-radio',
    type: 'radio',
  };

  static contextTypes = {
    radioGroup: PropTypes.any,
  };

  private rcCheckbox: any;

  shouldComponentUpdate(nextProps: RadioProps, nextState: {}, nextContext: RadioGroupContext) {
    return !shallowEqual(this.props, nextProps) ||
           !shallowEqual(this.state, nextState) ||
           !shallowEqual(this.context.radioGroup, nextContext.radioGroup);
  }

  focus() {
    this.rcCheckbox.focus();
  }

  blur() {
    this.rcCheckbox.blur();
  }

  saveCheckbox = (node: any) => {
    this.rcCheckbox = node;
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
      radioProps.name = radioGroup.name;
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
        <RcCheckbox
          {...radioProps}
          prefixCls={prefixCls}
          ref={this.saveCheckbox}
        />
        {children !== undefined ? <span>{children}</span> : null}
      </label>
    );
  }
}
