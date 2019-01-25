import * as React from 'react';
import * as PropTypes from 'prop-types';
import { AntAnchor } from './Anchor';
import { ConfigConsumerProps } from '../config-provider';
export interface AnchorLinkProps {
    prefixCls?: string;
    href: string;
    title: React.ReactNode;
    children?: any;
    className?: string;
}
export default class AnchorLink extends React.Component<AnchorLinkProps, any> {
    static defaultProps: {
        href: string;
    };
    static contextTypes: {
        antAnchor: PropTypes.Requireable<object>;
    };
    context: {
        antAnchor: AntAnchor;
    };
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: AnchorLinkProps): void;
    componentWillUnmount(): void;
    handleClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    renderAnchorLink: ({ getPrefixCls }: ConfigConsumerProps) => JSX.Element;
    render(): JSX.Element;
}
