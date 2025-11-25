import InternalButton from './Button-';
import ButtonGroup from './ButtonGroup';

export type { SizeType as ButtonSize } from '../config-provider/SizeContext';
export type { ButtonProps } from './Button-';
export type { ButtonGroupProps } from './ButtonGroup';

export * from './buttonHelpers';

type CompoundedComponent = typeof InternalButton & {
  /** @deprecated Please use `Space.Compact` */
  Group: typeof ButtonGroup;
  /** @internal */
  __ANT_BUTTON: boolean;
};

const Button = InternalButton as CompoundedComponent;

Button.Group = ButtonGroup;
Button.__ANT_BUTTON = true;

export default Button;
