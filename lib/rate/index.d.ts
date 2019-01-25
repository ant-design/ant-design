import * as React from 'react';
import * as PropTypes from 'prop-types';
import { ConfigConsumerProps } from '../config-provider';
export interface RateProps {
    prefixCls?: string;
    count?: number;
    value?: number;
    defaultValue?: number;
    allowHalf?: boolean;
    allowClear?: boolean;
    disabled?: boolean;
    tooltips?: Array<string>;
    onChange?: (value: number) => any;
    onHoverChange?: (value: number) => any;
    character?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}
interface RateNodeProps {
    index: number;
}
export default class Rate extends React.Component<RateProps, any> {
    static propTypes: {
        prefixCls: PropTypes.Requireable<string>;
        character: PropTypes.Requireable<PropTypes.ReactNodeLike>;
    };
    static defaultProps: {
        character: JSX.Element;
    };
    private rcRate;
    focus(): void;
    blur(): void;
    saveRate: (node: any) => void;
    characterRender: (node: React.ReactNode, { index }: RateNodeProps) => {} | null | undefined;
    renderRate: ({ getPrefixCls }: ConfigConsumerProps) => JSX.Element;
    render(): JSX.Element;
}
export {};
