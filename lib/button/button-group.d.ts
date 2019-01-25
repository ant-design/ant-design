import * as React from 'react';
import { ButtonSize } from './button';
export interface ButtonGroupProps {
    size?: ButtonSize;
    style?: React.CSSProperties;
    className?: string;
    prefixCls?: string;
}
declare const ButtonGroup: React.SFC<ButtonGroupProps>;
export default ButtonGroup;
