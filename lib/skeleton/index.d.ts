import * as React from 'react';
import { SkeletonAvatarProps } from './Avatar';
import { SkeletonTitleProps } from './Title';
import { SkeletonParagraphProps } from './Paragraph';
import { ConfigConsumerProps } from '../config-provider';
export interface SkeletonProps {
    active?: boolean;
    loading?: boolean;
    prefixCls?: string;
    className?: string;
    children?: React.ReactNode;
    avatar?: SkeletonAvatarProps | boolean;
    title?: SkeletonTitleProps | boolean;
    paragraph?: SkeletonParagraphProps | boolean;
}
declare class Skeleton extends React.Component<SkeletonProps, any> {
    static defaultProps: Partial<SkeletonProps>;
    renderSkeleton: ({ getPrefixCls }: ConfigConsumerProps) => {} | null | undefined;
    render(): JSX.Element;
}
export default Skeleton;
