import type * as React from 'react';

import type { Orientation } from '../_util/hooks';
import type { GenerateSemantic } from '../_util/hooks/semanticType';
import type { AbstractCheckboxProps } from '../checkbox/Checkbox';
import type { AbstractCheckboxGroupProps } from '../checkbox/Group';
import type { SizeType } from '../config-provider/SizeContext';

export type { CheckboxRef as RadioRef } from '@rc-component/checkbox';
export type RadioGroupButtonStyle = 'outline' | 'solid';
export type RadioGroupOptionType = 'default' | 'button';

export interface RadioGroupProps extends AbstractCheckboxGroupProps {
  defaultValue?: any;
  value?: any;
  onChange?: (e: RadioChangeEvent) => void;
  size?: SizeType;
  disabled?: boolean;
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
  name?: string;
  children?: React.ReactNode;
  id?: string;
  optionType?: RadioGroupOptionType;
  orientation?: Orientation;
  buttonStyle?: RadioGroupButtonStyle;
  onFocus?: React.FocusEventHandler<HTMLDivElement>;
  onBlur?: React.FocusEventHandler<HTMLDivElement>;
  block?: boolean;
  vertical?: boolean;
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
  block?: boolean;
}

export type RadioSemanticType = {
  classNames?: {
    root?: string;
    icon?: string;
    label?: string;
  };
  styles?: {
    root?: React.CSSProperties;
    icon?: React.CSSProperties;
    label?: React.CSSProperties;
  };
};

export type RadioSemanticAllType = GenerateSemantic<RadioSemanticType, RadioProps>;

export interface RadioProps extends AbstractCheckboxProps<RadioChangeEvent> {
  /**
   * Control the appearance for Radio to display as button or not
   *
   * @default 'default'
   * @internal
   */
  optionType?: RadioGroupOptionType;
  classNames?: RadioSemanticAllType['classNames'] | RadioSemanticAllType['classNamesFn'];
  styles?: RadioSemanticAllType['styles'] | RadioSemanticAllType['stylesFn'];
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
