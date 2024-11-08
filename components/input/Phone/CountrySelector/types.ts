import type { GetProp, SelectProps } from 'antd';
import type { CountryCode } from 'libphonenumber-js';

export type Value = CountryCode;
export type Option = {
  value: Value;
  label: string;
  emoji?: string;
};

export type CustomOption = {
  value: Value;
  label?: string;
  emoji?: string;
};

type TypedSelectProps = SelectProps<Value, Option>;

export type Options = GetProp<TypedSelectProps, 'options'>;

export type OptionRender = GetProp<TypedSelectProps, 'optionRender'>;
export type FilterOption = GetProp<TypedSelectProps, 'filterOption'>;
export type OnSelect = GetProp<TypedSelectProps, 'onSelect'>;
