import * as PropTypes from 'prop-types';
import * as React from 'react';
import { ConfigConsumerProps } from '../config-provider';
declare const ProgressTypes: ["line", "circle", "dashboard"];
export declare type ProgressType = (typeof ProgressTypes)[number];
declare const ProgressStatuses: ["normal", "exception", "active", "success"];
export declare type ProgressSize = 'default' | 'small';
export interface ProgressProps {
    prefixCls?: string;
    className?: string;
    type?: ProgressType;
    percent?: number;
    successPercent?: number;
    format?: (percent?: number, successPercent?: number) => React.ReactNode;
    status?: (typeof ProgressStatuses)[number];
    showInfo?: boolean;
    strokeWidth?: number;
    strokeLinecap?: string;
    strokeColor?: string;
    trailColor?: string;
    width?: number;
    style?: React.CSSProperties;
    gapDegree?: number;
    gapPosition?: 'top' | 'bottom' | 'left' | 'right';
    size?: ProgressSize;
}
export default class Progress extends React.Component<ProgressProps, {}> {
    static defaultProps: {
        type: "circle" | "line" | "dashboard" | undefined;
        percent: number;
        showInfo: boolean;
        trailColor: string;
        size: import("../card").CardSize;
    };
    static propTypes: {
        status: PropTypes.Requireable<"normal" | "active" | "success" | "exception">;
        type: PropTypes.Requireable<"circle" | "line" | "dashboard">;
        showInfo: PropTypes.Requireable<boolean>;
        percent: PropTypes.Requireable<number>;
        width: PropTypes.Requireable<number>;
        strokeWidth: PropTypes.Requireable<number>;
        strokeLinecap: PropTypes.Requireable<string>;
        strokeColor: PropTypes.Requireable<string>;
        trailColor: PropTypes.Requireable<string>;
        format: PropTypes.Requireable<(...args: any[]) => any>;
        gapDegree: PropTypes.Requireable<number>;
        default: PropTypes.Requireable<string>;
    };
    renderProgress: ({ getPrefixCls }: ConfigConsumerProps) => JSX.Element;
    render(): JSX.Element;
}
export {};
