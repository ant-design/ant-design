import * as React from 'react';
import * as PropTypes from 'prop-types';
import { ConfigConsumerProps } from '../config-provider';
export interface BreadcrumbItemProps {
    prefixCls?: string;
    separator?: React.ReactNode;
    href?: string;
}
export default class BreadcrumbItem extends React.Component<BreadcrumbItemProps, any> {
    static __ANT_BREADCRUMB_ITEM: boolean;
    static defaultProps: {
        separator: string;
    };
    static propTypes: {
        prefixCls: PropTypes.Requireable<string>;
        separator: PropTypes.Requireable<string | PropTypes.ReactElementLike>;
        href: PropTypes.Requireable<string>;
    };
    renderBreadcrumbItem: ({ getPrefixCls }: ConfigConsumerProps) => JSX.Element | null;
    render(): JSX.Element;
}
