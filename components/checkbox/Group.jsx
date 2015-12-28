import React from 'react';
import Checkbox from './index';

export default React.createClass({
  getDefaultProps() {
    return {
      options: [],
      onChange() {},
    };
  },
  propTypes: {
    defaultValue: React.PropTypes.array,
    value: React.PropTypes.array,
    options: React.PropTypes.array.isRequired,
    onChange: React.PropTypes.func,
  },
  getInitialState() {
    const { value, defaultValue } = this.props;
    return {
      value: value || defaultValue || [],
    };
  },
  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        value: nextProps.value,
      });
    }
  },
  toggleOption(option) {
    const optionIndex = this.state.value.indexOf(option);
    const value = this.state.value;
    if (optionIndex === - 1) {
      value.push(option);
    } else {
      value.splice(optionIndex, 1);
    }
    if (!('value' in this.props)) {
      this.setState({ value });
    }
    this.props.onChange(value);
  },
  render() {
    const options = this.props.options;
    return <div className="ant-checkbox-group">
      {
        options.map(option =>
          <label className="ant-checkbox-group-item" key={option}>
            <Checkbox disabled={this.props.disabled}
            checked={this.state.value.indexOf(option) !== -1}
            onChange={this.toggleOption.bind(this, option)} />
            {option}
          </label>
        )
      }
    </div>;
  },
});
