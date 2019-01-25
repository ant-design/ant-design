import * as React from 'react';
import * as moment from 'moment';
export interface PickerProps {
    value?: moment.Moment;
    open?: boolean;
    prefixCls: string;
}
export interface PickerState {
    open: boolean;
    value: moment.Moment | null;
    showDate: moment.Moment | null;
}
export default function createPicker(TheCalendar: React.ComponentClass): any;
