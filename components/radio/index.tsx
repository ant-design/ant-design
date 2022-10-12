import Group from './group';
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

const Radio = Object.assign(InternalRadio, {
  Button,
  Group,
  /** @internal */
  __ANT_RADIO: true,
});

export default Radio;
