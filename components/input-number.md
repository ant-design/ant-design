---
category: Components
group: Data Entry
title: InputNumber
description: Enter a number within certain range with the mouse or keyboard.
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*JvWbSYhuNlIAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*1uH-R5kLAMIAAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
---

## When To Use

When a numeric value needs to be provided.

## Examples

### Basic

Numeric-only input box.

```tsx
import React from 'react';
import type { InputNumberProps } from 'antd';
import { InputNumber } from 'antd';

const onChange: InputNumberProps['onChange'] = (value) => {
  console.log('changed', value);
};

const App: React.FC = () => <InputNumber min={1} max={10} defaultValue={3} onChange={onChange} />;

export default App;
```

### Sizes

There are three sizes available to a numeric input box. By default, the size is `32px`. The two additional sizes are `large` and `small` which means `40px` and `24px`, respectively.

```tsx
import React from 'react';
import type { InputNumberProps } from 'antd';
import { InputNumber, Space } from 'antd';

const onChange: InputNumberProps['onChange'] = (value) => {
  console.log('changed', value);
};

const App: React.FC = () => (
  <Space wrap>
    <InputNumber size="large" min={1} max={100000} defaultValue={3} onChange={onChange} />
    <InputNumber min={1} max={100000} defaultValue={3} onChange={onChange} />
    <InputNumber size="small" min={1} max={100000} defaultValue={3} onChange={onChange} />
  </Space>
);

export default App;
```


### Disabled

Click the button to toggle between available and disabled states.

```tsx
import React, { useState } from 'react';
import { Button, InputNumber } from 'antd';

const App: React.FC = () => {
  const [disabled, setDisabled] = useState(true);

  const toggle = () => {
    setDisabled(!disabled);
  };

  return (
    <>
      <InputNumber min={1} max={10} disabled={disabled} defaultValue={3} />
      <div style={{ marginTop: 20 }}>
        <Button onClick={toggle} type="primary">
          Toggle disabled
        </Button>
      </div>
    </>
  );
};

export default App;
```

### High precision decimals

Use `stringMode` to support high precision decimals support. `onChange` will return string value instead. You need polyfill of BigInt if browser not support.

```tsx
import React from 'react';
import type { InputNumberProps } from 'antd';
import { InputNumber } from 'antd';

const onChange: InputNumberProps['onChange'] = (value) => {
  console.log('changed', value);
};

const App: React.FC = () => (
  <InputNumber<string>
    style={{ width: 200 }}
    defaultValue="1"
    min="0"
    max="10"
    step="0.00000000000001"
    onChange={onChange}
    stringMode
  />
);

export default App;
```

### Formatter

Display value within it's situation with `formatter`, and we usually use `parser` at the same time.

> Here is a Intl.NumberFormat InputNumber implementation: [https://codesandbox.io/s/currency-wrapper-antd-input-3ynzo](https://codesandbox.io/s/currency-wrapper-antd-input-3ynzo)

```tsx
import React from 'react';
import type { InputNumberProps } from 'antd';
import { InputNumber, Space } from 'antd';

const onChange: InputNumberProps['onChange'] = (value) => {
  console.log('changed', value);
};

const formatter: InputNumberProps<number>['formatter'] = (value) => {
  const [start, end] = `${value}`.split('.') || [];
  const v = `${start}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return `$ ${end ? `${v}.${end}` : `${v}`}`;
};

const App: React.FC = () => (
  <Space>
    <InputNumber<number>
      defaultValue={1000}
      formatter={formatter}
      parser={(value) => value?.replace(/\$\s?|(,*)/g, '') as unknown as number}
      onChange={onChange}
    />
    <InputNumber<number>
      defaultValue={100}
      min={0}
      max={100}
      formatter={(value) => `${value}%`}
      parser={(value) => value?.replace('%', '') as unknown as number}
      onChange={onChange}
    />
  </Space>
);

export default App;
```

### Keyboard

Control keyboard behavior by `keyboard`.

```tsx
import React, { useState } from 'react';
import { Checkbox, InputNumber, Space } from 'antd';

const App: React.FC = () => {
  const [keyboard, setKeyboard] = useState(true);

  return (
    <Space>
      <InputNumber min={1} max={10} keyboard={keyboard} defaultValue={3} />
      <Checkbox
        onChange={() => {
          setKeyboard(!keyboard);
        }}
        checked={keyboard}
      >
        Toggle keyboard
      </Checkbox>
    </Space>
  );
};

export default App;
```

### Wheel

Control with mouse wheel.

```tsx
import React from 'react';
import type { InputNumberProps } from 'antd';
import { InputNumber } from 'antd';

const onChange: InputNumberProps['onChange'] = (value) => {
  console.log('changed', value);
};

const onStep: InputNumberProps['onStep'] = (value, info) => {
  console.log('onStep', value, info);
};

const App: React.FC = () => (
  <InputNumber
    min={1}
    max={10}
    defaultValue={3}
    onChange={onChange}
    onStep={onStep}
    changeOnWheel
  />
);

export default App;
```

### Variants

Variants of InputNumber, there are four variants: `outlined` `filled` `borderless` and `underlined`.

```tsx
import React from 'react';
import { Flex, InputNumber } from 'antd';

const App: React.FC = () => (
  <Flex vertical gap={12}>
    <InputNumber placeholder="Outlined" style={{ width: 200 }} />
    <InputNumber placeholder="Filled" variant="filled" style={{ width: 200 }} />
    <InputNumber placeholder="Borderless" variant="borderless" style={{ width: 200 }} />
    <InputNumber placeholder="Underlined" variant="underlined" style={{ width: 200 }} />
  </Flex>
);

export default App;
```

### Spinner

Digit spinner.

```tsx
import React from 'react';
import type { InputNumberProps } from 'antd';
import { Flex, InputNumber } from 'antd';

const onChange: InputNumberProps['onChange'] = (value) => {
  console.log('changed', value);
};

const sharedProps = {
  mode: 'spinner' as const,
  min: 1,
  max: 10,
  defaultValue: 3,
  onChange,
  style: { width: 150 },
};

const App: React.FC = () => (
  <Flex vertical gap="middle">
    <InputNumber {...sharedProps} placeholder="Outlined" />
    <InputNumber {...sharedProps} variant="filled" placeholder="Filled" />
  </Flex>
);

export default App;
```


### Out of range

Show warning style when `value` is out of range by control.

```tsx
import React, { useState } from 'react';
import { Button, InputNumber, Space } from 'antd';

const App: React.FC = () => {
  const [value, setValue] = useState<string | number | null>('99');

  return (
    <Space>
      <InputNumber min={1} max={10} value={value} onChange={setValue} />
      <Button
        type="primary"
        onClick={() => {
          setValue(99);
        }}
      >
        Reset
      </Button>
    </Space>
  );
};

export default App;
```

### Prefix / Suffix

Add a prefix or suffix inside input.

```tsx
import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Flex, InputNumber, Space } from 'antd';

const App: React.FC = () => (
  <Flex vertical gap="middle">
    <InputNumber prefix="￥" style={{ width: '100%' }} />

    <Space.Compact block>
      <Space.Addon>
        <UserOutlined />
      </Space.Addon>
      <InputNumber prefix="￥" style={{ width: '100%' }} />
    </Space.Compact>

    <InputNumber prefix="￥" disabled style={{ width: '100%' }} />

    <InputNumber suffix="RMB" style={{ width: '100%' }} />
  </Flex>
);

export default App;
```

### Status

Add status to InputNumber with `status`, which could be `error` or `warning`.

```tsx
import React from 'react';
import ClockCircleOutlined from '@ant-design/icons/ClockCircleOutlined';
import { InputNumber, Space } from 'antd';

const App: React.FC = () => (
  <Space vertical style={{ width: '100%' }}>
    <InputNumber status="error" style={{ width: '100%' }} />
    <InputNumber status="warning" style={{ width: '100%' }} />
    <InputNumber status="error" style={{ width: '100%' }} prefix={<ClockCircleOutlined />} />
    <InputNumber status="warning" style={{ width: '100%' }} prefix={<ClockCircleOutlined />} />
  </Space>
);

export default App;
```

### Focus

Focus with additional option.

```tsx
import React, { useRef } from 'react';
import type { GetRef } from 'antd';
import { Button, InputNumber, Space } from 'antd';

type InputNumberRef = GetRef<typeof InputNumber>;

const App: React.FC = () => {
  const inputRef = useRef<InputNumberRef>(null);
  return (
    <Space vertical style={{ width: '100%' }}>
      <Space wrap>
        <Button
          onClick={() => {
            inputRef.current?.focus({ cursor: 'start' });
          }}
        >
          Focus at first
        </Button>
        <Button
          onClick={() => {
            inputRef.current?.focus({ cursor: 'end' });
          }}
        >
          Focus at last
        </Button>
        <Button
          onClick={() => {
            inputRef.current?.focus({ cursor: 'all' });
          }}
        >
          Focus to select all
        </Button>
        <Button
          onClick={() => {
            inputRef.current?.focus({ preventScroll: true });
          }}
        >
          Focus prevent scroll
        </Button>
      </Space>
      <InputNumber style={{ width: '100%' }} defaultValue={999} ref={inputRef} />
    </Space>
  );
};

export default App;
```

### Custom semantic dom styling

You can customize the [semantic dom](#semantic-dom) style of the InputNumber by passing objects/functions through `classNames` and `styles`.

```tsx
import React from 'react';
import { Flex, InputNumber } from 'antd';
import type { InputNumberProps } from 'antd';
import { createStyles } from 'antd-style';

const useStyle = createStyles(({ token }) => ({
  root: {
    border: `1px solid ${token.colorPrimary}`,
    borderRadius: 8,
    width: 200,
  },
}));

const stylesObject: InputNumberProps['styles'] = {
  input: {
    fontSize: 14,
  },
};

const stylesFn: InputNumberProps['styles'] = ({ props }) => {
  if (props.size === 'large') {
    return {
      root: {
        backgroundColor: 'rgba(250,250,250, 0.5)',
        borderColor: '#722ed1',
      },
    } satisfies InputNumberProps['styles'];
  }
  return {};
};

const App: React.FC = () => {
  const { styles: classNames } = useStyle();
  const sharedProps: InputNumberProps = {
    classNames,
  };
  return (
    <Flex vertical gap="middle">
      <InputNumber {...sharedProps} styles={stylesObject} placeholder="Object" />
      <InputNumber {...sharedProps} styles={stylesFn} placeholder="Function" size="large" />
    </Flex>
  );
};

export default App;
```





## API

Common props ref：[Common props](/docs/react/common-props)

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| ~~addonAfter~~ | The label text displayed after (on the right side of) the input field, please use Space.Compact instead | ReactNode | - |  |
| ~~addonBefore~~ | The label text displayed before (on the left side of) the input field, please use Space.Compact instead | ReactNode | - |  |
| changeOnBlur | Trigger `onChange` when blur. e.g. reset value in range by blur | boolean | true | 5.11.0 |
| changeOnWheel | Allows control with mouse wheel | boolean | - | 5.14.0 |
| classNames | Customize class for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), string> | - | - |
| controls | Whether to show `+-` controls, or set custom arrow icons | boolean \| { upIcon?: React.ReactNode; downIcon?: React.ReactNode; } | - |  |
| decimalSeparator | Decimal separator | string | - | - |
| placeholder | Placeholder | string | - |  |
| defaultValue | The initial value | number | - | - |
| disabled | If the input is disabled | boolean | false | - |
| formatter | Specifies the format of the value presented | function(value: number \| string, info: { userTyping: boolean, input: string }): string | - |  |
| keyboard | If keyboard behavior is enabled | boolean | true |  |
| max | The max value | number | [Number.MAX_SAFE_INTEGER](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER) | - |
| min | The min value | number | [Number.MIN_SAFE_INTEGER](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MIN_SAFE_INTEGER) | - |
| parser | Specifies the value extracted from formatter | function(string): number | - | - |
| precision | The precision of input value. Will use `formatter` when config of `formatter` | number | - | - |
| readOnly | If the input is readonly | boolean | false | - |
| status | Set validation status | 'error' \| 'warning' | - |  |
| styles | Customize inline style for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties> | - | - |
| prefix | The prefix icon for the Input | ReactNode | - |  |
| suffix | The suffix icon for the Input | ReactNode | - | 5.20.0 |
| size | The height of input box | `large` \| `middle` \| `small` | - | - |
| step | The number to which the current value is increased or decreased. It can be an integer or decimal | number \| string | 1 | - |
| stringMode | Set value as string to support high precision decimals. Will return string value by `onChange` | boolean | false |  |
| mode | Show input or spinner | `'input' \| 'spinner'` | `'input'` |  |
| value | The current value of the component | number | - | - |
| variant | Variants of Input | `outlined` \| `borderless` \| `filled` \| `underlined` | `outlined` | 5.13.0 \| `underlined`: 5.24.0 |
| onChange | The callback triggered when the value is changed | function(value: number \| string \| null) | - | - |
| onPressEnter | The callback function that is triggered when Enter key is pressed | function(e) | - | - |
| onStep | The callback function that is triggered when click up or down buttons / Keyboard / Wheel | (value: number, info: { offset: number, type: 'up' \| 'down', emitter: 'handler' \| 'keydown' \| 'wheel' }) => void | - |  |

## Ref

| Name | Description | Type | Version |
| --- | --- | --- | --- |
| blur() | Remove focus | - |  |
| focus() | Get focus | (option?: { preventScroll?: boolean, cursor?: 'start' \| 'end' \| 'all' }) | cursor - 5.22.0 |
| nativeElement | The native DOM element | - | 5.17.3 |

## Semantic DOM

https://ant.design/components/input-number/semantic.md

## Design Token



## Component Token (InputNumber)
| Token Name | Description | Type | Default Value |
| --- | --- | --- | --- |
| activeBg | Background color when the input box is activated | string | #ffffff |
| activeBorderColor | Active border color | string | #1677ff |
| activeShadow | Box-shadow when active | string | 0 0 0 2px rgba(5,145,255,0.1) |
| addonBg | Background color of addon | string | rgba(0,0,0,0.02) |
| controlWidth | Width of input | number | 90 |
| errorActiveShadow | Box-shadow when active in error status | string | 0 0 0 2px rgba(255,38,5,0.06) |
| filledHandleBg | Background color of handle in filled variant | string | #f0f0f0 |
| handleActiveBg | Active background color of handle | string | rgba(0,0,0,0.02) |
| handleBg | Background color of handle | string | #ffffff |
| handleBorderColor | Border color of handle | string | #d9d9d9 |
| handleFontSize | Icon size of control button | number | 7 |
| handleHoverColor | Hover color of handle | string | #1677ff |
| handleVisible | Handle visible | true \| "auto" | auto |
| handleWidth | Width of control button | number | 22 |
| hoverBg | Background color when the input box hovers | string | #ffffff |
| hoverBorderColor | Hover border color | string | #4096ff |
| inputFontSize | Font size | number | 14 |
| inputFontSizeLG | Font size of large | number | 16 |
| inputFontSizeSM | Font size of small | number | 14 |
| paddingBlock | Vertical padding of input | number | 4 |
| paddingBlockLG | Vertical padding of large input | number | 7 |
| paddingBlockSM | Vertical padding of small input | number | 0 |
| paddingInline | Horizontal padding of input | number | 11 |
| paddingInlineLG | Horizontal padding of large input | number | 11 |
| paddingInlineSM | Horizontal padding of small input | number | 7 |
| warningActiveShadow | Box-shadow when active in warning status | string | 0 0 0 2px rgba(255,215,5,0.1) |

## Global Token
| Token Name | Description | Type | Default Value |
| --- | --- | --- | --- |
| borderRadius | Border radius of base components | number |  |
| borderRadiusLG | LG size border radius, used in some large border radius components, such as Card, Modal and other components. | number |  |
| borderRadiusSM | SM size border radius, used in small size components, such as Button, Input, Select and other input components in small size | number |  |
| colorBgContainer | Container background color, e.g: default button, input box, etc. Be sure not to confuse this with `colorBgElevated`. | string |  |
| colorBgContainerDisabled | Control the background color of container in disabled state. | string |  |
| colorBorder | Default border color, used to separate different elements, such as: form separator, card separator, etc. | string |  |
| colorError | Used to represent the visual elements of the operation failure, such as the error Button, error Result component, etc. | string |  |
| colorErrorBg | The background color of the error state. | string |  |
| colorErrorBgHover | The hover state background color of the error state. | string |  |
| colorErrorBorderHover | The hover state border color of the error state. | string |  |
| colorErrorText | The default state of the text in the error color. | string |  |
| colorFillSecondary | The second level of fill color can outline the shape of the element more clearly, such as Rate, Skeleton, etc. It can also be used as the Hover state of the third level of fill color, such as Table, etc. | string |  |
| colorFillTertiary | The third level of fill color is used to outline the shape of the element, such as Slider, Segmented, etc. If there is no emphasis requirement, it is recommended to use the third level of fill color as the default fill color. | string |  |
| colorIcon | Weak action. Such as `allowClear` or Alert close button | string |  |
| colorText | Default text color which comply with W3C standards, and this color is also the darkest neutral color. | string |  |
| colorTextDisabled | Control the color of text in disabled state. | string |  |
| colorTextPlaceholder | Control the color of placeholder text. | string |  |
| colorWarning | Used to represent the warning map token, such as Notification, Alert, etc. Alert or Control component(like Input) will use these map tokens. | string |  |
| colorWarningBg | The background color of the warning state. | string |  |
| colorWarningBgHover | The hover state background color of the warning state. | string |  |
| colorWarningBorderHover | The hover state border color of the warning state. | string |  |
| colorWarningText | The default state of the text in the warning color. | string |  |
| fontFamily | The font family of Ant Design prioritizes the default interface font of the system, and provides a set of alternative font libraries that are suitable for screen display to maintain the readability and readability of the font under different platforms and browsers, reflecting the friendly, stable and professional characteristics. | string |  |
| fontSize | The most widely used font size in the design system, from which the text gradient will be derived. | number |  |
| lineHeight | Line height of text. | number |  |
| lineHeightLG | Line height of large text. | number |  |
| lineType | Border style of base components | string |  |
| lineWidth | Border width of base components | number |  |
| motionDurationMid | Motion speed, medium speed. Used for medium element animation interaction. | string |  |
| paddingXXS | Control the extra extra small padding of the element. | number |  |



## Notes

Per issues [#21158](https://github.com/ant-design/ant-design/issues/21158), [#17344](https://github.com/ant-design/ant-design/issues/17344), [#9421](https://github.com/ant-design/ant-design/issues/9421), and [documentation about inputs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number#Using_number_inputs), it appears this community does not support native inclusion of the `type="number"` in the `<Input />` attributes, so please feel free to include it as needed, and be aware that it is heavily suggested that server side validation be utilized, as client side validation can be edited by power users.

## FAQ

### Why `value` can exceed `min` or `max` in control? {#faq-controlled-range}

Developer handle data by their own in control. It will make data out of sync if InputNumber changes display value. It also cause potential data issues when use in form.

### Why dynamic change `min` or `max` which makes `value` out of range will not trigger `onChange`? {#faq-dynamic-range-change}

`onChange` is user trigger event. Auto-triggering would prevent form libraries from detecting the data modification source.

### Why `onBlur` or other event can not get correct value? {#faq-onblur-value}

InputNumber's value is wrapped by internal logic. The `event.target.value` you get from `onBlur` or other event is the DOM element's `value` instead of the actual value of InputNumber. For example, if you change the display format through `formatter` or `decimalSeparator`, you will get the formatted string in the DOM. You should always get the current value through `onChange`.

### Why `changeOnWheel` unable to control whether the mouse scroll wheel changes value? {#faq-change-on-wheel}

> The use of the `type` attribute is deprecated

The InputNumber component allows you to use all the attributes of the input element and ultimately pass them to the input element, This attribute will also be added to the input element when you pass in `type='number'`, which will activate native behavior (allowing the mouse wheel to change the value), As a result `changeOnWheel` cannot control whether the mouse wheel changes the value.
