import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as moment from 'moment';
export { HeaderProps } from './Header';
declare function noop(): null;
export declare type CalendarMode = 'month' | 'year';
export interface CalendarProps {
    prefixCls?: string;
    className?: string;
    value?: moment.Moment;
    defaultValue?: moment.Moment;
    mode?: CalendarMode;
    fullscreen?: boolean;
    dateCellRender?: (date: moment.Moment) => React.ReactNode;
    monthCellRender?: (date: moment.Moment) => React.ReactNode;
    dateFullCellRender?: (date: moment.Moment) => React.ReactNode;
    monthFullCellRender?: (date: moment.Moment) => React.ReactNode;
    locale?: any;
    style?: React.CSSProperties;
    onPanelChange?: (date?: moment.Moment, mode?: CalendarMode) => void;
    onSelect?: (date?: moment.Moment) => void;
    onChange?: (date?: moment.Moment) => void;
    disabledDate?: (current: moment.Moment) => boolean;
    validRange?: [moment.Moment, moment.Moment];
}
export interface CalendarState {
    value: moment.Moment;
    mode?: CalendarMode;
}
export default class Calendar extends React.Component<CalendarProps, CalendarState> {
    static defaultProps: {
        locale: {};
        fullscreen: boolean;
        mode: CalendarMode;
        onSelect: typeof noop;
        onPanelChange: typeof noop;
        onChange: typeof noop;
    };
    static propTypes: {
        monthCellRender: PropTypes.Requireable<(...args: any[]) => any>;
        dateCellRender: PropTypes.Requireable<(...args: any[]) => any>;
        monthFullCellRender: PropTypes.Requireable<(...args: any[]) => any>;
        dateFullCellRender: PropTypes.Requireable<(...args: any[]) => any>;
        fullscreen: PropTypes.Requireable<boolean>;
        locale: PropTypes.Requireable<object>;
        prefixCls: PropTypes.Requireable<string>;
        className: PropTypes.Requireable<string>;
        style: PropTypes.Requireable<object>;
        onPanelChange: PropTypes.Requireable<(...args: any[]) => any>;
        value: PropTypes.Requireable<moment.Moment>;
        onSelect: PropTypes.Requireable<(...args: any[]) => any>;
        onChange: PropTypes.Requireable<(...args: any[]) => any>;
    };
    prefixCls?: string;
    constructor(props: CalendarProps);
    componentWillReceiveProps(nextProps: CalendarProps): void;
    monthCellRender: (value: moment.Moment) => JSX.Element;
    dateCellRender: (value: moment.Moment) => JSX.Element;
    setValue: (value: moment.Moment, way: "select" | "changePanel") => void;
    setType: (type: string) => void;
    onHeaderValueChange: (value: moment.Moment) => void;
    onHeaderTypeChange: (type: string) => void;
    onPanelChange(value: moment.Moment, mode: CalendarMode | undefined): void;
    onSelect: (value: moment.Moment) => void;
    getDateRange: (validRange: [moment.Moment, moment.Moment], disabledDate?: ((current: moment.Moment) => boolean) | undefined) => (current: moment.Moment) => boolean;
    getDefaultLocale: () => any;
    renderCalendar: (locale: any, localeCode: string) => JSX.Element;
    render(): JSX.Element;
}
