import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import shallowEqual from 'shallowequal';
import Checkbox from './Checkbox';

export type CheckboxValueType = string | number;

export interface CheckboxOptionType {
  label: string;
  value: CheckboxValueType;
  disabled?: boolean;
}

export interface AbstractCheckboxGroupProps {
  prefixCls?: string;
  className?: string;
  options?: Array<CheckboxOptionType | string>;
  disabled?: boolean;
  style?: React.CSSProperties;
}

export interface CheckboxGroupProps extends AbstractCheckboxGroupProps {
  defaultValue?: Array<CheckboxValueType>;
  value?: Array<CheckboxValueType>;
  onChange?: (checkedValue: Array<CheckboxValueType>) => void;
}

export interface CheckboxGroupState {
  value: any;
}

export interface CheckboxGroupContext {
  checkboxGroup: {
    toggleOption: (option: CheckboxOptionType) => void;
    value: any;
    disabled: boolean;
  };
}

export default class CheckboxGroup extends React.Component<CheckboxGroupProps, CheckboxGroupState> {
  static defaultProps = {
    options: [],
    prefixCls: 'ant-checkbox',
  };

  static propTypes = {
    defaultValue: PropTypes.array,
    value: PropTypes.array,
    options: PropTypes.array.isRequired,
    onChange: PropTypes.func,
  };

  static childContextTypes = {
    checkboxGroup: PropTypes.any,
  };

  constructor(props: CheckboxGroupProps) {
    super(props);
    this.state = {
      value: props.value || props.defaultValue || [],
     };
  }

  getChildContext() {
    return {
      checkboxGroup: {
        toggleOption: this.toggleOption,
        value: this.state.value,
        disabled: this.props.disabled,
      },
    };
  }

  componentWillReceiveProps(nextProps: CheckboxGroupProps) {
    if ('value' in nextProps) {
      this.setState({
        value: nextProps.value || [],
      });
    }
  }
  shouldComponentUpdate(nextProps: CheckboxGroupProps, nextState: CheckboxGroupState) {
    return !shallowEqual(this.props, nextProps) ||
      !shallowEqual(this.state, nextState);
  }
  getOptions() {
    const { options } = this.props;
    // https://github.com/Microsoft/TypeScript/issues/7960
    return (options as Array<CheckboxOptionType>).map(option => {
      if (typeof option === 'string') {
        return {
          label: option,
          value: option,
        } as CheckboxOptionType;
      }
      return option;
    });
  }
  toggleOption = (option: CheckboxOptionType) => {
    const optionIndex = this.state.value.indexOf(option.value);
    const value = [...this.state.value];
    if (optionIndex === - 1) {
      value.push(option.value);
    } else {
      value.splice(optionIndex, 1);
    }
    if (!('value' in this.props)) {
      this.setState({ value });
    }
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(value);
    }
  }
  render() {
    const { props, state } = this;
    const { prefixCls, className, style, options } = props;
    const groupPrefixCls = `${prefixCls}-group`;
    let children = props.children;
    if (options && options.length > 0) {
      children = this.getOptions().map(option => (
        <Checkbox
          prefixCls={prefixCls}
          key={option.value}
          disabled={'disabled' in option ? option.disabled : props.disabled}
          value={option.value}
          checked={state.value.indexOf(option.value) !== -1}
          onChange={() => this.toggleOption(option)}
          className={`${groupPrefixCls}-item`}
        >
          {option.label}
        </Checkbox>
      ));
    }

    const classString = classNames(groupPrefixCls, className);
    return (
      <div className={classString} style={style}>
        {children}
      </div>
    );
  }
}
