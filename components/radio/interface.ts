import type * as React from 'react';
import type { AbstractCheckboxProps } from '../checkbox/Checkbox';
import type { AbstractCheckboxGroupProps } from '../checkbox/Group';
import type { DisabledType } from '../config-provider/DisabledContext';
import type { SizeType } from '../config-provider/SizeContext';

export type RadioGroupButtonStyle = 'outline' | 'solid';
export type RadioGroupOptionType = 'default' | 'button';

export interface RadioGroupProps extends AbstractCheckboxGroupProps {
  defaultValue?: any;
  value?: any;
  onChange?: (e: RadioChangeEvent) => void;
  size?: SizeType;
  disabled?: DisabledType;
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
  name?: string;
  children?: React.ReactNode;
  id?: string;
  optionType?: RadioGroupOptionType;
  buttonStyle?: RadioGroupButtonStyle;
  onFocus?: React.FocusEventHandler<HTMLDivElement>;
  onBlur?: React.FocusEventHandler<HTMLDivElement>;
}

export interface RadioGroupContextProps {
  onChange: (e: RadioChangeEvent) => void;
  value: any;
  disabled?: boolean;
  name?: string;
  /**
   * Control the appearance for Radio to display as button or not
   *
   * @default 'default'
   * @internal
   */
  optionType?: RadioGroupOptionType;
}

export interface RadioProps extends AbstractCheckboxProps<RadioChangeEvent> {
  /**
   * Control the appearance for Radio to display as button or not
   *
   * @default 'default'
   * @internal
   */
  optionType?: RadioGroupOptionType;
}

export interface RadioChangeEventTarget extends RadioProps {
  checked: boolean;
}

export interface RadioChangeEvent {
  target: RadioChangeEventTarget;
  stopPropagation: () => void;
  preventDefault: () => void;
  nativeEvent: MouseEvent;
}

export type RadioOptionTypeContextProps = RadioGroupOptionType;
