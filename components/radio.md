---
category: Components
group: Data Entry
title: Radio
description: Used to select a single state from multiple options.
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*mrPVRope68wAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*xPfTSphsiA0AAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
---

## When To Use

- Used to select a single state from multiple options.
- The difference from Select is that Radio is visible to the user and can facilitate the comparison of choice, which means there shouldn't be too many of them.

```tsx
// When use Radio.Group, recommended ✅
return (
  <Radio.Group
    value={value}
    options={[
      { value: 1, label: 'A' },
      { value: 2, label: 'B' },
      { value: 3, label: 'C' },
    ]}
  />
);

// No recommended 🙅🏻‍♀️
return (
  <Radio.Group value={value}>
    <Radio value={1}>A</Radio>
    <Radio value={2}>B</Radio>
    <Radio value={3}>C</Radio>
  </Radio.Group>
);
```

## Examples

<!-- prettier-ignore-start -->
### Basic

The simplest use.

```tsx
import React from 'react';
import { Radio } from 'antd';

const App: React.FC = () => <Radio>Radio</Radio>;

export default App;
```

### disabled

Radio unavailable.

```tsx
import React, { useState } from 'react';
import { Button, Radio } from 'antd';

const App: React.FC = () => {
  const [disabled, setDisabled] = useState(true);

  const toggleDisabled = () => {
    setDisabled(!disabled);
  };

  return (
    <>
      <Radio defaultChecked={false} disabled={disabled}>
        Disabled
      </Radio>
      <Radio defaultChecked disabled={disabled}>
        Disabled
      </Radio>
      <br />
      <Button type="primary" onClick={toggleDisabled} style={{ marginTop: 16 }}>
        Toggle disabled
      </Button>
    </>
  );
};

export default App;
```

### Radio Group

A group of radio components.

```tsx
import React, { useState } from 'react';
import {
  BarChartOutlined,
  DotChartOutlined,
  LineChartOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import type { RadioChangeEvent } from 'antd';
import { Flex, Radio } from 'antd';

const App: React.FC = () => {
  const [value, setValue] = useState(1);

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };

  return (
    <Radio.Group
      onChange={onChange}
      value={value}
      options={[
        {
          value: 1,
          className: 'option-1',
          label: (
            <Flex gap="small" justify="center" align="center" vertical>
              <LineChartOutlined style={{ fontSize: 18 }} />
              LineChart
            </Flex>
          ),
        },
        {
          value: 2,
          className: 'option-2',
          label: (
            <Flex gap="small" justify="center" align="center" vertical>
              <DotChartOutlined style={{ fontSize: 18 }} />
              DotChart
            </Flex>
          ),
        },
        {
          value: 3,
          className: 'option-3',
          label: (
            <Flex gap="small" justify="center" align="center" vertical>
              <BarChartOutlined style={{ fontSize: 18 }} />
              BarChart
            </Flex>
          ),
        },
        {
          value: 4,
          className: 'option-4',
          label: (
            <Flex gap="small" justify="center" align="center" vertical>
              <PieChartOutlined style={{ fontSize: 18 }} />
              PieChart
            </Flex>
          ),
        },
      ]}
    />
  );
};

export default App;
```

### Vertical Radio.Group

Vertical Radio.Group, with more radios.

```tsx
import React, { useState } from 'react';
import type { RadioChangeEvent } from 'antd';
import { Input, Radio } from 'antd';

const labelStyle: React.CSSProperties = {
  height: 32,
  lineHeight: '32px',
};

const App: React.FC = () => {
  const [value, setValue] = useState(1);

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };

  return (
    <Radio.Group
      vertical
      onChange={onChange}
      value={value}
      options={[
        { value: 1, style: labelStyle, label: 'Option A' },
        { value: 2, style: labelStyle, label: 'Option B' },
        { value: 3, style: labelStyle, label: 'Option C' },
        {
          value: 4,
          style: labelStyle,
          label: (
            <>
              More...
              {value === 4 && (
                <Input
                  variant="filled"
                  placeholder="please input"
                  style={{ width: 120, marginInlineStart: 12 }}
                />
              )}
            </>
          ),
        },
      ]}
    />
  );
};

export default App;
```

### Block Radio.Group

The `block` property will make a Radio.Group fit to its parent width.

```tsx
import React from 'react';
import { Flex, Radio } from 'antd';
import type { CheckboxGroupProps } from 'antd/es/checkbox';

const options: CheckboxGroupProps<string>['options'] = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange' },
];

const App: React.FC = () => (
  <Flex vertical gap="middle">
    <Radio.Group block options={options} defaultValue="Apple" />
    <Radio.Group
      block
      options={options}
      defaultValue="Apple"
      optionType="button"
      buttonStyle="solid"
    />
    <Radio.Group block options={options} defaultValue="Pear" optionType="button" />
  </Flex>
);

export default App;
```

### Radio.Group group - optional

Render radios by configuring `options`. Radio type can also be set through the `optionType` parameter.

```tsx
import React, { useState } from 'react';
import type { RadioChangeEvent } from 'antd';
import { Radio } from 'antd';
import type { CheckboxGroupProps } from 'antd/es/checkbox';

const plainOptions: CheckboxGroupProps<string>['options'] = ['Apple', 'Pear', 'Orange'];

const options: CheckboxGroupProps<string>['options'] = [
  { label: 'Apple', value: 'Apple', className: 'label-1' },
  { label: 'Pear', value: 'Pear', className: 'label-2' },
  { label: 'Orange', value: 'Orange', title: 'Orange', className: 'label-3' },
];

const optionsWithDisabled: CheckboxGroupProps<string>['options'] = [
  { label: 'Apple', value: 'Apple', className: 'label-1' },
  { label: 'Pear', value: 'Pear', className: 'label-2' },
  { label: 'Orange', value: 'Orange', className: 'label-3', disabled: true },
];

const App: React.FC = () => {
  const [value1, setValue1] = useState('Apple');
  const [value2, setValue2] = useState('Apple');
  const [value3, setValue3] = useState('Apple');
  const [value4, setValue4] = useState('Apple');

  const onChange1 = ({ target: { value } }: RadioChangeEvent) => {
    console.log('radio1 checked', value);
    setValue1(value);
  };

  const onChange2 = ({ target: { value } }: RadioChangeEvent) => {
    console.log('radio2 checked', value);
    setValue2(value);
  };

  const onChange3 = ({ target: { value } }: RadioChangeEvent) => {
    console.log('radio3 checked', value);
    setValue3(value);
  };

  const onChange4 = ({ target: { value } }: RadioChangeEvent) => {
    console.log('radio4 checked', value);
    setValue4(value);
  };

  return (
    <>
      <Radio.Group options={plainOptions} onChange={onChange1} value={value1} />
      <br />
      <Radio.Group options={optionsWithDisabled} onChange={onChange2} value={value2} />
      <br />
      <br />
      <Radio.Group options={options} onChange={onChange3} value={value3} optionType="button" />
      <br />
      <br />
      <Radio.Group
        options={optionsWithDisabled}
        onChange={onChange4}
        value={value4}
        optionType="button"
        buttonStyle="solid"
      />
    </>
  );
};

export default App;
```

### radio style

The combination of radio button style.

```tsx
import React from 'react';
import type { RadioChangeEvent } from 'antd';
import { Flex, Radio } from 'antd';

const onChange = (e: RadioChangeEvent) => {
  console.log(`radio checked:${e.target.value}`);
};

const App: React.FC = () => (
  <Flex vertical gap="middle">
    <Radio.Group onChange={onChange} defaultValue="a">
      <Radio.Button value="a">Hangzhou</Radio.Button>
      <Radio.Button value="b">Shanghai</Radio.Button>
      <Radio.Button value="c">Beijing</Radio.Button>
      <Radio.Button value="d">Chengdu</Radio.Button>
    </Radio.Group>
    <Radio.Group onChange={onChange} defaultValue="a">
      <Radio.Button value="a">Hangzhou</Radio.Button>
      <Radio.Button value="b" disabled>
        Shanghai
      </Radio.Button>
      <Radio.Button value="c">Beijing</Radio.Button>
      <Radio.Button value="d">Chengdu</Radio.Button>
    </Radio.Group>
    <Radio.Group disabled onChange={onChange} defaultValue="a">
      <Radio.Button value="a">Hangzhou</Radio.Button>
      <Radio.Button value="b">Shanghai</Radio.Button>
      <Radio.Button value="c">Beijing</Radio.Button>
      <Radio.Button value="d">Chengdu</Radio.Button>
    </Radio.Group>
  </Flex>
);

export default App;
```

### Radio.Group with name

Passing the `name` property to all `input[type="radio"]` that are in the same Radio.Group. It is usually used to let the browser see your Radio.Group as a real "group" and keep the default behavior. For example, using left/right keyboard arrow to change your selection that in the same Radio.Group.

```tsx
import React from 'react';
import { Radio } from 'antd';

const App: React.FC = () => (
  <Radio.Group
    name="radiogroup"
    defaultValue={1}
    options={[
      { value: 1, label: 'A' },
      { value: 2, label: 'B' },
      { value: 3, label: 'C' },
      { value: 4, label: 'D' },
    ]}
  />
);

export default App;
```

### Size

There are three sizes available: large, medium, and small. It can coordinate with input box.

```tsx
import React from 'react';
import { Flex, Radio } from 'antd';

const App: React.FC = () => (
  <Flex vertical gap="middle">
    <Radio.Group defaultValue="a" size="large">
      <Radio.Button value="a">Hangzhou</Radio.Button>
      <Radio.Button value="b">Shanghai</Radio.Button>
      <Radio.Button value="c">Beijing</Radio.Button>
      <Radio.Button value="d">Chengdu</Radio.Button>
    </Radio.Group>
    <Radio.Group defaultValue="a">
      <Radio.Button value="a">Hangzhou</Radio.Button>
      <Radio.Button value="b">Shanghai</Radio.Button>
      <Radio.Button value="c">Beijing</Radio.Button>
      <Radio.Button value="d">Chengdu</Radio.Button>
    </Radio.Group>
    <Radio.Group defaultValue="a" size="small">
      <Radio.Button value="a">Hangzhou</Radio.Button>
      <Radio.Button value="b">Shanghai</Radio.Button>
      <Radio.Button value="c">Beijing</Radio.Button>
      <Radio.Button value="d">Chengdu</Radio.Button>
    </Radio.Group>
  </Flex>
);

export default App;
```

### Solid radio button

Solid radio button style.

```tsx
import React from 'react';
import { Flex, Radio } from 'antd';

const App: React.FC = () => (
  <Flex vertical gap="middle">
    <Radio.Group defaultValue="a" buttonStyle="solid">
      <Radio.Button value="a">Hangzhou</Radio.Button>
      <Radio.Button value="b">Shanghai</Radio.Button>
      <Radio.Button value="c">Beijing</Radio.Button>
      <Radio.Button value="d">Chengdu</Radio.Button>
    </Radio.Group>
    <Radio.Group defaultValue="c" buttonStyle="solid">
      <Radio.Button value="a">Hangzhou</Radio.Button>
      <Radio.Button value="b" disabled>
        Shanghai
      </Radio.Button>
      <Radio.Button value="c">Beijing</Radio.Button>
      <Radio.Button value="d">Chengdu</Radio.Button>
    </Radio.Group>
  </Flex>
);

export default App;
```

### Custom semantic dom styling

You can customize the [semantic dom](#semantic-dom) style of radio by passing objects/functions through `classNames` and `styles`.

```tsx
import React from 'react';
import { Flex, Radio } from 'antd';
import type { RadioProps } from 'antd';
import { createStyles } from 'antd-style';
import clsx from 'clsx';

const useStyles = createStyles(({ token, css }) => ({
  root: css`
    border-radius: ${token.borderRadius}px;
    background-color: ${token.colorBgContainer};
  `,
  icon: css`
    border-color: ${token.colorWarning};
  `,
  label: css`
    color: ${token.colorTextDisabled};
    font-weight: bold;
  `,

  iconChecked: css`
    background-color: ${token.colorWarning};
  `,
  labelChecked: css`
    color: ${token.colorWarning};
  `,
}));

// Object style
const styles: RadioProps['styles'] = {
  icon: {
    borderRadius: 6,
  },
  label: {
    color: 'blue',
  },
};

const App: React.FC = () => {
  const [value, setValue] = React.useState<'styles' | 'classNames'>('styles');
  const { styles: classNamesStyles } = useStyles();

  // Function classNames - dynamically adjust based on checked state
  const classNamesFn: RadioProps['classNames'] = (info) => {
    if (info.props.checked) {
      return {
        root: clsx(classNamesStyles.root),
        icon: clsx(classNamesStyles.icon, classNamesStyles.iconChecked),
        label: clsx(classNamesStyles.label, classNamesStyles.labelChecked),
      };
    }
    return {
      root: classNamesStyles.root,
      icon: classNamesStyles.icon,
      label: classNamesStyles.label,
    };
  };

  return (
    <Flex vertical gap="middle">
      <Radio
        name="style-class"
        styles={styles}
        checked={value === 'styles'}
        onChange={() => setValue('styles')}
      >
        Object styles
      </Radio>
      <Radio
        name="style-class"
        classNames={classNamesFn}
        checked={value === 'classNames'}
        onChange={() => setValue('classNames')}
      >
        Function classNames
      </Radio>
    </Flex>
  );
};

export default App;
```





<!-- prettier-ignore-end -->

## API

Common props ref：[Common props](/docs/react/common-props)

### Radio/Radio.Button

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| checked | Specifies whether the radio is selected | boolean | false |  |
| classNames | Customize class for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), string> | - | 6.0.0 |
| defaultChecked | Specifies the initial state: whether or not the radio is selected | boolean | false |  |
| disabled | Disable radio | boolean | false |  |
| styles | Customize inline style for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties> | - | 6.0.0 |
| value | According to value for comparison, to determine whether the selected | any | - |  |

### Radio.Group

Radio group can wrap a group of `Radio`.

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| block | Option to fit RadioGroup width to its parent width | boolean | false | 5.21.0 |
| buttonStyle | The style type of radio button | `outline` \| `solid` | `outline` |  |
| classNames | Customize class for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), string> | - | 6.0.0 |
| defaultValue | Default selected value | any | - |  |
| disabled | Disable all radio buttons | boolean | false |  |
| name | The `name` property of all `input[type="radio"]` children. If not set, it will fallback to a randomly generated name | string | - |  |
| options | Set children optional | string\[] \| number\[] \| Array&lt;[CheckboxOptionType](#checkboxoptiontype)> | - |  |
| optionType | Set Radio optionType | `default` \| `button` | `default` | 4.4.0 |
| orientation | Orientation | `horizontal` \| `vertical` | `horizontal` |  |
| size | The size of radio button style | `large` \| `middle` \| `small` | - |  |
| styles | Customize inline style for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties> | - | 6.0.0 |
| value | Used for setting the currently selected value | any | - |  |
| vertical | If true, the Radio group will be vertical. Simultaneously existing with `orientation`, `orientation` takes priority | boolean | false |  |
| onChange | The callback function that is triggered when the state changes | function(e:Event) | - |  |

### CheckboxOptionType

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| label | The text used to display as the Radio option | `string` | - | 4.4.0 |
| value | The value associated with the Radio option | `string` \| `number` \| `boolean` | - | 4.4.0 |
| style | The style to apply to the Radio option | `React.CSSProperties` | - | 4.4.0 |
| className | className of the Radio option | `string` | - | 5.25.0 |
| disabled | Specifies whether the Radio option is disabled | `boolean` | `false` | 4.4.0 |
| title | Adds the Title attribute value | `string` | - | 4.4.0 |
| id | Adds the Radio Id attribute value | `string` | - | 4.4.0 |
| onChange | Triggered when the value of the Radio Group changes | `(e: CheckboxChangeEvent) => void;` | - | 4.4.0 |
| required | Specifies whether the Radio option is required | `boolean` | `false` | 4.4.0 |

## Methods

### Radio

| Name    | Description  |
| ------- | ------------ |
| blur()  | Remove focus |
| focus() | Get focus    |

## Semantic DOM

https://ant.design/components/radio/semantic.md

## Design Token



## Component Token (Radio)
| Token Name | Description | Type | Default Value |
| --- | --- | --- | --- |
| buttonBg | Background color of Radio button | string | #ffffff |
| buttonCheckedBg | Background color of checked Radio button | string | #ffffff |
| buttonCheckedBgDisabled | Background color of checked and disabled Radio button | string | rgba(0,0,0,0.15) |
| buttonCheckedColorDisabled | Color of checked and disabled Radio button text | string | rgba(0,0,0,0.25) |
| buttonColor | Color of Radio button text | string | rgba(0,0,0,0.88) |
| buttonPaddingInline | Horizontal padding of Radio button | number | 15 |
| buttonSolidCheckedActiveBg | Background color of checked solid Radio button text when active | string | #0958d9 |
| buttonSolidCheckedBg | Background color of checked solid Radio button text | string | #1677ff |
| buttonSolidCheckedColor | Color of checked solid Radio button text | string | #fff |
| buttonSolidCheckedHoverBg | Background color of checked solid Radio button text when hover | string | #4096ff |
| dotColorDisabled | Color of disabled Radio dot | string | rgba(0,0,0,0.25) |
| dotSize | Size of Radio dot | number | 8 |
| radioSize | Radio size | number | 16 |
| wrapperMarginInlineEnd | Margin right of Radio button | number | 8 |

## Global Token
| Token Name | Description | Type | Default Value |
| --- | --- | --- | --- |
| borderRadius | Border radius of base components | number |  |
| borderRadiusLG | LG size border radius, used in some large border radius components, such as Card, Modal and other components. | number |  |
| borderRadiusSM | SM size border radius, used in small size components, such as Button, Input, Select and other input components in small size | number |  |
| colorBgContainer | Container background color, e.g: default button, input box, etc. Be sure not to confuse this with `colorBgElevated`. | string |  |
| colorBgContainerDisabled | Control the background color of container in disabled state. | string |  |
| colorBorder | Default border color, used to separate different elements, such as: form separator, card separator, etc. | string |  |
| colorPrimary | Brand color is one of the most direct visual elements to reflect the characteristics and communication of the product. After you have selected the brand color, we will automatically generate a complete color palette and assign it effective design semantics. | string |  |
| colorPrimaryActive | Dark active state under the main color gradient. | string |  |
| colorPrimaryBorder | The stroke color under the main color gradient, used on the stroke of components such as Slider. | string |  |
| colorPrimaryHover | Hover state under the main color gradient. | string |  |
| colorText | Default text color which comply with W3C standards, and this color is also the darkest neutral color. | string |  |
| colorTextDisabled | Control the color of text in disabled state. | string |  |
| controlHeight | The height of the basic controls such as buttons and input boxes in Ant Design | number |  |
| controlHeightLG | LG component height | number |  |
| controlHeightSM | SM component height | number |  |
| controlOutline | Control the outline color of input component. | string |  |
| controlOutlineWidth | Control the outline width of input component. | number |  |
| fontFamily | The font family of Ant Design prioritizes the default interface font of the system, and provides a set of alternative font libraries that are suitable for screen display to maintain the readability and readability of the font under different platforms and browsers, reflecting the friendly, stable and professional characteristics. | string |  |
| fontSize | The most widely used font size in the design system, from which the text gradient will be derived. | number |  |
| fontSizeLG | Large font size | number |  |
| lineHeight | Line height of text. | number |  |
| lineType | Border style of base components | string |  |
| lineWidth | Border width of base components | number |  |
| lineWidthFocus | Control the width of the line when the component is in focus state. | number |  |
| marginXS | Control the margin of an element, with a small size. | number |  |
| motionDurationMid | Motion speed, medium speed. Used for medium element animation interaction. | string |  |
| motionDurationSlow | Motion speed, slow speed. Used for large element animation interaction. | string |  |
| motionEaseInOutCirc | Preset motion curve. | string |  |
| paddingXS | Control the extra small padding of the element. | number |  |


