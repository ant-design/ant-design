import React from 'react';
import Checkbox from './index';

export default class CheckboxGroup extends React.Component {
  static defaultProps = {
    options: [],
    defaultValue: [],
    onChange() {},
  }
  static propTypes = {
    defaultValue: React.PropTypes.array,
    value: React.PropTypes.array,
    options: React.PropTypes.array.isRequired,
    onChange: React.PropTypes.func,
  }
  constructor(props) {
    super(props);
    let value;
    if ('value' in props) {
      value = props.value || [];
    } else if ('defaultValue' in props) {
      value = props.defaultValue || [];
    }
    this.state = { value };
  }
  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        value: nextProps.value || [],
      });
    }
  }
  getOptions() {
    const { options } = this.props;
    return options.map(option => {
      if (typeof option === 'string') {
        return {
          label: option,
          value: option,
        };
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
    this.props.onChange(value);
  }
  render() {
    const options = this.getOptions();
    return (
      <div className="ant-checkbox-group">
        {
          options.map(option =>
            <Checkbox disabled={'disabled' in option ? option.disabled : this.props.disabled}
              checked={this.state.value.indexOf(option.value) !== -1}
              onChange={() => this.toggleOption(option)}
              className="ant-checkbox-group-item" key={option.value}>
              {option.label}
            </Checkbox>
          )
        }
      </div>
    );
  }
}
