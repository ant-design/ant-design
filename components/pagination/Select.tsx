import * as React from 'react';
import type { SelectProps } from '../select';
import Select from '../select';

const MiniSelect = (props: SelectProps) => <Select {...props} size="small" />;
const MiddleSelect = (props: SelectProps) => <Select {...props} size="middle" />;

MiniSelect.Option = Select.Option;
MiddleSelect.Option = Select.Option;

export { MiniSelect, MiddleSelect };
