---
title: 自定义日期库
skip: true
---

## 如何在 DatePicker 中使用自定义日期库（如 dayjs ）？

考虑到包的大小，你可以用自定义日期库替换 momentjs。在这里我们提供了两种方式来实现替换:

### 自定义组件

第一种方法是使用`generatePicker`（或者：`generateCalendar` ）辅助创建 Picker 组件。

编写如下代码:

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

`TimePicker` 是带有 `picker` 属性的 `DatePicker` 的别名： `<TimePicker />` = `<DatePicker picker="timer" />`.

使用

```js
import { DatePicker, Calendar } from 'src/components';
import format from 'dayjs';
```

替换

```js
import { DatePicker, Calendar } from 'antd';
import format from 'moment';
```

如果你熟悉 [umi](https://umijs.org/)，那你可以参考 [antd4-use-dayjs-replace-moment](https://github.com/xiaohuoni/antd4-use-dayjs-replace-moment)。

### Webpack 配置替换

我们还提供另一种实现方式。使用 `antd-dayjs-webpack-plugin` 插件，无需对现有代码做任何修改直接替换成 `Day.js`。请参考 [antd-dayjs-webpack-plugin](https://github.com/ant-design/antd-dayjs-webpack-plugin)。
