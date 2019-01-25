import * as React from 'react';
import createFromIconfontCN from './IconFont';
import { getTwoToneColor, setTwoToneColor } from './twoTonePrimaryColor';
export interface CustomIconComponentProps {
    width: string | number;
    height: string | number;
    fill: string;
    viewBox?: string;
    className?: string;
    style?: React.CSSProperties;
    ['aria-hidden']?: string;
}
export declare type ThemeType = 'filled' | 'outlined' | 'twoTone';
export interface IconProps {
    type?: string;
    className?: string;
    theme?: ThemeType;
    title?: string;
    onClick?: React.MouseEventHandler<HTMLElement>;
    component?: React.ComponentType<CustomIconComponentProps>;
    twoToneColor?: string;
    viewBox?: string;
    spin?: boolean;
    style?: React.CSSProperties;
    prefixCls?: string;
    role?: string;
}
export interface IconComponent<P> extends React.SFC<P> {
    createFromIconfontCN: typeof createFromIconfontCN;
    getTwoToneColor: typeof getTwoToneColor;
    setTwoToneColor: typeof setTwoToneColor;
    unstable_ChangeThemeOfIconsDangerously?: typeof unstable_ChangeThemeOfIconsDangerously;
    unstable_ChangeDefaultThemeOfIcons?: typeof unstable_ChangeDefaultThemeOfIcons;
}
declare const Icon: IconComponent<IconProps>;
declare function unstable_ChangeThemeOfIconsDangerously(theme?: ThemeType): void;
declare function unstable_ChangeDefaultThemeOfIcons(theme: ThemeType): void;
export default Icon;
