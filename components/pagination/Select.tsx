import * as React from 'react';
import type { SelectProps } from '../select';
import Select from '../select';

type CompoundedComponent = {
  Option?: typeof Select.Option;
};

const MiniSelect = (props: SelectProps & CompoundedComponent) => <Select {...props} size="small" />;
const MiddleSelect = (props: SelectProps & CompoundedComponent) => (
  <Select {...props} size="middle" />
);

MiniSelect.Option = Select.Option;
MiddleSelect.Option = Select.Option;

export { MiniSelect, MiddleSelect };
