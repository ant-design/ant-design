import type * as React from 'react';
import Group from './group';
import type { RadioProps } from './interface';
import InternalRadio from './radio';
import Button from './radioButton';

export {
  RadioChangeEvent,
  RadioChangeEventTarget,
  RadioGroupButtonStyle,
  RadioGroupContextProps,
  RadioGroupOptionType,
  RadioGroupProps,
  RadioProps,
} from './interface';
export { Button, Group };
interface CompoundedComponent
  extends React.ForwardRefExoticComponent<RadioProps & React.RefAttributes<HTMLElement>> {
  Group: typeof Group;
  Button: typeof Button;
}

const Radio = InternalRadio as CompoundedComponent;
Radio.Button = Button;
Radio.Group = Group;
export default Radio;
