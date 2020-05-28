import * as React from 'react';
import Select from '../select';

interface MiniSelectInterface extends React.FC<any> {
  Option: typeof Select.Option;
}

const MiniSelect: MiniSelectInterface = props => <Select size="small" {...props} />;

MiniSelect.Option = Select.Option;

export default MiniSelect;
