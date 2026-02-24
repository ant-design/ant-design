---
category: Components
group: Data Entry
title: Slider
description: A Slider component for displaying current value and intervals in range.
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*_4heQaUrFn4AAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*XkgXTaudeosAAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
---

## When To Use

Used to input a value within a specified range.

## Examples

### Basic

Basic slider. When `range` is `true`, display as dual thumb mode. When `disable` is `true`, the slider will not be interactable.

```tsx
import React, { useState } from 'react';
import { Slider, Switch } from 'antd';

const App: React.FC = () => {
  const [disabled, setDisabled] = useState(false);

  const onChange = (checked: boolean) => {
    setDisabled(checked);
  };

  return (
    <>
      <Slider defaultValue={30} disabled={disabled} />
      <Slider range defaultValue={[20, 50]} disabled={disabled} />
      Disabled: <Switch size="small" checked={disabled} onChange={onChange} />
    </>
  );
};

export default App;
```

### Slider with InputNumber

Synchronize with [InputNumber](/components/input-number/) component.

```tsx
import React, { useState } from 'react';
import type { InputNumberProps } from 'antd';
import { Col, InputNumber, Row, Slider, Space } from 'antd';

const IntegerStep: React.FC = () => {
  const [inputValue, setInputValue] = useState(1);

  const onChange: InputNumberProps['onChange'] = (newValue) => {
    setInputValue(newValue as number);
  };

  return (
    <Row>
      <Col span={12}>
        <Slider
          min={1}
          max={20}
          onChange={onChange}
          value={typeof inputValue === 'number' ? inputValue : 0}
        />
      </Col>
      <Col span={4}>
        <InputNumber
          min={1}
          max={20}
          style={{ margin: '0 16px' }}
          value={inputValue}
          onChange={onChange}
        />
      </Col>
    </Row>
  );
};

const DecimalStep: React.FC = () => {
  const [inputValue, setInputValue] = useState(0);

  const onChange: InputNumberProps['onChange'] = (value) => {
    if (Number.isNaN(value)) {
      return;
    }
    setInputValue(value as number);
  };

  return (
    <Row>
      <Col span={12}>
        <Slider
          min={0}
          max={1}
          onChange={onChange}
          value={typeof inputValue === 'number' ? inputValue : 0}
          step={0.01}
        />
      </Col>
      <Col span={4}>
        <InputNumber
          min={0}
          max={1}
          style={{ margin: '0 16px' }}
          step={0.01}
          value={inputValue}
          onChange={onChange}
        />
      </Col>
    </Row>
  );
};

const App: React.FC = () => (
  <Space style={{ width: '100%' }} vertical>
    <IntegerStep />
    <DecimalStep />
  </Space>
);

export default App;
```

### Slider with icon

You can add an icon beside the slider to make it meaningful.

```css
.icon-wrapper {
  position: relative;
  padding: 0 30px;
}

.icon-wrapper .anticon {
  position: absolute;
  top: -2px;
  width: 16px;
  height: 16px;
  color: rgba(0, 0, 0, 0.25);
  font-size: 16px;
  line-height: 1;
}

.icon-wrapper .icon-wrapper-active {
  color: rgba(0, 0, 0, 0.45);
}

.icon-wrapper .anticon:first-child {
  inset-inline-start: 0;
}

.icon-wrapper .anticon:last-child {
  inset-inline-end: 0;
}
```

```tsx
import React, { useState } from 'react';
import { FrownOutlined, SmileOutlined } from '@ant-design/icons';
import { Slider } from 'antd';

interface IconSliderProps {
  max: number;
  min: number;
}

const IconSlider: React.FC<IconSliderProps> = (props) => {
  const { max, min } = props;
  const [value, setValue] = useState(0);

  const mid = Number(((max - min) / 2).toFixed(5));
  const preColorCls = value >= mid ? '' : 'icon-wrapper-active';
  const nextColorCls = value >= mid ? 'icon-wrapper-active' : '';

  return (
    <div className="icon-wrapper">
      <FrownOutlined className={preColorCls} />
      <Slider {...props} onChange={setValue} value={value} />
      <SmileOutlined className={nextColorCls} />
    </div>
  );
};

const App: React.FC = () => <IconSlider min={0} max={20} />;

export default App;
```

### Customize tooltip

Use `tooltip.formatter` to format content of `Tooltip`. If `tooltip.formatter` is null, hide it.

```tsx
import React from 'react';
import type { SliderSingleProps } from 'antd';
import { Slider } from 'antd';

const formatter: NonNullable<SliderSingleProps['tooltip']>['formatter'] = (value) => `${value}%`;

const App: React.FC = () => (
  <>
    <Slider tooltip={{ formatter }} />
    <Slider tooltip={{ formatter: null }} />
  </>
);

export default App;
```

### Event

The `onChange` callback function will fire when the user changes the slider's value. The `onChangeComplete` callback function will fire when `mouseup` or `keyup` fired.

```tsx
import React from 'react';
import { Slider } from 'antd';

const onChange = (value: number | number[]) => {
  console.log('onChange: ', value);
};

const onChangeComplete = (value: number | number[]) => {
  console.log('onChangeComplete: ', value);
};

const App: React.FC = () => (
  <>
    <Slider defaultValue={30} onChange={onChange} onChangeComplete={onChangeComplete} />
    <Slider
      range
      step={10}
      defaultValue={[20, 50]}
      onChange={onChange}
      onChangeComplete={onChangeComplete}
    />
  </>
);

export default App;
```

### Graduated slider

Using `marks` property to mark a graduated slider, use `value` or `defaultValue` to specify the position of thumb. When `included` is false, means that different thumbs are coordinative. when `step` is null, users can only slide the thumbs onto marks.

<style>
#slider-demo-mark h4 {
  margin: 0 0 16px;
}
#slider-demo-mark .ant-slider-with-marks {
  margin-bottom: 44px;
}
</style>

```tsx
import React from 'react';
import { Slider } from 'antd';
import type { SliderSingleProps } from 'antd';

const marks: SliderSingleProps['marks'] = {
  0: '0°C',
  26: '26°C',
  37: '37°C',
  100: {
    style: {
      color: '#f50',
    },
    label: <strong>100°C</strong>,
  },
};

const App: React.FC = () => (
  <>
    <h4>included=true</h4>
    <Slider marks={marks} defaultValue={37} />
    <Slider range marks={marks} defaultValue={[26, 37]} />

    <h4>included=false</h4>
    <Slider marks={marks} included={false} defaultValue={37} />

    <h4>marks & step</h4>
    <Slider marks={marks} step={10} defaultValue={37} />

    <h4>step=null</h4>
    <Slider marks={marks} step={null} defaultValue={37} />
  </>
);

export default App;
```

### Vertical

The vertical Slider.

```tsx
import React from 'react';
import { Slider } from 'antd';
import type { SliderSingleProps } from 'antd';

const style: React.CSSProperties = {
  display: 'inline-block',
  height: 300,
  marginInlineStart: 70,
};

const marks: SliderSingleProps['marks'] = {
  0: '0°C',
  26: '26°C',
  37: '37°C',
  100: {
    style: { color: '#f50' },
    label: <strong>100°C</strong>,
  },
};

const App: React.FC = () => (
  <>
    <div style={style}>
      <Slider vertical defaultValue={30} />
    </div>
    <div style={style}>
      <Slider vertical range step={10} defaultValue={[20, 50]} />
    </div>
    <div style={style}>
      <Slider vertical range marks={marks} defaultValue={[26, 37]} />
    </div>
  </>
);

export default App;
```

### Control visibility of Tooltip

When `tooltip.open` is `true`, ToolTip will always show, if set to `false` the ToolTip will not show, even if dragging or hovering.

```tsx
import React from 'react';
import { Slider } from 'antd';

const App: React.FC = () => <Slider defaultValue={30} tooltip={{ open: true }} />;

export default App;
```

### Reverse

Using `reverse` to render slider reversely.

```tsx
import React, { useState } from 'react';
import { Slider, Switch } from 'antd';

const App: React.FC = () => {
  const [reverse, setReverse] = useState(true);

  return (
    <>
      <Slider defaultValue={30} reverse={reverse} />
      <Slider range defaultValue={[20, 50]} reverse={reverse} />
      Reversed: <Switch size="small" checked={reverse} onChange={setReverse} />
    </>
  );
};

export default App;
```

### Draggable track

Make range track draggable by setting `range.draggableTrack`.

```tsx
import React from 'react';
import { Slider } from 'antd';

const App: React.FC = () => <Slider range={{ draggableTrack: true }} defaultValue={[20, 50]} />;

export default App;
```

### Multiple handles

Multiple handles combination.

```tsx
import React from 'react';
import { Slider } from 'antd';

function getGradientColor(percentage: number) {
  const startColor = [135, 208, 104];
  const endColor = [255, 204, 199];

  const midColor = startColor.map((start, i) => {
    const end = endColor[i];
    const delta = end - start;
    return (start + delta * percentage).toFixed(0);
  });

  return `rgb(${midColor.join(',')})`;
}

const App: React.FC = () => {
  const [value, setValue] = React.useState([0, 10, 20]);

  const start = value[0] / 100;
  const end = value[value.length - 1] / 100;

  return (
    <Slider
      range
      defaultValue={value}
      onChange={setValue}
      styles={{
        track: {
          background: 'transparent',
        },
        tracks: {
          background: `linear-gradient(to right, ${getGradientColor(start)} 0%, ${getGradientColor(
            end,
          )} 100%)`,
        },
      }}
    />
  );
};

export default App;
```

### Dynamic edit nodes

Click to add a node, drag out or press the key to delete the node.

```tsx
import React from 'react';
import { Slider } from 'antd';

const App: React.FC = () => {
  const [value, setValue] = React.useState([20, 80]);

  return (
    <Slider
      range={{ editable: true, minCount: 1, maxCount: 5 }}
      value={value}
      onChange={setValue}
    />
  );
};

export default App;
```

### Custom semantic dom styling

You can customize the [semantic dom](#semantic-dom) style of Sliders by passing objects/functions through `classNames` and `styles`.

```tsx
import React from 'react';
import { Flex, Slider } from 'antd';
import type { SliderSingleProps } from 'antd';
import { createStaticStyles } from 'antd-style';

const classNames = createStaticStyles(({ css }) => ({
  root: css`
    width: 300px;
  `,
}));

const classNamesFn = createStaticStyles(({ css, cssVar }) => ({
  root: css`
    width: 100px;
    &:hover .ant-slider-handle:after {
      box-shadow: 0 0 0 ${cssVar.lineWidthBold} #722ed1;
    }
  `,
  handle: css`
    &.ant-slider-handle:hover::after,
    &.ant-slider-handle:active::after,
    &.ant-slider-handle:focus::after,
    &.ant-slider-handle::after {
      box-shadow: 0 0 0 ${cssVar.lineWidthBold} #722ed1;
    }
  `,
}));

const stylesObject: SliderSingleProps['styles'] = {
  track: { backgroundImage: 'linear-gradient(180deg, #91caff, #1677ff)' },
  handle: { borderColor: '#1677ff', boxShadow: '0 2px 8px #1677ff' },
};

const stylesFn: SliderSingleProps['styles'] = (info) => {
  if (info.props.orientation === 'vertical') {
    return {
      root: { height: 300 },
      track: { backgroundImage: 'linear-gradient(180deg, #722cc0, #722ed1)' },
      handle: { borderColor: '#722ed1', boxShadow: '0 2px 8px #722ed1' },
    } satisfies SliderSingleProps['styles'];
  }
  return {};
};

const App: React.FC = () => {
  const sharedProps: SliderSingleProps = {
    defaultValue: 30,
  };
  return (
    <Flex vertical gap="middle">
      <Slider {...sharedProps} classNames={classNames} styles={stylesObject} />
      <Slider
        {...sharedProps}
        classNames={classNamesFn}
        orientation="vertical"
        reverse
        styles={stylesFn}
      />
    </Flex>
  );
};

export default App;
```



## API

Common props ref：[Common props](/docs/react/common-props)

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| classNames | Customize class for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), string> | - |  |
| defaultValue | The default value of the slider. When `range` is false, use number, otherwise, use \[number, number] | number \| \[number, number] | 0 \| \[0, 0] |  |
| disabled | If true, the slider will not be interactive | boolean | false |  |
| keyboard | Support using keyboard to move handlers | boolean | true | 5.2.0+ |
| dots | Whether the thumb can only be dragged to tick marks | boolean | false |  |
| included | Takes effect when `marks` is not null. True means containment and false means coordinative | boolean | true |  |
| marks | Tick marks of Slider. The type of key must be `number`, and must be in closed interval \[min, max]. Each mark can declare its own style | object | { number: ReactNode } \| { number: { style: CSSProperties, label: ReactNode } } |  |
| max | The maximum value the slider can slide to | number | 100 |  |
| min | The minimum value the slider can slide to | number | 0 |  |
| orientation | Orientation | `horizontal` \| `vertical` | `horizontal` |  |
| range | Enable dual thumb mode for range selection | boolean | false |  |
| reverse | Reverse the component | boolean | false |  |
| step | The granularity the slider can step through values. Must be greater than 0, and be divisible by (max - min). When `step` is `null` and `marks` exist, valid points will only be marks, `min` and `max` | number \| null | 1 |  |
| styles | Customize inline style for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties> | - |  |
| tooltip | The tooltip related props | [tooltip](#tooltip) | - | 4.23.0 |
| value | The value of slider. When `range` is false, use number, otherwise, use \[number, number] | number \| \[number, number] | - |  |
| vertical | If true, the slider will be vertical. Simultaneously existing with `orientation`, `orientation` takes priority | boolean | false |  |
| onChangeComplete | Fire when `mouseup` or `keyup` is fired | (value) => void | - |  |
| onChange | Callback function that is fired when the user changes the slider's value | (value) => void | - |  |

### range

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| draggableTrack | Whether range track can be dragged | boolean | false | - |
| editable | Dynamic edit nodes. Cannot be used with `draggableTrack` | boolean | false | 5.20.0 |
| minCount | The minimum count of nodes | number | 0 | 5.20.0 |
| maxCount | The maximum count of nodes | number | - | 5.20.0 |

### tooltip

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| autoAdjustOverflow | Whether to automatically adjust the popup position | boolean | true | 5.8.0 |
| open | If true, Tooltip will always be visible; if false, it will never be visible, even when dragging or hovering | boolean | - | 4.23.0 |
| placement | Set Tooltip display position. Ref [Tooltip](/components/tooltip/) | string | - | 4.23.0 |
| getPopupContainer | The DOM container of the Tooltip. The default behavior is to create a div element in the body | (triggerNode) => HTMLElement | () => document.body | 4.23.0 |
| formatter | Slider will pass its value to `formatter`, display its value in Tooltip, and hide the Tooltip when the returned value is null | value => ReactNode \| null | IDENTITY | 4.23.0 |

## Methods

| Name    | Description  | Version |
| ------- | ------------ | ------- |
| blur()  | Remove focus |         |
| focus() | Get focus    |         |

## Semantic DOM

https://ant.design/components/slider/semantic.md

## Design Token



## Component Token (Slider)
| Token Name | Description | Type | Default Value |
| --- | --- | --- | --- |
| controlSize | Height of slider | number | 10 |
| dotActiveBorderColor | Border color of dot when active | string | #91caff |
| dotBorderColor | Border color of dot | string | #f0f0f0 |
| dotSize | Size of dot | number | 8 |
| handleActiveColor | Border color of handle when active | string | #1677ff |
| handleActiveOutlineColor | Outline color of handle when active | string | rgba(22,119,255,0.2) |
| handleColor | Color of handle | string | #91caff |
| handleColorDisabled | Color of handle when disabled | string | #bfbfbf |
| handleLineWidth | Border width of handle | string \| number | 2 |
| handleLineWidthHover | Border width of handle when hover | string \| number | 2.5 |
| handleSize | Size of handle | number | 10 |
| handleSizeHover | Size of handle when hover | number | 12 |
| railBg | Background color of rail | string | rgba(0,0,0,0.04) |
| railHoverBg | Background color of rail when hover | string | rgba(0,0,0,0.06) |
| railSize | Height of rail | number | 4 |
| trackBg | Background color of track | string | #91caff |
| trackBgDisabled | Background color of track when disabled | string | rgba(0,0,0,0.04) |
| trackHoverBg | Background color of track when hover | string | #69b1ff |

## Global Token
| Token Name | Description | Type | Default Value |
| --- | --- | --- | --- |
| borderRadiusXS | XS size border radius, used in some small border radius components, such as Segmented, Arrow and other components with small border radius. | number |  |
| colorBgElevated | Container background color of the popup layer, in dark mode the color value of this token will be a little brighter than `colorBgContainer`. E.g: modal, pop-up, menu, etc. | string |  |
| colorFillContentHover | Control the style of background color of content area when mouse hovers over it. | string |  |
| colorPrimaryBorderHover | The hover state of the stroke color under the main color gradient, which will be used when the stroke Hover of components such as Slider and Button. | string |  |
| colorText | Default text color which comply with W3C standards, and this color is also the darkest neutral color. | string |  |
| colorTextDescription | Control the font color of text description. | string |  |
| controlHeight | The height of the basic controls such as buttons and input boxes in Ant Design | number |  |
| controlHeightLG | LG component height | number |  |
| fontFamily | The font family of Ant Design prioritizes the default interface font of the system, and provides a set of alternative font libraries that are suitable for screen display to maintain the readability and readability of the font under different platforms and browsers, reflecting the friendly, stable and professional characteristics. | string |  |
| fontSize | The most widely used font size in the design system, from which the text gradient will be derived. | number |  |
| lineHeight | Line height of text. | number |  |
| motionDurationMid | Motion speed, medium speed. Used for medium element animation interaction. | string |  |
| motionDurationSlow | Motion speed, slow speed. Used for large element animation interaction. | string |  |


