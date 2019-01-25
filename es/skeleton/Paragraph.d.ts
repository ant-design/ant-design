import * as React from 'react';
declare type widthUnit = number | string;
export interface SkeletonParagraphProps {
    prefixCls?: string;
    className?: string;
    style?: object;
    width?: widthUnit | Array<widthUnit>;
    rows?: number;
}
declare class Paragraph extends React.Component<SkeletonParagraphProps, {}> {
    getWidth(index: number): string | number | undefined;
    render(): JSX.Element;
}
export default Paragraph;
