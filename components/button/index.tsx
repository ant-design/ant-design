import Button from './button';

export type { SizeType as ButtonSize } from '../config-provider/SizeContext';
export type { ButtonProps, ButtonShape, ButtonType } from './button';
export type { ButtonGroupProps } from './button-group';

Button.__ANT_COMPACT_ITEM = true;
export default Button;
