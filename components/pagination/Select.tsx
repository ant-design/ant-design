import * as React from 'react';

import type { SelectProps } from '../select';
import Select from '../select';

type CompoundedComponent = React.FC<SelectProps> & {
  Option: typeof Select.Option;
};

export interface SelectContextProps {
  size?: SelectProps['size'];
  showSearch?: SelectProps['showSearch'];
}

const SelectContext = React.createContext<SelectContextProps>({});

const CustomSelect: CompoundedComponent = (props) => {
  const selectProps = React.useContext(SelectContext);
  return <Select {...props} {...selectProps} />;
};

CustomSelect.Option = Select.Option;

export { CustomSelect, SelectContext };
