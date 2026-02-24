---
category: Components
group: Data Entry
title: TimePicker
description: To select/input a time.
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*kGmGSLk_1fwAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*1hDmQJIDFJQAAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
---

## When To Use

By clicking the input box, you can select a time from a popup panel.

## Examples

### Basic

Click `TimePicker`, and then we could select or input a time in panel.

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

### Under Control

`value` and `onChange` should be used together,

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

### Three Sizes

The input box comes in three sizes: large, middle and small. Large is used in the form, while the medium size is the default.

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

### Need Confirm

TimePicker will automatically determine whether to show a confirm button according to the `picker` property. You can also set the `needConfirm` property to determine whether to show a confirm button. When `needConfirm` is set, the user must click the confirm button to complete the selection. Otherwise, the selection will be submitted when the picker loses focus or select a time.

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

### disabled

A disabled state of the `TimePicker`.

```tsx
import React from 'react';
import { TimePicker } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

const App: React.FC = () => <TimePicker defaultValue={dayjs('12:08:23', 'HH:mm:ss')} disabled />;

export default App;
```

### Hour and minute

While part of `format` is omitted, the corresponding column in panel will disappear, too.

```tsx
import React from 'react';
import { TimePicker } from 'antd';
import dayjs from 'dayjs';

const format = 'HH:mm';

const App: React.FC = () => <TimePicker defaultValue={dayjs('12:08', format)} format={format} />;

export default App;
```

### interval option

Show stepped options by `hourStep` `minuteStep` `secondStep`.

```tsx
import React from 'react';
import { TimePicker } from 'antd';

const App: React.FC = () => <TimePicker minuteStep={15} secondStep={10} hourStep={1} />;

export default App;
```

### Addon

Render addon contents to time picker panel's bottom.

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

### 12 hours

TimePicker of 12 hours format, with default format `h:mm:ss a`.

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

### Change on scroll

Use `changeOnScroll` and `needConfirm` to change the value when scrolling.

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


### Time Range Picker

Use time range picker with `TimePicker.RangePicker`.

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

### Variants

Variants of TimePicker, there are four variants: `outlined` `filled` `borderless` and `underlined`.

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

### Status

Add status to TimePicker with `status`, which could be `error` or `warning`.

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

### Prefix and Suffix

Custom `prefix` and `suffixIcon`.

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

### Custom semantic dom styling

You can customize the [semantic dom](#semantic-dom) style of TimePicker by passing objects/functions through `classNames` and `styles`.

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

Common props ref：[Common props](/docs/react/common-props)

```jsx
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)

<TimePicker defaultValue={dayjs('13:30:56', 'HH:mm:ss')} />;
```

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| allowClear | Customize clear icon | boolean \| { clearIcon?: ReactNode } | true | 5.8.0: Support object type |
| cellRender | Custom rendering function for picker cells | (current: number, info: { originNode: React.ReactElement, today: dayjs, range?: 'start' \| 'end', subType: 'hour' \| 'minute' \| 'second' \| 'meridiem' }) => React.ReactNode | - | 5.4.0 |
| changeOnScroll | Trigger selection when scroll the column | boolean | false | 5.14.0 |
| className | The className of picker | string | - |  |
| classNames | Customize class for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), string> | - |  |
| defaultValue | To set default time | [dayjs](https://day.js.org/) | - |  |
| disabled | Determine whether the TimePicker is disabled | boolean | false |  |
| disabledTime | To specify the time that cannot be selected | [DisabledTime](#disabledtime) | - | 4.19.0 |
| format | To set the time format | string | `HH:mm:ss` |  |
| getPopupContainer | To set the container of the floating layer, while the default is to create a div element in body | function(trigger) | - |  |
| hideDisabledOptions | Whether hide the options that can not be selected | boolean | false |  |
| hourStep | Interval between hours in picker | number | 1 |  |
| inputReadOnly | Set the `readonly` attribute of the input tag (avoids virtual keyboard on touch devices) | boolean | false |  |
| minuteStep | Interval between minutes in picker | number | 1 |  |
| needConfirm | Need click confirm button to trigger value change | boolean | - | 5.14.0 |
| open | Whether to popup panel | boolean | false |  |
| placeholder | Display when there's no value | string \| \[string, string] | `Select a time` |  |
| placement | The position where the selection box pops up | `bottomLeft` `bottomRight` `topLeft` `topRight` | bottomLeft |  |
| ~~popupClassName~~ | The className of panel, please use `classNames.popup` instead | string | - |  |
| ~~popupStyle~~ | The style of panel, please use `styles.popup` instead | CSSProperties | - |  |
| prefix | The custom prefix | ReactNode | - | 5.22.0 |
| previewValue | When the user selects the time hover option, the value of the input field undergoes a temporary change | false \| hover | hover | 6.0.0 |
| renderExtraFooter | Called from time picker panel to render some addon to its bottom | () => ReactNode | - |  |
| secondStep | Interval between seconds in picker | number | 1 |  |
| showNow | Whether to show `Now` button on panel | boolean | - | 4.4.0 |
| size | To determine the size of the input box, the height of `large` and `small`, are 40px and 24px respectively, while default size is 32px | `large` \| `middle` \| `small` | - |  |
| status | Set validation status | 'error' \| 'warning' \| 'success' \| 'validating' | - | 4.19.0 |
| styles | Customize inline style for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties> | - |  |
| suffixIcon | The custom suffix icon | ReactNode | - |  |
| use12Hours | Display as 12 hours format, with default format `h:mm:ss a` | boolean | false |  |
| value | To set time | [dayjs](https://day.js.org/) | - |  |
| variant | Variants of picker | `outlined` \| `borderless` \| `filled` \| `underlined` | `outlined` | 5.13.0 \| `underlined`: 5.24.0 |
| onCalendarChange | Callback function, can be executed when the start time or the end time of the range is changing. `info` argument is added in 4.4.0 | function(dates: \[dayjs, dayjs], dateStrings: \[string, string], info: { range:`start`\|`end` }) | - |  |
| onChange | A callback function, can be executed when the selected time is changing | function(time: dayjs, timeString: string): void | - |  |
| onOpenChange | A callback function which will be called while panel opening/closing | (open: boolean) => void | - |  |

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

Note: `disabledMilliseconds` is added in `5.14.0`.

## Methods

| Name    | Description  | Version |
| ------- | ------------ | ------- |
| blur()  | Remove focus |         |
| focus() | Get focus    |         |

### RangePicker

Same props from [RangePicker](/components/date-picker/#rangepicker) of DatePicker. And includes additional props:

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| disabledTime | To specify the time that cannot be selected | [RangeDisabledTime](#rangedisabledtime) | - | 4.19.0 |
| order | Order start and end time | boolean | true | 4.1.0 |

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

https://ant.design/components/time-picker/semantic.md

## Design Token



## Component Token (DatePicker)
| Token Name | Description | Type | Default Value |
| --- | --- | --- | --- |
| activeBg | Background color when the input box is activated | string | #ffffff |
| activeBorderColor | Active border color | string | #1677ff |
| activeShadow | Box-shadow when active | string | 0 0 0 2px rgba(5,145,255,0.1) |
| addonBg | Background color of addon | string | rgba(0,0,0,0.02) |
| cellActiveWithRangeBg | Background color of cell in range | string | #e6f4ff |
| cellBgDisabled | Background color of disabled cell | string | rgba(0,0,0,0.04) |
| cellHeight | Height of cell | number | 24 |
| cellHoverBg | Background color of cell hover state | string | rgba(0,0,0,0.04) |
| cellHoverWithRangeBg | Background color of hovered cell in range | string | #cbe0fd |
| cellRangeBorderColor | Border color of cell in range when picking | string | #82b4f9 |
| cellWidth | Width of cell | number | 36 |
| errorActiveShadow | Box-shadow when active in error status | string | 0 0 0 2px rgba(255,38,5,0.06) |
| hoverBg | Background color when the input box hovers | string | #ffffff |
| hoverBorderColor | Hover border color | string | #4096ff |
| inputFontSize | Font size | number | 14 |
| inputFontSizeLG | Font size of large | number | 16 |
| inputFontSizeSM | Font size of small | number | 14 |
| multipleItemBg | Background color of multiple tag | string | rgba(0,0,0,0.06) |
| multipleItemBorderColor | Border color of multiple tag | string | transparent |
| multipleItemBorderColorDisabled | Border color of multiple tag when disabled | string | transparent |
| multipleItemColorDisabled | Text color of multiple tag when disabled | string | rgba(0,0,0,0.25) |
| multipleItemHeight | Height of multiple tag | number | 24 |
| multipleItemHeightLG | Height of multiple tag with large size | number | 32 |
| multipleItemHeightSM | Height of multiple tag with small size | number | 16 |
| multipleSelectorBgDisabled | Background color of multiple selector when disabled | string | rgba(0,0,0,0.04) |
| paddingBlock | Vertical padding of input | number | 4 |
| paddingBlockLG | Vertical padding of large input | number | 7 |
| paddingBlockSM | Vertical padding of small input | number | 0 |
| paddingInline | Horizontal padding of input | number | 11 |
| paddingInlineLG | Horizontal padding of large input | number | 11 |
| paddingInlineSM | Horizontal padding of small input | number | 7 |
| presetsMaxWidth | Max width of preset area | number | 200 |
| presetsWidth | Width of preset area | number | 120 |
| textHeight | Height of cell text | number | 40 |
| timeCellHeight | Height of time cell | number | 28 |
| timeColumnHeight | Height of time column | number | 224 |
| timeColumnWidth | Width of time column | number | 56 |
| warningActiveShadow | Box-shadow when active in warning status | string | 0 0 0 2px rgba(255,215,5,0.1) |
| withoutTimeCellHeight | Height of decade/year/quarter/month/week cell | number | 66 |
| zIndexPopup | z-index of popup | number | 1050 |

## Global Token
| Token Name | Description | Type | Default Value |
| --- | --- | --- | --- |
| borderRadius | Border radius of base components | number |  |
| borderRadiusLG | LG size border radius, used in some large border radius components, such as Card, Modal and other components. | number |  |
| borderRadiusSM | SM size border radius, used in small size components, such as Button, Input, Select and other input components in small size | number |  |
| borderRadiusXS | XS size border radius, used in some small border radius components, such as Segmented, Arrow and other components with small border radius. | number |  |
| boxShadowSecondary | Control the secondary box shadow style of an element. | string |  |
| colorBgContainer | Container background color, e.g: default button, input box, etc. Be sure not to confuse this with `colorBgElevated`. | string |  |
| colorBgContainerDisabled | Control the background color of container in disabled state. | string |  |
| colorBgElevated | Container background color of the popup layer, in dark mode the color value of this token will be a little brighter than `colorBgContainer`. E.g: modal, pop-up, menu, etc. | string |  |
| colorBorder | Default border color, used to separate different elements, such as: form separator, card separator, etc. | string |  |
| colorError | Used to represent the visual elements of the operation failure, such as the error Button, error Result component, etc. | string |  |
| colorErrorBg | The background color of the error state. | string |  |
| colorErrorBgHover | The hover state background color of the error state. | string |  |
| colorErrorBorderHover | The hover state border color of the error state. | string |  |
| colorErrorText | The default state of the text in the error color. | string |  |
| colorFillSecondary | The second level of fill color can outline the shape of the element more clearly, such as Rate, Skeleton, etc. It can also be used as the Hover state of the third level of fill color, such as Table, etc. | string |  |
| colorFillTertiary | The third level of fill color is used to outline the shape of the element, such as Slider, Segmented, etc. If there is no emphasis requirement, it is recommended to use the third level of fill color as the default fill color. | string |  |
| colorIcon | Weak action. Such as `allowClear` or Alert close button | string |  |
| colorIconHover | Weak action hover color. Such as `allowClear` or Alert close button | string |  |
| colorPrimary | Brand color is one of the most direct visual elements to reflect the characteristics and communication of the product. After you have selected the brand color, we will automatically generate a complete color palette and assign it effective design semantics. | string |  |
| colorPrimaryBorder | The stroke color under the main color gradient, used on the stroke of components such as Slider. | string |  |
| colorSplit | Used as the color of separator, this color is the same as colorBorderSecondary but with transparency. | string |  |
| colorText | Default text color which comply with W3C standards, and this color is also the darkest neutral color. | string |  |
| colorTextDisabled | Control the color of text in disabled state. | string |  |
| colorTextHeading | Control the font color of heading. | string |  |
| colorTextLightSolid | Control the highlight color of text with background color, such as the text in Primary Button components. | string |  |
| colorTextPlaceholder | Control the color of placeholder text. | string |  |
| colorTextQuaternary | The fourth level of text color is the lightest text color, such as form input prompt text, disabled color text, etc. | string |  |
| colorTextTertiary | The third level of text color is generally used for descriptive text, such as form supplementary explanation text, list descriptive text, etc. | string |  |
| colorWarning | Used to represent the warning map token, such as Notification, Alert, etc. Alert or Control component(like Input) will use these map tokens. | string |  |
| colorWarningBg | The background color of the warning state. | string |  |
| colorWarningBgHover | The hover state background color of the warning state. | string |  |
| colorWarningBorderHover | The hover state border color of the warning state. | string |  |
| colorWarningText | The default state of the text in the warning color. | string |  |
| controlHeight | The height of the basic controls such as buttons and input boxes in Ant Design | number |  |
| controlHeightLG | LG component height | number |  |
| controlHeightSM | SM component height | number |  |
| controlItemBgActive | Control the background color of control component item when active. | string |  |
| fontFamily | The font family of Ant Design prioritizes the default interface font of the system, and provides a set of alternative font libraries that are suitable for screen display to maintain the readability and readability of the font under different platforms and browsers, reflecting the friendly, stable and professional characteristics. | string |  |
| fontSize | The most widely used font size in the design system, from which the text gradient will be derived. | number |  |
| fontSizeLG | Large font size | number |  |
| fontSizeSM | Small font size | number |  |
| fontWeightStrong | Control the font weight of heading components (such as h1, h2, h3) or selected item. | number |  |
| lineHeight | Line height of text. | number |  |
| lineHeightLG | Line height of large text. | number |  |
| lineType | Border style of base components | string |  |
| lineWidth | Border width of base components | number |  |
| lineWidthBold | The default line width of the outline class components, such as Button, Input, Select, etc. | number |  |
| marginXS | Control the margin of an element, with a small size. | number |  |
| marginXXS | Control the margin of an element, with the smallest size. | number |  |
| motionDurationMid | Motion speed, medium speed. Used for medium element animation interaction. | string |  |
| motionDurationSlow | Motion speed, slow speed. Used for large element animation interaction. | string |  |
| motionEaseInOutCirc | Preset motion curve. | string |  |
| motionEaseInQuint | Preset motion curve. | string |  |
| motionEaseOutCirc | Preset motion curve. | string |  |
| motionEaseOutQuint | Preset motion curve. | string |  |
| padding | Control the padding of the element. | number |  |
| paddingSM | Control the small padding of the element. | number |  |
| paddingXS | Control the extra small padding of the element. | number |  |
| paddingXXS | Control the extra extra small padding of the element. | number |  |
| sizePopupArrow | The size of the component arrow | number |  |



## FAQ

- [How to use TimePicker with customize date library like dayjs](/docs/react/use-custom-date-library#timepicker)
