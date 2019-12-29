---
title: generate picker
skip: true
---

## How to use DatePicker with customize date library like dayjs？

Consider of bundle size, you can replace momentjs with customize date library. We provide two ways to customize date library:

### Custom component

The first way is use `generatePicker` (or `generateCalendar`) helps to create Picker components.

For example:

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

Then use the custom component (`DatePicker, Calendar`) in page to replace antd's `DatePicker, Calendar`, use `<DatePicker picker="time" />` to replace antd's `<TimePicker/>`.

use

```js
import { DatePicker, Calendar } from 'src/components';
import format from 'dayjs';
```

instead of

```js
import { DatePicker, Calendar } from 'antd';
import format from 'moment';
```

If you are the user of [umi](https://umijs.org/), you can ref [antd4-use-dayjs-replace-moment](https://github.com/xiaohuoni/antd4-use-dayjs-replace-moment).

### Webpack plugin

We also provide another implementation. We provide `antd-dayjs-webpack-plugin` plugin to replace `momentjs` to `Day.js` directly without changing a line of existing code. More info at [antd-dayjs-webpack-plugin](https://github.com/ant-design/antd-dayjs-webpack-plugin).
