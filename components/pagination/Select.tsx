import * as React from 'react';

import Select, { type SelectProps } from '../select';

type CompoundedComponent = React.FC<SelectProps> & {
  Option: typeof Select.Option;
};

const MiniSelect: CompoundedComponent = (props) => <Select {...props} showSearch size="small" />;
const MiddleSelect: CompoundedComponent = (props) => <Select {...props} showSearch size="middle" />;

MiniSelect.Option = Select.Option;
MiddleSelect.Option = Select.Option;

export { MiniSelect, MiddleSelect };
