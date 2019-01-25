import * as React from 'react';
import * as moment from 'moment';
import { ConfigConsumerProps } from '../config-provider';
interface WeekPickerState {
    open: boolean;
    value: moment.Moment | null;
}
declare class WeekPicker extends React.Component<any, WeekPickerState> {
    static defaultProps: {
        format: string;
        allowClear: boolean;
    };
    static getDerivedStateFromProps(nextProps: any): WeekPickerState | null;
    private input;
    private prefixCls?;
    constructor(props: any);
    componentDidUpdate(_: any, prevState: WeekPickerState): void;
    weekDateRender: (current: any) => JSX.Element;
    handleChange: (value: moment.Moment | null) => void;
    handleOpenChange: (open: boolean) => void;
    clearSelection: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    renderFooter: (...args: any[]) => JSX.Element | null;
    focus(): void;
    blur(): void;
    saveInput: (node: any) => void;
    renderWeekPicker: ({ getPrefixCls }: ConfigConsumerProps) => JSX.Element;
    render(): JSX.Element;
}
export default WeekPicker;
