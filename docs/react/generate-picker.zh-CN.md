---
title: 自定义选择框
skip: true
---

## 如何使用 Day.js 替换 momentjs 来减小打包大小

### 普通版:组件封装

#### DatePicker

```tsx
import { Dayjs } from 'dayjs';
import dayjsGenerateConfig from 'rc-picker/lib/generate/dayjs';
import generatePicker from 'antd/es/date-picker/generatePicker';
import 'antd/es/date-picker/style/index';

const DatePicker = generatePicker<Dayjs>(dayjsGenerateConfig);

export default DatePicker;
```

#### Calendar

```tsx
import { Dayjs } from 'dayjs';
import dayjsGenerateConfig from 'rc-picker/lib/generate/dayjs';
import generateCalendar from 'antd/es/calendar/generateCalendar';
import 'antd/es/calendar/style';

const Calendar = generateCalendar<Dayjs>(dayjsGenerateConfig);

export default Calendar;
```

##### TimePicker

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

使用自定义的 `DatePicker, Calendar, TimePicker` 组件替换掉 antd 的 `DatePicker, Calendar, TimePicker`

```js
import { DatePicker, Calendar, TimePicker } from '@/components';
import format from 'dayjs';
```

替换

```js
import { DatePicker, Calendar, TimePicker } from 'antd';
import format from 'moment';
```

### 友好版:webpack 配置替换

我们提供了 `antd-dayjs-webpack-plugin` 插件，无需对现有代码做任何修改直接替换成 `Day.js`。请参考 [antd-dayjs-webpack-plugin](https://github.com/ant-design/antd-dayjs-webpack-plugin)。
