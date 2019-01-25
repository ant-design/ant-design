import * as React from 'react';
export interface SkeletonAvatarProps {
    prefixCls?: string;
    className?: string;
    style?: object;
    size?: 'large' | 'small' | 'default';
    shape?: 'circle' | 'square';
}
declare class Title extends React.Component<SkeletonAvatarProps, any> {
    static defaultProps: Partial<SkeletonAvatarProps>;
    render(): JSX.Element;
}
export default Title;
