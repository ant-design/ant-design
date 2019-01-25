import * as React from 'react';
import { ConfigConsumerProps } from '../config-provider';
export interface CommentProps {
    /** List of action items rendered below the comment content */
    actions?: Array<React.ReactNode>;
    /** The element to display as the comment author. */
    author?: React.ReactNode;
    /** The element to display as the comment avatar - generally an antd Avatar */
    avatar?: React.ReactNode;
    /** className of comment */
    className?: string;
    /** The main content of the comment */
    content: React.ReactNode;
    /** Nested comments should be provided as children of the Comment */
    children?: any;
    /** Comment prefix defaults to '.ant-comment' */
    prefixCls?: string;
    /** Additional style for the comment */
    style?: React.CSSProperties;
    /** A datetime element containing the time to be displayed */
    datetime?: React.ReactNode;
}
export default class Comment extends React.Component<CommentProps, {}> {
    getAction(actions: React.ReactNode[]): JSX.Element[] | null;
    renderNested: (prefixCls: string, children: any) => JSX.Element;
    renderComment: ({ getPrefixCls }: ConfigConsumerProps) => JSX.Element;
    render(): JSX.Element;
}
