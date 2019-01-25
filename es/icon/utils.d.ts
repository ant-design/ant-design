import { ThemeType } from './index';
export declare const svgBaseProps: {
    width: string;
    height: string;
    fill: string;
    ['aria-hidden']: string;
    focusable: string;
};
export declare function getThemeFromTypeName(type: string): ThemeType | null;
export declare function removeTypeTheme(type: string): string;
export declare function withThemeSuffix(type: string, theme: ThemeType): string;
export declare function alias(type: string): string;
