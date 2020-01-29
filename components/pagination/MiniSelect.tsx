import * as React from 'react';
import Select, { OptionProps } from '../select';

export default class MiniSelect extends React.Component<any, any> {
  static Option = Select.Option as React.ClassicComponentClass<OptionProps>;

  render() {
    return <Select size="small" {...this.props} />;
  }
}
