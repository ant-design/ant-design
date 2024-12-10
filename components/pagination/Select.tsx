import * as React from 'react';

import type { SelectProps } from '../select';
import Select from '../select';

type CompoundedComponent = React.FC<SelectProps> & {
  Option: typeof Select.Option;
};

const MiniSelect: CompoundedComponent = (props) => <Select showSearch {...props} size="small" />;
const MiddleSelect: CompoundedComponent = (props) => {
  return <Select showSearch {...props} size="middle" />;
};

MiniSelect.Option = Select.Option;
MiddleSelect.Option = Select.Option;

export { MiniSelect, MiddleSelect };
