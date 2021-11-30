import * as React from 'react';
import InternalRadio from './radio';
import Group from './group';
import Button from './radioButton';
import { RadioProps } from './interface';

export {
  RadioGroupButtonStyle,
  RadioGroupOptionType,
  RadioGroupProps,
  RadioGroupContextProps,
  RadioProps,
  RadioChangeEventTarget,
  RadioChangeEvent,
} from './interface';
export interface RadioInterface
  extends React.ForwardRefExoticComponent<RadioProps & React.RefAttributes<HTMLElement>> {
  Group: typeof Group;
  Button: typeof Button;
}

const Radio = InternalRadio as RadioInterface;
Radio.Button = Button;
Radio.Group = Group;
export { Button, Group };
export default Radio;
