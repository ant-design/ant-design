---
order: 7.5
title: 使用自定义日期库
---

Ant Design 默认使用 [Day.js](https://day.js.org) 来处理时间日期问题。Day.js 相比于 moment 使用了不可变数据结构，性能更快，体积仅 2KB，API 设计完全一致。你可以很方便的改用其他自定义日期库如（[moment](http://momentjs.com/)、[date-fns](https://date-fns.org)）。在这里我们提供了两种方式来实现替换:

## 自定义组件

第一种方法是使用 `generatePicker`（或 `generateCalendar`）辅助创建 Picker 组件。

我们先初始化一个 `create-react-app` 的 antd demo，你可以参考 [在 TypeScript 中使用](/docs/react/use-in-typescript) 进行构建，也可以直接从这里开始[init antd](https://github.com/xiaohuoni/antd4-generate-picker/commit/47fec964e36d48bd15760f8f5abcb9655c259aa6)

### DatePicker.tsx

新建 `src/components/DatePicker.tsx`。

编写如下代码:

```tsx
import type { Moment } from 'moment';
import momentGenerateConfig from 'rc-picker/es/generate/moment';
import generatePicker from 'antd/es/date-picker/generatePicker';

const DatePicker = generatePicker<Moment>(momentGenerateConfig);

export default DatePicker;
```

### TimePicker.tsx

新建 `src/components/TimePicker.tsx`。

编写如下代码:

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

新建 `src/components/Calendar.tsx`。

编写如下代码:

```tsx
import type { Moment } from 'moment';
import momentGenerateConfig from 'rc-picker/es/generate/moment';
import generateCalendar from 'antd/es/calendar/generateCalendar';

const Calendar = generateCalendar<Moment>(momentGenerateConfig);

export default Calendar;
```

#### 导出自定义组件

新建 `src/components/index.tsx`。

编写如下代码:

```tsx
export { default as DatePicker } from './DatePicker';
export { default as Calendar } from './Calendar';
export { default as TimePicker } from './TimePicker';
```

### 使用自定义组件

修改 `src/App.tsx`，引入 `moment` 和自定义的组件。

```diff
- import { DatePicker, Calendar } from 'antd';
- import format from 'dayjs';

+ import { DatePicker, TimePicker, Calendar } from './components';
+ import format from 'moment';
```

## antd-moment-webpack-plugin

我们还提供另一种实现方式。使用 `@ant-design/moment-webpack-plugin` 插件，无需对现有代码做任何修改直接替换成 `Moment.js`。请参考 [@ant-design/moment-webpack-plugin](https://github.com/ant-design/antd-moment-webpack-plugin)。

```js
// webpack-config.js
const AntdMomentWebpackPlugin = require('@ant-design/moment-webpack-plugin');

module.exports = {
  // ...
  plugins: [new AntdMomentWebpackPlugin()],
};
```

## 使用 date-fns

[date-fns](https://date-fns.org/) 目前支持和 dayjs 类似的自定义组件方法，区别在于使用的参数类型不同，在 antd 4.5.0 以上版本提供支持。

做一个简单的例子：

### DatePicker.tsx

新建 `src/components/DatePicker.tsx`。

编写如下代码:

```tsx
import dateFnsGenerateConfig from 'rc-picker/es/generate/dateFns';
import generatePicker from 'antd/es/date-picker/generatePicker';
import 'antd/es/date-picker/style/index';

const DatePicker = generatePicker<Date>(dateFnsGenerateConfig);

export default DatePicker;
```
