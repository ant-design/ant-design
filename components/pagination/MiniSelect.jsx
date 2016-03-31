import React from 'react';
import Select from '../select';

export default class MiniSelect extends React.Component {
  static Option = Select.Option;

  render() {
    return <Select size="small" {...this.props} />;
  }
}
