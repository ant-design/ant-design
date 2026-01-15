# DatePicker — 日期选择器

## 功能概述

输入或选择日期/时间的控件。支持年、月、周、日、时间等多种选择模式。支持日期范围选择、预设范围等功能。

## 核心概念

### 日期选择流程

```
点击输入框
     ↓
 打开日期面板 (picker 类型)
     ↓
 选择日期/时间
     ↓
 onChange 回调触发
     ↓
 面板关闭
```

### 关键数据结构

```tsx
// Dayjs 类型（来自 dayjs 库）
import dayjs from 'dayjs';

type Dayjs = ReturnType<typeof dayjs>;

// 日期范围选择值
type RangeValue = [Dayjs | null, Dayjs | null];

// showTime 配置
interface ShowTimeConfig {
  format?: string; // 时间格式
  hourStep?: number; // 小时步长，默认 1
  minuteStep?: number; // 分钟步长，默认 1
  secondStep?: number; // 秒步长，默认 1
  showHour?: boolean; // 显示小时
  showMinute?: boolean; // 显示分钟
  showSecond?: boolean; // 显示秒
  use12Hours?: boolean; // 12 小时制
  hideDisabledOptions?: boolean; // 隐藏禁用选项
}

// RangePicker 专用类型
interface RangePickerProps {
  disabledTime?: (date: Dayjs, partial: 'start' | 'end') => object;
  onCalendarChange?: (dates: RangeValue, dateStrings: [string, string], info) => void;
}

// 预设范围
interface PresetRange {
  label: ReactNode;
  value: [Dayjs, Dayjs];
}
```

## 输入字段

### 通用属性

#### 必填

无必填属性。

#### 常用可选

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `value` | Dayjs | - | 当前日期值（受控） |
| `defaultValue` | Dayjs | - | 默认日期值 |
| `format` | string \| string[] | `'YYYY-MM-DD'` | 日期格式化 |
| `picker` | `'date'` \| `'week'` \| `'month'` \| `'quarter'` \| `'year'` | `'date'` | 选择器类型 |
| `placeholder` | string \| [string, string] | - | 占位文本 |
| `size` | `'large'` \| `'middle'` \| `'small'` | `'middle'` | 尺寸 |
| `variant` | `'outlined'` \| `'borderless'` \| `'filled'` | `'outlined'` | 形态变体 |
| `disabled` | boolean | false | 禁用状态 |
| `status` | `'error'` \| `'warning'` | - | 校验状态 |
| `allowClear` | boolean \| { clearIcon } | true | 允许清除 |
| `open` | boolean | - | 控制弹层显示（受控） |
| `showToday` | boolean | true | 显示今天按钮 |
| `showNow` | boolean | true | 显示此刻按钮（showTime 时有效） |
| `inputReadOnly` | boolean | false | 输入框只读 |

#### 时间选择

- `showTime`: boolean | ShowTimeConfig，显示时间选择。
  - `format`: string，时间格式。
  - `hourStep`: number，小时步长。
  - `minuteStep`: number，分钟步长。
  - `secondStep`: number，秒步长。
  - `use12Hours`: boolean，12 小时制。

### 弹层配置

- `placement`: `'bottomLeft'` | `'bottomRight'` | `'topLeft'` | `'topRight'`，弹层位置。
- `getPopupContainer`: (trigger) => HTMLElement，弹层容器。
- `popupClassName`: string，弹层类名。
- `popupStyle`: CSSProperties，弹层样式。

### 日期禁用和渲染

- `disabledDate`: (currentDate: Dayjs) => boolean，禁用日期判断函数。
- `cellRender`: (current: Dayjs, info) => ReactNode，自定义单元格渲染（5.16.0+）。
- `dateRender`: (current: Dayjs, today: Dayjs) => ReactNode，自定义日期单元格（已废弃）。
- `monthCellRender`: (current: Dayjs, locale) => ReactNode，自定义月份单元格（已废弃）。

### 图标和预设

- `presets`: PresetRange[]，预设时间范围。
- `suffixIcon`: ReactNode，后缀图标。
- `prevIcon`: ReactNode，上一个按钮图标。
- `nextIcon`: ReactNode，下一个按钮图标。
- `superPrevIcon`: ReactNode，上一年按钮图标。
- `superNextIcon`: ReactNode，下一年按钮图标。

### 国际化和事件

- `locale`: object，本地化配置。
- `onChange`: (date: Dayjs, dateString: string) => void，日期变化回调。
- `onOk`: (date: Dayjs) => void，确定回调（showTime 时有效）。
- `onPanelChange`: (value: Dayjs, mode: string) => void，面板切换回调。
- `onOpenChange`: (open: boolean) => void，弹层展开收起回调。

### DatePicker.RangePicker 属性

- `value`: [Dayjs, Dayjs]，日期范围值。
- `defaultValue`: [Dayjs, Dayjs]，默认日期范围。
- `disabled`: [boolean, boolean]，分别禁用开始/结束。
- `disabledTime`: (date: Dayjs, partial: 'start' | 'end') => object，禁用时间。
- `separator`: ReactNode，分隔符，默认 `~`。
- `allowEmpty`: [boolean, boolean]，允许开始/结束为空。
- `onCalendarChange`: (dates, dateStrings, info) => void，日历变化回调。

## 常见场景示例

### 场景 1: 基础日期选择

```tsx
import { DatePicker, Space } from 'antd';
import type { DatePickerProps } from 'antd';
import dayjs from 'dayjs';

const App: React.FC = () => {
  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      {/* 日期选择 */}
      <DatePicker onChange={onChange} placeholder="选择日期" />

      {/* 周选择 */}
      <DatePicker onChange={onChange} picker="week" placeholder="选择周" />

      {/* 月选择 */}
      <DatePicker onChange={onChange} picker="month" placeholder="选择月" />

      {/* 年选择 */}
      <DatePicker onChange={onChange} picker="year" placeholder="选择年" />
    </Space>
  );
};
```

### 场景 2: 日期时间选择

```tsx
import { DatePicker, Space } from 'antd';
import type { DatePickerProps } from 'antd';

const App: React.FC = () => {
  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log('选择的日期时间:', date, dateString);
  };

  const onOk: DatePickerProps['onOk'] = (date) => {
    console.log('确定的日期时间:', date);
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      {/* 日期 + 时间 */}
      <DatePicker showTime onChange={onChange} onOk={onOk} placeholder="选择日期和时间" />

      {/* 自定义时间格式 */}
      <DatePicker
        showTime={{
          format: 'HH:mm',
          hourStep: 1,
          minuteStep: 15,
        }}
        format="YYYY-MM-DD HH:mm"
        onChange={onChange}
        placeholder="选择日期和时间"
      />

      {/* 12 小时制 */}
      <DatePicker
        showTime={{ use12Hours: true, format: 'h:mm A' }}
        format="YYYY-MM-DD h:mm A"
        onChange={onChange}
        placeholder="12 小时制"
      />
    </Space>
  );
};
```

### 场景 3: 日期范围选择

```tsx
import { DatePicker } from 'antd';
import type { DatePickerProps } from 'antd';
import dayjs from 'dayjs';

const App: React.FC = () => {
  const { RangePicker } = DatePicker;

  const onChange: DatePickerProps['onChange'] = (dates, dateStrings) => {
    console.log('范围:', dates, dateStrings);
  };

  return (
    <>
      {/* 基础范围选择 */}
      <RangePicker onChange={onChange} placeholder={['开始日期', '结束日期']} />

      {/* 范围 + 时间 */}
      <RangePicker showTime onChange={onChange} placeholder={['开始日期时间', '结束日期时间']} />

      {/* 禁用时间范围 */}
      <RangePicker
        disabledDate={(current) => {
          // 禁用今天之前的日期
          return current && current < dayjs().startOf('day');
        }}
        placeholder={['开始日期', '结束日期']}
      />
    </>
  );
};
```

### 场景 4: 禁用和预设

```tsx
import { Button, DatePicker, Space } from 'antd';
import type { DatePickerProps, PresetRanges } from 'antd';
import dayjs from 'dayjs';

const App: React.FC = () => {
  const { RangePicker } = DatePicker;

  // 禁用周末
  const disabledDate: DatePickerProps['disabledDate'] = (current) => {
    return current && (current.day() === 0 || current.day() === 6);
  };

  // 预设范围
  const presetRanges: PresetRanges = {
    today: [dayjs(), dayjs()],
    '7days': [dayjs().subtract(7, 'day'), dayjs()],
    '30days': [dayjs().subtract(30, 'day'), dayjs()],
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      {/* 禁用周末 */}
      <DatePicker disabledDate={disabledDate} placeholder="禁用周末" />

      {/* 预设范围 */}
      <RangePicker presets={presetRanges} placeholder={['开始日期', '结束日期']} />

      {/* 禁用时间段 */}
      <RangePicker
        disabledTime={(date, partial) => {
          if (partial === 'start') {
            return {
              disabledHours: () => [0, 1, 2], // 禁用 0-2 点
            };
          }
          return {};
        }}
        showTime
        placeholder={['开始', '结束']}
      />
    </Space>
  );
};
```

### 场景 5: 受控和格式化

```tsx
import { useState } from 'react';
import { Button, DatePicker } from 'antd';
import type { DatePickerProps } from 'antd';
import dayjs from 'dayjs';

const App: React.FC = () => {
  const [date, setDate] = useState<dayjs.Dayjs | null>(dayjs());

  const onChange: DatePickerProps['onChange'] = (newDate) => {
    setDate(newDate);
  };

  return (
    <>
      {/* 受控日期选择 */}
      <DatePicker value={date} onChange={onChange} format="YYYY/MM/DD" placeholder="自定义格式" />

      {/* 清除 */}
      <Button onClick={() => setDate(null)}>清除日期</Button>

      {/* 显示选中日期 */}
      {date && <p>选中: {date.format('YYYY-MM-DD HH:mm:ss')}</p>}
    </>
  );
};
```

### 场景 6: 自定义渲染和国际化

```tsx
import { useState } from 'react';
import { DatePicker, Space } from 'antd';
import type { DatePickerProps, Dayjs } from 'antd';
import locale from 'antd/locale/zh_CN';
import dayjs from 'dayjs';

const App: React.FC = () => {
  const cellRender: DatePickerProps['cellRender'] = (date, info) => {
    // 标记特殊日期
    if (date.date() === 1) {
      return <div className="special">1st</div>;
    }
    return info.originNode;
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      {/* 自定义日期样式 */}
      <DatePicker cellRender={cellRender} placeholder="自定义样式" />

      {/* 中文本地化 */}
      <DatePicker locale={locale} placeholder="中文模式" />

      {/* 禁用清除 */}
      <DatePicker allowClear={false} placeholder="无清除按钮" />

      {/* 只读 */}
      <DatePicker inputReadOnly placeholder="只读模式" />
    </Space>
  );
};
```

## AI 生成指引

### 场景判断表

| 用户需求     | 选择方案         | 关键属性                   |
| ------------ | ---------------- | -------------------------- |
| 简单日期选择 | DatePicker 基础  | value, onChange, format    |
| 时间选择     | showTime         | showTime, format           |
| 日期范围     | RangePicker      | RangePicker 组件           |
| 周/月/年选择 | picker 属性      | picker='week/month/year'   |
| 禁用特定日期 | disabledDate     | disabledDate 函数          |
| 预设范围     | presets          | presets 数组               |
| 受控选择     | value + onChange | value, onChange            |
| 自定义格式   | format           | format 字符串              |
| 自定义渲染   | cellRender       | cellRender 函数（5.16.0+） |
| 国际化       | locale           | locale 配置                |
| 12 小时制    | use12Hours       | showTime.use12Hours        |
| 禁用时间     | disabledTime     | disabledTime 函数          |

### 类型导入

```tsx
import type {
  DatePickerProps, // DatePicker props 类型
  Dayjs, // 日期值类型
  PresetRanges, // 预设范围类型
  RangePickerProps, // RangePicker props 类型
} from 'antd';
import dayjs from 'dayjs'; // 日期处理库
```

## 使用建议

需要同时选择日期和时间时使用 `showTime`；日期范围选择使用 `RangePicker`；使用 dayjs 处理日期值；格式化使用 dayjs 格式字符串；禁用特定日期使用 `disabledDate` 函数；预设范围提升用户体验；受控选择使用 `value` + `onChange`；在 Form 中配合 `Form.Item` 使用。

## 示例代码

```tsx
import { DatePicker, Space } from 'antd';
import type { DatePickerProps } from 'antd';

const { RangePicker } = DatePicker;

const onChange: DatePickerProps['onChange'] = (date, dateString) => {
  console.log(date, dateString);
};

const App: React.FC = () => (
  <Space direction="vertical">
    <DatePicker onChange={onChange} />
    <DatePicker onChange={onChange} picker="week" />
    <DatePicker onChange={onChange} picker="month" />
    <DatePicker onChange={onChange} picker="year" />
    <RangePicker />
    <DatePicker showTime onChange={onChange} />
  </Space>
);
```

## 返回结果

渲染一个日期选择器，支持日期、周、月、年、时间等选择模式。
