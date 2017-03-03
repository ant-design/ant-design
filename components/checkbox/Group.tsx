import React from 'react';
import classNames from 'classnames';
import Checkbox from './index';
import PureRenderMixin from 'rc-util/lib/PureRenderMixin';

export interface CheckboxOptionType {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface CheckboxGroupProps {
  /** 默认选中的选项 */
  defaultValue?: Array<string>;
  /** 指定选中的选项 */
  value?: Array<string>;
  /** 指定可选项 */
  options?: Array<CheckboxOptionType> | Array<string>;
  /** 变化时回调函数 */
  onChange?: (checkedValue: Array<string>) => void;
  disabled?: boolean;
  style?: React.CSSProperties;
  prefixCls?: string;
  className?: string;
}

export interface CheckboxGroupState {
  value: any;
}

export default class CheckboxGroup extends React.Component<CheckboxGroupProps, CheckboxGroupState> {
  static defaultProps = {
    options: [],
    prefixCls: 'ant-checkbox-group',
  };
  static propTypes = {
    defaultValue: React.PropTypes.array,
    value: React.PropTypes.array,
    options: React.PropTypes.array.isRequired,
    onChange: React.PropTypes.func,
  };
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || props.defaultValue || [],
     };
  }
  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        value: nextProps.value || [],
      });
    }
  }
  shouldComponentUpdate(...args) {
    return PureRenderMixin.shouldComponentUpdate.apply(this, args);
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
  toggleOption = (option) => {
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
    const { prefixCls, className } = this.props;
    const options = this.getOptions().map(option =>
      <Checkbox
        disabled={'disabled' in option ? option.disabled : this.props.disabled}
        checked={this.state.value.indexOf(option.value) !== -1}
        onChange={() => this.toggleOption(option)}
        className={`${prefixCls}-item`}
        key={option.value}
      >
        {option.label}
      </Checkbox>
    );

    const classString = classNames(prefixCls, className);
    return (
      <div className={classString}>
        {options}
      </div>
    );
  }
}
