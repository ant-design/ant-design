---
title: generate picker
skip: true
---

## How to replace momentjs to Day.js to reduce bundle size？

We provide two ways to implement replacement. You can choose any of the following ways according to your own project situation.

### Custom component

The first way is to replace `moment` by customizing components.

We will create three files in the public component directory (e.g. the `components` folder)of the project. `DatePicker.tsx`，`Calendar.tsx`， `TimePicker.tsx`.

write they:

#### DatePicker.tsx

```tsx
import { Dayjs } from 'dayjs';
import dayjsGenerateConfig from 'rc-picker/lib/generate/dayjs';
import generatePicker from 'antd/es/date-picker/generatePicker';
import 'antd/es/date-picker/style/index';

const DatePicker = generatePicker<Dayjs>(dayjsGenerateConfig);

export default DatePicker;
```

#### Calendar.tsx

```tsx
import { Dayjs } from 'dayjs';
import dayjsGenerateConfig from 'rc-picker/lib/generate/dayjs';
import generateCalendar from 'antd/es/calendar/generateCalendar';
import 'antd/es/calendar/style';

const Calendar = generateCalendar<Dayjs>(dayjsGenerateConfig);

export default Calendar;
```

##### TimePicker.tsx

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

Then use the custom component (`DatePicker, Calendar, TimePicker`) in page to replace antd's `DatePicker, Calendar, TimePicker`.

use

```js
import { DatePicker, Calendar, TimePicker } from 'src/components';
import format from 'dayjs';
```

instead

```js
import { DatePicker, Calendar, TimePicker } from 'antd';
import format from 'moment';
```

If you are the user of [umi](https://umijs.org/), you can ref [antd4-use-dayjs-replace-moment](https://github.com/xiaohuoni/antd4-use-dayjs-replace-moment).

### Webpack plugin

If you think it is too troublesome to replace the custom component, we also provide another implementation. We provide `antd-dayjs-webpack-plugin` plugin to replace `momentjs` to `Day.js` directly without changing a line of existing code. More info at [antd-dayjs-webpack-plugin](https://github.com/ant-design/antd-dayjs-webpack-plugin).
