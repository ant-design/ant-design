---
category: Components
type: Data Entry
title: TimePicker
---

To select/input a time.

## When To Use

---

By clicking the input box, you can select a time from a popup panel.

## API

---

```jsx
import moment from 'moment';
<TimePicker defaultValue={moment('13:30:56', 'HH:mm:ss')} />;
```

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| allowClear | allow clearing text | boolean | true |  |
| autoFocus | get focus when component mounted | boolean | false |  |
| className | className of picker | string | '' |  |
| clearText | clear tooltip of icon | string | clear |  |
| defaultOpenValue | default open panel value, used to set utcOffset,locale if value/defaultValue absent | [moment](http://momentjs.com/) | moment() |  |
| defaultValue | to set default time | [moment](http://momentjs.com/) | - |  |
| disabled | determine whether the TimePicker is disabled | boolean | false |  |
| disabledHours | to specify the hours that cannot be selected | function() | - |  |
| disabledMinutes | to specify the minutes that cannot be selected | function(selectedHour) | - |  |
| disabledSeconds | to specify the seconds that cannot be selected | function(selectedHour, selectedMinute) | - |  |
| format | to set the time format | string | "HH:mm:ss" |  |
| getPopupContainer | to set the container of the floating layer, while the default is to create a div element in body | function(trigger) | - |  |
| hideDisabledOptions | hide the options that can not be selected | boolean | false |  |
| hourStep | interval between hours in picker | number | 1 |  |
| inputReadOnly | Set the `readonly` attribute of the input tag (avoids virtual keyboard on touch devices) | boolean | false |  |
| minuteStep | interval between minutes in picker | number | 1 |  |
| open | whether to popup panel | boolean | false |  |
| placeholder | display when there's no value | string | "Select a time" |  |
| popupClassName | className of panel | string | '' |  |
| popupStyle | style of panel | object | - |  |
| secondStep | interval between seconds in picker | number | 1 |  |
| suffixIcon | The custom suffix icon | ReactNode | - |  |
| clearIcon | The custom clear icon | ReactNode | - |  |
| use12Hours | display as 12 hours format, with default format `h:mm:ss a` | boolean | false |  |
| renderExtraFooter | called from time picker panel to render some addon to its bottom | () => ReactNode | - |  |
| value | to set time | [moment](http://momentjs.com/) | - |  |
| onChange | a callback function, can be executed when the selected time is changing | function(time: moment, timeString: string): void | - |  |
| onOpenChange | a callback function which will be called while panel opening/closing | (open: boolean): void | - |  |

## Methods

| Name    | Description  | Version |
| ------- | ------------ | ------- |
| blur()  | remove focus |         |
| focus() | get focus    |         |

<style>.code-box-demo .ant-picker { margin: 0 8px 12px 0; }</style>

## FAQ

### How to use dayjs instead of moment

custom component `TimePicker`

```tsx
import { Dayjs } from 'dayjs';

import * as React from 'react';
import DatePicker from './DatePicker';
import { PickerTimeProps, RangePickerTimeProps } from 'antd/es/date-picker/generatePicker';
import warning from 'antd/es/_util/warning';
import { Omit } from 'antd/es/_util/type';

const { TimePicker: InternalTimePicker, RangePicker: InternalRangePicker } = DatePicker;

export interface TimeRangePickerProps extends RangePickerTimeProps<Dayjs> {}

const RangePicker = React.forwardRef<any, TimeRangePickerProps>((props, ref) => {
  return <InternalRangePicker {...props} picker="time" mode={undefined} ref={ref} />;
});

export interface TimePickerProps extends Omit<PickerTimeProps<Dayjs>, 'picker'> {
  addon?: () => React.ReactNode;
}

const TimePicker = React.forwardRef<any, TimePickerProps>(
  ({ addon, renderExtraFooter, ...restProps }, ref) => {
    const internalRenderExtraFooter = React.useMemo(() => {
      if (renderExtraFooter) {
        return renderExtraFooter;
      }
      if (addon) {
        warning(
          false,
          'TimePicker',
          '`addon` is deprecated. Please use `renderExtraFooter` instead.',
        );
        return addon;
      }
      return undefined;
    }, [addon, renderExtraFooter]);

    return (
      <InternalTimePicker
        {...restProps}
        mode={undefined}
        ref={ref}
        renderExtraFooter={internalRenderExtraFooter}
      />
    );
  },
);

TimePicker.displayName = 'TimePicker';

type MergedTimePicker = typeof TimePicker & {
  RangePicker: typeof RangePicker;
};

(TimePicker as MergedTimePicker).RangePicker = RangePicker;

export default TimePicker as MergedTimePicker;
```

using custom component `TimePicker` instead of antd's `TimePicker`

```js
import { TimePicker } from '@/components';
import format from 'dayjs';
```

instead

```js
import { TimePicker } from 'antd';
import format from 'moment';
```
