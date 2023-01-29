---
order: 7.5
title: Use custom date library
---

By default, Ant Design use [Day.js](https://day.js.org) to handle time and date. Day.js is an immutable date-time library alternative to Moment.js with the same API.

You might want to use another date library (**Ant design currently supports [moment](http://momentjs.com/) and [date-fns](https://date-fns.org)**). We provide two ways to customize:

## Custom component

The first way is to use `generatePicker` (or `generateCalendar`) to help create Picker components.

First, we initialize an antd demo with `create-react-app`. You can refer to [Use in TypeScript](/docs/react/use-in-typescript), or you can start directly here [init antd](https://github.com/xiaohuoni/antd4-generate-picker/commit/47fec964e36d48bd15760f8f5abcb9655c259aa6)

### DatePicker.tsx

Create `src/components/DatePicker.tsx`.

For example:

```tsx
import type { Moment } from 'moment';
import momentGenerateConfig from 'rc-picker/lib/generate/moment';
import generatePicker from 'antd/es/date-picker/generatePicker';

const DatePicker = generatePicker<Moment>(momentGenerateConfig);

export default DatePicker;
```

### TimePicker.tsx

Create `src/components/TimePicker.tsx`.

For example:

```tsx
import type { Moment } from 'moment';
import * as React from 'react';
import type { PickerTimeProps } from 'antd/es/date-picker/generatePicker';
import DatePicker from './DatePicker';

export interface TimePickerProps extends Omit<PickerTimeProps<Moment>, 'picker'> {}

const TimePicker = React.forwardRef<any, TimePickerProps>((props, ref) => (
  <DatePicker {...props} picker="time" mode={undefined} ref={ref} />
));

TimePicker.displayName = 'TimePicker';

export default TimePicker;
```

### Calendar.tsx

Create `src/components/Calendar.tsx`.

For example:

```tsx
import type { Moment } from 'moment';
import momentGenerateConfig from 'rc-picker/lib/generate/moment';
import generateCalendar from 'antd/es/calendar/generateCalendar';

const Calendar = generateCalendar<Moment>(momentGenerateConfig);

export default Calendar;
```

### Export Custom component

Create `src/components/index.tsx`.

For example:

```tsx
export { default as DatePicker } from './DatePicker';
export { default as Calendar } from './Calendar';
export { default as TimePicker } from './TimePicker';
```

### Use Custom component

Modify `src/App.tsx`,import `moment` and custom component.

```diff
- import { DatePicker, Calendar } from 'antd';
- import format from 'dayjs';

+ import { DatePicker, TimePicker, Calendar } from './components';
+ import format from 'moment';
```

## antd-moment-webpack-plugin

We also provide another implementation, which we provide with `@ant-design/moment-webpack-plugin`, replacing `Day.js` with `moment` directly without changing a line of existing code. More info can be found at [@ant-design/moment-webpack-plugin](https://github.com/ant-design/antd-moment-webpack-plugin).

```js
// webpack-config.js
const AntdMomentWebpackPlugin = require('@ant-design/moment-webpack-plugin');

module.exports = {
  // ...
  plugins: [new AntdMomentWebpackPlugin()],
};
```

## Use date-fns

[date-fns](https://date-fns.org/) currently supports custom component methods similar to `dayjs`. The difference is that the parameter types used are different. Support is provided in antd 4.5.0 and above.

For Example:

### DatePicker.tsx

Create `src/components/DatePicker.tsx`.

Code as follows:

```tsx
import dateFnsGenerateConfig from 'rc-picker/lib/generate/dateFns';
import generatePicker from 'antd/es/date-picker/generatePicker';
import 'antd/es/date-picker/style/index';

const DatePicker = generatePicker<Date>(dateFnsGenerateConfig);

export default DatePicker;
```
