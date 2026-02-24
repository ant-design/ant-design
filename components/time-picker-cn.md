---
category: Components
group: 数据录入
title: TimePicker
subtitle: 时间选择框
description: 输入或选择时间的控件。
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*kGmGSLk_1fwAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*1hDmQJIDFJQAAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
---

## 何时使用 {#when-to-use}

当用户需要输入一个时间，可以点击标准输入框，弹出时间面板进行选择。

## 代码演示 {#examples}

### 基本

点击 TimePicker，然后可以在浮层中选择或者输入某一时间。

```tsx
import React from 'react';
import type { TimePickerProps } from 'antd';
import { TimePicker } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

const onChange: TimePickerProps['onChange'] = (time, timeString) => {
  console.log(time, timeString);
};

const App: React.FC = () => (
  <TimePicker onChange={onChange} defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')} />
);

export default App;
```

### 受控组件

value 和 onChange 需要配合使用。

```tsx
import React, { useState } from 'react';
import { TimePicker } from 'antd';
import type { Dayjs } from 'dayjs';

const App: React.FC = () => {
  const [value, setValue] = useState<Dayjs | null>(null);

  const onChange = (time: Dayjs | null) => {
    setValue(time);
  };

  return <TimePicker value={value} onChange={onChange} />;
};

export default App;
```

### 三种大小

三种大小的输入框，大的用在表单中，中的为默认。

```tsx
import React from 'react';
import { Space, TimePicker } from 'antd';
import dayjs from 'dayjs';

const App: React.FC = () => (
  <Space wrap>
    <TimePicker defaultValue={dayjs('12:08:23', 'HH:mm:ss')} size="large" />
    <TimePicker defaultValue={dayjs('12:08:23', 'HH:mm:ss')} />
    <TimePicker defaultValue={dayjs('12:08:23', 'HH:mm:ss')} size="small" />
  </Space>
);

export default App;
```

### 选择确认

TimePicker 默认会根据 `picker` 的交互行为，自动选择是否需要确认按钮。你也可以通过 `needConfirm` 属性来手动设置是否需要确认按钮。当有 `needConfirm` 时，用户始终需要点击确认按钮才能完成选择。反之，则会在选择或者失去焦点时提交。

```tsx
import React from 'react';
import type { TimePickerProps } from 'antd';
import { TimePicker } from 'antd';

const onChange: TimePickerProps['onChange'] = (time, timeString) => {
  console.log(time, timeString);
};

const App: React.FC = () => <TimePicker onChange={onChange} needConfirm />;

export default App;
```

### 禁用

禁用时间选择。

```tsx
import React from 'react';
import { TimePicker } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

const App: React.FC = () => <TimePicker defaultValue={dayjs('12:08:23', 'HH:mm:ss')} disabled />;

export default App;
```

### 选择时分

TimePicker 浮层中的列会随着 `format` 变化，当略去 `format` 中的某部分时，浮层中对应的列也会消失。

```tsx
import React from 'react';
import { TimePicker } from 'antd';
import dayjs from 'dayjs';

const format = 'HH:mm';

const App: React.FC = () => <TimePicker defaultValue={dayjs('12:08', format)} format={format} />;

export default App;
```

### 步长选项

可以使用 `hourStep` `minuteStep` `secondStep` 按步长展示可选的时分秒。

```tsx
import React from 'react';
import { TimePicker } from 'antd';

const App: React.FC = () => <TimePicker minuteStep={15} secondStep={10} hourStep={1} />;

export default App;
```

### 附加内容

在 TimePicker 选择框底部显示自定义的内容。

```tsx
import React, { useState } from 'react';
import { Button, TimePicker } from 'antd';

const App: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <TimePicker
      open={open}
      onOpenChange={setOpen}
      renderExtraFooter={() => (
        <Button size="small" type="primary" onClick={() => setOpen(false)}>
          OK
        </Button>
      )}
    />
  );
};

export default App;
```

### 12 小时制

12 小时制的时间选择器，默认的 format 为 `h:mm:ss a`。

```tsx
import React from 'react';
import type { TimePickerProps } from 'antd';
import { Space, TimePicker } from 'antd';

const onChange: TimePickerProps['onChange'] = (time, timeString) => {
  console.log(time, timeString);
};

const App: React.FC = () => (
  <Space wrap>
    <TimePicker use12Hours onChange={onChange} />
    <TimePicker use12Hours format="h:mm:ss A" onChange={onChange} />
    <TimePicker use12Hours format="h:mm a" onChange={onChange} />
  </Space>
);

export default App;
```

### 滚动即改变

通过 `changeOnScroll` 与 `needConfirm` 使其滚动时改变数值。

```tsx
import React from 'react';
import type { TimePickerProps } from 'antd';
import { TimePicker } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

const onChange: TimePickerProps['onChange'] = (time, timeString) => {
  console.log(time, timeString);
};

const App: React.FC = () => <TimePicker onChange={onChange} changeOnScroll needConfirm={false} />;

export default App;
```


### 范围选择器

通过 `TimePicker.RangePicker` 使用时间范围选择器。

```tsx
import React from 'react';
import { TimePicker } from 'antd';
import dayjs from 'dayjs';

const format = 'HH:mm:ss';

const App: React.FC = () => {
  const startTime = dayjs('12:08:23', 'HH:mm:ss');
  const endTime = dayjs('12:08:23', 'HH:mm:ss');

  return <TimePicker.RangePicker defaultValue={[startTime, endTime]} format={format} />;
};

export default App;
```

### 形态变体

TimePicker 形态变体，可选 `outlined` `filled` `borderless` `underlined` 四种形态。

```tsx
import React from 'react';
import { Flex, TimePicker } from 'antd';

const { RangePicker } = TimePicker;

const App: React.FC = () => (
  <Flex vertical gap={12}>
    <Flex gap={8}>
      <TimePicker placeholder="Outlined" />
      <RangePicker placeholder={['Outlined Start', 'Outlined End']} />
    </Flex>
    <Flex gap={8}>
      <TimePicker variant="filled" placeholder="Filled" />
      <RangePicker variant="filled" placeholder={['Filled Start', 'Filled End']} />
    </Flex>
    <Flex gap={8}>
      <TimePicker variant="borderless" placeholder="Borderless" />
      <RangePicker variant="borderless" placeholder={['Borderless Start', 'Borderless End']} />
    </Flex>
    <Flex gap={8}>
      <TimePicker variant="underlined" placeholder="Underlined" />
      <RangePicker variant="underlined" placeholder={['Underlined Start', 'Underlined End']} />
    </Flex>
  </Flex>
);

export default App;
```

### 自定义状态

使用 `status` 为 TimePicker 添加状态，可选 `error` 或者 `warning`。

```tsx
import React from 'react';
import { Space, TimePicker } from 'antd';

const App: React.FC = () => (
  <Space vertical>
    <TimePicker status="error" />
    <TimePicker status="warning" />
    <TimePicker.RangePicker status="error" />
    <TimePicker.RangePicker status="warning" />
  </Space>
);

export default App;
```

### 前后缀

自定义前缀 `prefix` 和后缀图标 `suffixIcon`。

```tsx
import React from 'react';
import { SmileOutlined } from '@ant-design/icons';
import { Space, TimePicker } from 'antd';
import type { TimePickerProps } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

const onChange: TimePickerProps['onChange'] = (time, timeString) => {
  console.log(time, timeString);
};

const App: React.FC = () => (
  <Space vertical size={12}>
    <TimePicker
      suffixIcon={<SmileOutlined />}
      onChange={onChange}
      defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')}
    />
    <TimePicker prefix={<SmileOutlined />} />
    <TimePicker.RangePicker prefix={<SmileOutlined />} />
  </Space>
);

export default App;
```

### 自定义语义结构的样式和类

通过 `classNames` 和 `styles` 传入对象/函数可以自定义 TimePicker 的[语义化结构](#semantic-dom)样式。

```tsx
import React from 'react';
import { Flex, TimePicker } from 'antd';
import type { TimePickerProps } from 'antd';
import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => ({
  root: {
    border: `1px solid ${token.colorPrimary}`,
    width: 150,
  },
}));

const stylesObject: TimePickerProps['styles'] = {
  root: {
    borderColor: '#d9d9d9',
  },
};

const stylesFn: TimePickerProps['styles'] = (info) => {
  if (info.props.size === 'large') {
    return {
      root: {
        borderColor: '#722ed1',
      },
      suffix: {
        color: '#722ed1',
      },
      popup: {
        container: { border: '1px solid #722ed1', borderRadius: 8 },
      },
    } satisfies TimePickerProps['styles'];
  }
  return {};
};

const App: React.FC = () => {
  const { styles: classNames } = useStyles();
  return (
    <Flex vertical gap="middle">
      <TimePicker classNames={classNames} styles={stylesObject} placeholder="Object" />
      <TimePicker classNames={classNames} styles={stylesFn} placeholder="Function" size="large" />
    </Flex>
  );
};

export default App;
```



## API

---

通用属性参考：[通用属性](/docs/react/common-props)

```jsx
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)
<TimePicker defaultValue={dayjs('13:30:56', 'HH:mm:ss')} />;
```

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| allowClear | 自定义清除按钮 | boolean \| { clearIcon?: ReactNode } | true | 5.8.0: 支持对象类型 |
| cellRender | 自定义单元格的内容 | (current: number, info: { originNode: React.ReactNode, today: dayjs, range?: 'start' \| 'end', subType: 'hour' \| 'minute' \| 'second' \| 'meridiem' }) => React.ReactNode | - | 5.4.0 |
| changeOnScroll | 在滚动时改变选择值 | boolean | false | 5.14.0 |
| className | 选择器类名 | string | - |  |
| classNames | 用于自定义组件内部各语义化结构的 class，支持对象或函数 | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), string> | - |  |
| defaultValue | 默认时间 | [dayjs](http://day.js.org/) | - |  |
| disabled | 禁用全部操作 | boolean | false |  |
| disabledTime | 不可选择的时间 | [DisabledTime](#disabledtime) | - | 4.19.0 |
| format | 展示的时间格式 | string | `HH:mm:ss` |  |
| getPopupContainer | 定义浮层的容器，默认为 body 上新建 div | function(trigger) | - |  |
| hideDisabledOptions | 隐藏禁止选择的选项 | boolean | false |  |
| hourStep | 小时选项间隔 | number | 1 |  |
| inputReadOnly | 设置输入框为只读（避免在移动设备上打开虚拟键盘） | boolean | false |  |
| minuteStep | 分钟选项间隔 | number | 1 |  |
| needConfirm | 是否需要确认按钮，为 `false` 时失去焦点即代表选择 | boolean | - | 5.14.0 |
| open | 面板是否打开 | boolean | false |  |
| placeholder | 没有值的时候显示的内容 | string \| \[string, string] | `请选择时间` |  |
| placement | 选择框弹出的位置 | `bottomLeft` `bottomRight` `topLeft` `topRight` | bottomLeft |  |
| ~~popupClassName~~ | 弹出层类名，请使用 `classNames.popup` 替换 | string | - |  |
| ~~popupStyle~~ | 弹出层样式对象, 请使用 `styles.popup` 替换 | object | - |  |
| prefix | 自定义前缀 | ReactNode | - | 5.22.0 |
| previewValue | 当用户选择时间悬停选项时，输入字段的值会发生临时更改 | false \| hover | hover | 6.0.0 |
| renderExtraFooter | 选择框底部显示自定义的内容 | () => ReactNode | - |  |
| secondStep | 秒选项间隔 | number | 1 |  |
| showNow | 面板是否显示“此刻”按钮 | boolean | - | 4.4.0 |
| size | 输入框大小，`large` 高度为 40px，`small` 为 24px，默认是 32px | `large` \| `middle` \| `small` | - |  |
| status | 设置校验状态 | 'error' \| 'warning' | - | 4.19.0 |
| styles | 用于自定义组件内部各语义化结构的行内 style，支持对象或函数 | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties> | - |  |
| suffixIcon | 自定义的选择框后缀图标 | ReactNode | - |  |
| use12Hours | 使用 12 小时制，为 true 时 `format` 默认为 `h:mm:ss a` | boolean | false |  |
| value | 当前时间 | [dayjs](http://day.js.org/) | - |  |
| variant | 形态变体 | `outlined` \| `borderless` \| `filled` \| `underlined` | `outlined` | 5.13.0 \| `underlined`: 5.24.0 |
| onCalendarChange | 待选日期发生变化的回调。`info` 参数自 4.4.0 添加 | function(dates: \[dayjs, dayjs], dateStrings: \[string, string], info: { range:`start`\|`end` }) | - |  |
| onChange | 时间发生变化的回调 | function(time: dayjs, timeString: string): void | - |  |
| onOpenChange | 面板打开/关闭时的回调 | (open: boolean) => void | - |  |

#### DisabledTime

```typescript
type DisabledTime = (now: Dayjs) => {
  disabledHours?: () => number[];
  disabledMinutes?: (selectedHour: number) => number[];
  disabledSeconds?: (selectedHour: number, selectedMinute: number) => number[];
  disabledMilliseconds?: (
    selectedHour: number,
    selectedMinute: number,
    selectedSecond: number,
  ) => number[];
};
```

注意：`disabledMilliseconds` 为 `5.14.0` 新增。

## 方法

| 名称    | 描述     | 版本 |
| ------- | -------- | ---- |
| blur()  | 移除焦点 |      |
| focus() | 获取焦点 |      |

## RangePicker

属性与 DatePicker 的 [RangePicker](/components/date-picker-cn#rangepicker) 相同。还包含以下属性：

| 参数         | 说明                 | 类型                                    | 默认值 | 版本   |
| ------------ | -------------------- | --------------------------------------- | ------ | ------ |
| disabledTime | 不可选择的时间       | [RangeDisabledTime](#rangedisabledtime) | -      | 4.19.0 |
| order        | 始末时间是否自动排序 | boolean                                 | true   | 4.1.0  |

### RangeDisabledTime

```typescript
type RangeDisabledTime = (
  now: Dayjs,
  type = 'start' | 'end',
) => {
  disabledHours?: () => number[];
  disabledMinutes?: (selectedHour: number) => number[];
  disabledSeconds?: (selectedHour: number, selectedMinute: number) => number[];
};
```

## Semantic DOM

https://ant.design/components/time-picker-cn/semantic.md

## 主题变量（Design Token）{#design-token}



## 组件 Token (DatePicker)
| Token 名称 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| activeBg | 输入框激活状态时背景颜色 | string | #ffffff |
| activeBorderColor | 激活态边框色 | string | #1677ff |
| activeShadow | 激活态阴影 | string | 0 0 0 2px rgba(5,145,255,0.1) |
| addonBg | 前/后置标签背景色 | string | rgba(0,0,0,0.02) |
| cellActiveWithRangeBg | 选取范围内的单元格背景色 | string | #e6f4ff |
| cellBgDisabled | 单元格禁用态背景色 | string | rgba(0,0,0,0.04) |
| cellHeight | 单元格高度 | number | 24 |
| cellHoverBg | 单元格悬浮态背景色 | string | rgba(0,0,0,0.04) |
| cellHoverWithRangeBg | 选取范围内的单元格悬浮态背景色 | string | #cbe0fd |
| cellRangeBorderColor | 选取范围时单元格边框色 | string | #82b4f9 |
| cellWidth | 单元格宽度 | number | 36 |
| errorActiveShadow | 错误状态时激活态阴影 | string | 0 0 0 2px rgba(255,38,5,0.06) |
| hoverBg | 输入框hover状态时背景颜色 | string | #ffffff |
| hoverBorderColor | 悬浮态边框色 | string | #4096ff |
| inputFontSize | 字体大小 | number | 14 |
| inputFontSizeLG | 大号字体大小 | number | 16 |
| inputFontSizeSM | 小号字体大小 | number | 14 |
| multipleItemBg | 多选标签背景色 | string | rgba(0,0,0,0.06) |
| multipleItemBorderColor | 多选标签边框色 | string | transparent |
| multipleItemBorderColorDisabled | 多选标签禁用边框色 | string | transparent |
| multipleItemColorDisabled | 多选标签禁用文本颜色 | string | rgba(0,0,0,0.25) |
| multipleItemHeight | 多选标签高度 | number | 24 |
| multipleItemHeightLG | 大号多选标签高度 | number | 32 |
| multipleItemHeightSM | 小号多选标签高度 | number | 16 |
| multipleSelectorBgDisabled | 多选框禁用背景 | string | rgba(0,0,0,0.04) |
| paddingBlock | 输入框纵向内边距 | number | 4 |
| paddingBlockLG | 大号输入框纵向内边距 | number | 7 |
| paddingBlockSM | 小号输入框纵向内边距 | number | 0 |
| paddingInline | 输入框横向内边距 | number | 11 |
| paddingInlineLG | 大号输入框横向内边距 | number | 11 |
| paddingInlineSM | 小号输入框横向内边距 | number | 7 |
| presetsMaxWidth | 预设区域最大宽度 | number | 200 |
| presetsWidth | 预设区域宽度 | number | 120 |
| textHeight | 单元格文本高度 | number | 40 |
| timeCellHeight | 时间单元格高度 | number | 28 |
| timeColumnHeight | 时间列高度 | number | 224 |
| timeColumnWidth | 时间列宽度 | number | 56 |
| warningActiveShadow | 警告状态时激活态阴影 | string | 0 0 0 2px rgba(255,215,5,0.1) |
| withoutTimeCellHeight | 十年/年/季/月/周单元格高度 | number | 66 |
| zIndexPopup | 弹窗 z-index | number | 1050 |

## 全局 Token
| Token 名称 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| borderRadius | 基础组件的圆角大小，例如按钮、输入框、卡片等 | number |  |
| borderRadiusLG | LG号圆角，用于组件中的一些大圆角，如 Card、Modal 等一些组件样式。 | number |  |
| borderRadiusSM | SM号圆角，用于组件小尺寸下的圆角，如 Button、Input、Select 等输入类控件在 small size 下的圆角 | number |  |
| borderRadiusXS | XS号圆角，用于组件中的一些小圆角，如 Segmented 、Arrow 等一些内部圆角的组件样式中。 | number |  |
| boxShadowSecondary | 控制元素二级阴影样式。 | string |  |
| colorBgContainer | 组件的容器背景色，例如：默认按钮、输入框等。务必不要将其与 `colorBgElevated` 混淆。 | string |  |
| colorBgContainerDisabled | 控制容器在禁用状态下的背景色。 | string |  |
| colorBgElevated | 浮层容器背景色，在暗色模式下该 token 的色值会比 `colorBgContainer` 要亮一些。例如：模态框、弹出框、菜单等。 | string |  |
| colorBorder | 默认使用的边框颜色, 用于分割不同的元素，例如：表单的分割线、卡片的分割线等。 | string |  |
| colorError | 用于表示操作失败的 Token 序列，如失败按钮、错误状态提示（Result）组件等。 | string |  |
| colorErrorBg | 错误色的浅色背景颜色 | string |  |
| colorErrorBgHover | 错误色的浅色背景色悬浮态 | string |  |
| colorErrorBorderHover | 错误色的描边色悬浮态 | string |  |
| colorErrorText | 错误色的文本默认态 | string |  |
| colorFillSecondary | 二级填充色可以较为明显地勾勒出元素形体，如 Rate、Skeleton 等。也可以作为三级填充色的 Hover 状态，如 Table 等。 | string |  |
| colorFillTertiary | 三级填充色用于勾勒出元素形体的场景，如 Slider、Segmented 等。如无强调需求的情况下，建议使用三级填色作为默认填色。 | string |  |
| colorIcon | 控制弱操作图标的颜色，例如 allowClear 或 Alert 关闭按钮。  * | string |  |
| colorIconHover | 控制弱操作图标在悬浮状态下的颜色，例如 allowClear 或 Alert 关闭按钮。 | string |  |
| colorPrimary | 品牌色是体现产品特性和传播理念最直观的视觉元素之一。在你完成品牌主色的选取之后，我们会自动帮你生成一套完整的色板，并赋予它们有效的设计语义 | string |  |
| colorPrimaryBorder | 主色梯度下的描边用色，用在 Slider 等组件的描边上。 | string |  |
| colorSplit | 用于作为分割线的颜色，此颜色和 colorBorderSecondary 的颜色一致，但是用的是透明色。 | string |  |
| colorText | 最深的文本色。为了符合W3C标准，默认的文本颜色使用了该色，同时这个颜色也是最深的中性色。 | string |  |
| colorTextDisabled | 控制禁用状态下的字体颜色。 | string |  |
| colorTextHeading | 控制标题字体颜色。 | string |  |
| colorTextLightSolid | 控制带背景色的文本，例如 Primary Button 组件中的文本高亮颜色。 | string |  |
| colorTextPlaceholder | 控制占位文本的颜色。 | string |  |
| colorTextQuaternary | 第四级文本色是最浅的文本色，例如表单的输入提示文本、禁用色文本等。 | string |  |
| colorTextTertiary | 第三级文本色一般用于描述性文本，例如表单的中的补充说明文本、列表的描述性文本等场景。 | string |  |
| colorWarning | 用于表示操作警告的 Token 序列，如 Notification、 Alert等警告类组件或 Input 输入类等组件会使用该组梯度变量。 | string |  |
| colorWarningBg | 警戒色的浅色背景颜色 | string |  |
| colorWarningBgHover | 警戒色的浅色背景色悬浮态 | string |  |
| colorWarningBorderHover | 警戒色的描边色悬浮态 | string |  |
| colorWarningText | 警戒色的文本默认态 | string |  |
| controlHeight | Ant Design 中按钮和输入框等基础控件的高度 | number |  |
| controlHeightLG | 较高的组件高度 | number |  |
| controlHeightSM | 较小的组件高度 | number |  |
| controlItemBgActive | 控制组件项在激活状态下的背景颜色。 | string |  |
| fontFamily | Ant Design 的字体家族中优先使用系统默认的界面字体，同时提供了一套利于屏显的备用字体库，来维护在不同平台以及浏览器的显示下，字体始终保持良好的易读性和可读性，体现了友好、稳定和专业的特性。 | string |  |
| fontSize | 设计系统中使用最广泛的字体大小，文本梯度也将基于该字号进行派生。 | number |  |
| fontSizeLG | 大号字体大小 | number |  |
| fontSizeSM | 小号字体大小 | number |  |
| fontWeightStrong | 控制标题类组件（如 h1、h2、h3）或选中项的字体粗细。 | number |  |
| lineHeight | 文本行高 | number |  |
| lineHeightLG | 大型文本行高 | number |  |
| lineType | 用于控制组件边框、分割线等的样式，默认是实线 | string |  |
| lineWidth | 用于控制组件边框、分割线等的宽度 | number |  |
| lineWidthBold | 描边类组件的默认线宽，如 Button、Input、Select 等输入类控件。 | number |  |
| marginXS | 控制元素外边距，小尺寸。 | number |  |
| marginXXS | 控制元素外边距，最小尺寸。 | number |  |
| motionDurationMid | 动效播放速度，中速。用于中型元素动画交互 | string |  |
| motionDurationSlow | 动效播放速度，慢速。用于大型元素如面板动画交互 | string |  |
| motionEaseInOutCirc | 预设动效曲率 | string |  |
| motionEaseInQuint | 预设动效曲率 | string |  |
| motionEaseOutCirc | 预设动效曲率 | string |  |
| motionEaseOutQuint | 预设动效曲率 | string |  |
| padding | 控制元素的内间距。 | number |  |
| paddingSM | 控制元素的小内间距。 | number |  |
| paddingXS | 控制元素的特小内间距。 | number |  |
| paddingXXS | 控制元素的极小内间距。 | number |  |
| sizePopupArrow | 组件箭头的尺寸 | number |  |



## FAQ

- [如何在 TimePicker 中使用自定义日期库（如 Moment.js ）](/docs/react/use-custom-date-library#timepicker)
