import React from 'react';
import Checkbox from '../index';

export default React.createClass({
  propTypes: {
    value: React.PropTypes.array.isOptional,
    options: React.PropTypes.array.isRequired,
    onChange: React.PropTypes.any.isOptional,
  },
  getInitialState() {
    const value = this.props.value ? this.props.value.slice() : [];

    return { value };
  },
  componentWillReceiveProps(nextProps) {
    const value = nextProps.value ? nextProps.value.slice() : [];
    this.setState({ value });
  },
  toggleOption(option, e) {
    e.preventDefault();
    const optionIndex = this.state.value.indexOf(option);
    const value = this.state.value.slice();
    if (optionIndex === - 1) {
      value.push(option);
    } else {
      value.splice(optionIndex, 1);
    }
    this.setState({ value });
    return this.props.onChange && this.props.onChange(value.slice());
  },
  render() {
    const options = this.props.options;
    return (<div className='ant-checkbox-group'>
      {options.map(option =>
        [<Checkbox disabled={this.props.disabled} checked={this.state.value.indexOf(option) !== -1} onChange={this.toggleOption.bind(this, option)}/>, option])
      }
    </div>);
  },
});
