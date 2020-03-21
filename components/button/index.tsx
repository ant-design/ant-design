import Button from './button';
import ButtonGroup from './button-group';

export { ButtonProps, ButtonShape, ButtonType } from './button';
export { ButtonGroupProps } from './button-group';
export { SizeType as ButtonSize } from '../config-provider/SizeContext';

Button.Group = ButtonGroup;
export default Button;
