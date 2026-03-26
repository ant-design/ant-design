---
category: Components
group: 数据录入
title: Radio
subtitle: 单选框
description: 用于在多个备选项中选中单个状态。
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*mrPVRope68wAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*xPfTSphsiA0AAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
---

## 何时使用 {#when-to-use}

- 用于在多个备选项中选中单个状态。
- 和 Select 的区别是，Radio 所有选项默认可见，方便用户在比较中选择，因此选项不宜过多。

```tsx
// 使用 Radio.Group 组件时，推荐的写法 ✅
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

// 不推荐的写法 🙅🏻‍♀️
return (
  <Radio.Group value={value}>
    <Radio value={1}>A</Radio>
    <Radio value={2}>B</Radio>
    <Radio value={3}>C</Radio>
  </Radio.Group>
);
```

## 代码演示 {#examples}

<!-- prettier-ignore-start -->
### 基本

最简单的用法。

```tsx
import React from 'react';
import { Radio } from 'antd';

const App: React.FC = () => <Radio>Radio</Radio>;

export default App;
```

### 不可用

Radio 不可用。

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

### 单选组合

一组互斥的 Radio 配合使用。

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

### Radio.Group 垂直

垂直的 Radio.Group，配合更多输入框选项。

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

### Block 单选组合

`block` 属性将使 Radio.Group 撑满父容器。

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
  <Flex vertical gap="medium">
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

### Radio.Group 组合 - 配置方式

通过配置 `options` 参数来渲染单选框。也可通过 `optionType` 参数来设置 Radio 类型。

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

### 按钮样式

按钮样式的单选组合。

```tsx
import React from 'react';
import type { RadioChangeEvent } from 'antd';
import { Flex, Radio } from 'antd';

const onChange = (e: RadioChangeEvent) => {
  console.log(`radio checked:${e.target.value}`);
};

const App: React.FC = () => (
  <Flex vertical gap="medium">
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

### 单选组合 - 配合 name 使用

可以为 Radio.Group 配置 `name` 参数，为组合内的 input 元素赋予相同的 `name` 属性，使浏览器把 Radio.Group 下的 Radio 真正看作是一组（例如可以通过方向键始终**在同一组内**更改选项）。

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

### 大小

大中小三种组合，可以和表单输入框进行对应配合。

```tsx
import React from 'react';
import { Flex, Radio } from 'antd';

const App: React.FC = () => (
  <Flex vertical gap="medium">
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

### 填底的按钮样式

实色填底的单选按钮样式。

```tsx
import React from 'react';
import { Flex, Radio } from 'antd';

const App: React.FC = () => (
  <Flex vertical gap="medium">
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

### 自定义语义结构的样式和类

通过 `classNames` 和 `styles` 传入对象/函数可以自定义单选框的[语义化结构](#semantic-dom)样式。

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
    <Flex vertical gap="medium">
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

通用属性参考：[通用属性](/docs/react/common-props)

### Radio/Radio.Button

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| checked | 指定当前是否选中 | boolean | false |  |
| classNames | 用于自定义组件内部各语义化结构的 class，支持对象或函数 | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), string> | - | 6.0.0 |
| defaultChecked | 初始是否选中 | boolean | false |  |
| disabled | 禁用 Radio | boolean | false |  |
| styles | 用于自定义组件内部各语义化结构的行内 style，支持对象或函数 | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties> | - | 6.0.0 |
| value | 根据 value 进行比较，判断是否选中 | any | - |  |

### Radio.Group

单选框组合，用于包裹一组 `Radio`。

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| block | 将 RadioGroup 宽度调整为其父宽度的选项 | boolean | false | 5.21.0 |
| buttonStyle | RadioButton 的风格样式，目前有描边和填色两种风格 | `outline` \| `solid` | `outline` |  |
| classNames | 用于自定义组件内部各语义化结构的 class，支持对象或函数 | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), string> | - | 6.0.0 |
| defaultValue | 默认选中的值 | any | - |  |
| disabled | 禁选所有子单选器 | boolean | false |  |
| name | RadioGroup 下所有 `input[type="radio"]` 的 `name` 属性。若未设置，则将回退到随机生成的名称 | string | - |  |
| options | 以配置形式设置子元素 | string\[] \| number\[] \| Array&lt;[CheckboxOptionType](#checkboxoptiontype)> | - |  |
| optionType | 用于设置 Radio `options` 类型 | `default` \| `button` | `default` | 4.4.0 |
| orientation | 排列方向 | `horizontal` \| `vertical` | `horizontal` |  |
| size | 大小，只对按钮样式生效 | `large` \| `medium` \| `small` | - |  |
| styles | 用于自定义组件内部各语义化结构的行内 style，支持对象或函数 | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties> | - | 6.0.0 |
| value | 用于设置当前选中的值 | any | - |  |
| vertical | 值为 true，Radio Group 为垂直方向。与 `orientation` 同时存在，以 `orientation` 优先 | boolean | false |  |
| onChange | 选项变化时的回调函数 | function(e:Event) | - |  |

### CheckboxOptionType

| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| label | 用于作为 Radio 选项展示的文本 | `string` | - | 4.4.0 |
| value | 关联 Radio 选项的值 | `string` \| `number` \| `boolean` | - | 4.4.0 |
| style | 应用到 Radio 选项的 style | `React.CSSProperties` | - | 4.4.0 |
| className | Radio 选项的类名 | `string` | - | 5.25.0 |
| disabled | 指定 Radio 选项是否要禁用 | `boolean` | `false` | 4.4.0 |
| title | 添加 Title 属性值 | `string` | - | 4.4.0 |
| id | 添加 Radio Id 属性值 | `string` | - | 4.4.0 |
| onChange | 当 Radio Group 的值发送改变时触发 | `(e: CheckboxChangeEvent) => void;` | - | 4.4.0 |
| required | 指定 Radio 选项是否必填 | `boolean` | `false` | 4.4.0 |

## 方法

### Radio

| 名称    | 描述     |
| ------- | -------- |
| blur()  | 移除焦点 |
| focus() | 获取焦点 |

## Semantic DOM

https://ant.design/components/radio-cn/semantic.md

## 主题变量（Design Token）{#design-token}



## 组件 Token (Radio)
| Token 名称 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| buttonBg | 单选框按钮背景色 | string | #ffffff |
| buttonCheckedBg | 单选框按钮选中背景色 | string | #ffffff |
| buttonCheckedBgDisabled | 单选框按钮选中并禁用时的背景色 | string | rgba(0,0,0,0.15) |
| buttonCheckedColorDisabled | 单选框按钮选中并禁用时的文本颜色 | string | rgba(0,0,0,0.25) |
| buttonColor | 单选框按钮文本颜色 | string | rgba(0,0,0,0.88) |
| buttonPaddingInline | 单选框按钮横向内间距 | number | 15 |
| buttonSolidCheckedActiveBg | 单选框实色按钮选中时的激活态背景色 | string | #0958d9 |
| buttonSolidCheckedBg | 单选框实色按钮选中时的背景色 | string | #1677ff |
| buttonSolidCheckedColor | 单选框实色按钮选中时的文本颜色 | string | #fff |
| buttonSolidCheckedHoverBg | 单选框实色按钮选中时的悬浮态背景色 | string | #4096ff |
| dotColorDisabled | 单选框圆点禁用颜色 | string | rgba(0,0,0,0.25) |
| dotSize | 单选框圆点大小 | number | 8 |
| radioSize | 单选框大小 | number | 16 |
| wrapperMarginInlineEnd | 单选框右间距 | number | 8 |

## 全局 Token
| Token 名称 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| borderRadius | 基础组件的圆角大小，例如按钮、输入框、卡片等 | number |  |
| borderRadiusLG | LG号圆角，用于组件中的一些大圆角，如 Card、Modal 等一些组件样式。 | number |  |
| borderRadiusSM | SM号圆角，用于组件小尺寸下的圆角，如 Button、Input、Select 等输入类控件在 small size 下的圆角 | number |  |
| colorBgContainer | 组件的容器背景色，例如：默认按钮、输入框等。务必不要将其与 `colorBgElevated` 混淆。 | string |  |
| colorBgContainerDisabled | 控制容器在禁用状态下的背景色。 | string |  |
| colorBorder | 默认使用的边框颜色, 用于分割不同的元素，例如：表单的分割线、卡片的分割线等。 | string |  |
| colorPrimary | 品牌色是体现产品特性和传播理念最直观的视觉元素之一。在你完成品牌主色的选取之后，我们会自动帮你生成一套完整的色板，并赋予它们有效的设计语义 | string |  |
| colorPrimaryActive | 主色梯度下的深色激活态。 | string |  |
| colorPrimaryBorder | 主色梯度下的描边用色，用在 Slider 等组件的描边上。 | string |  |
| colorPrimaryHover | 主色梯度下的悬浮态。 | string |  |
| colorText | 最深的文本色。为了符合W3C标准，默认的文本颜色使用了该色，同时这个颜色也是最深的中性色。 | string |  |
| colorTextDisabled | 控制禁用状态下的字体颜色。 | string |  |
| controlHeight | Ant Design 中按钮和输入框等基础控件的高度 | number |  |
| controlHeightLG | 较高的组件高度 | number |  |
| controlHeightSM | 较小的组件高度 | number |  |
| controlOutline | 控制输入组件的外轮廓线颜色。 | string |  |
| controlOutlineWidth | 控制输入组件的外轮廓线宽度。 | number |  |
| fontFamily | Ant Design 的字体家族中优先使用系统默认的界面字体，同时提供了一套利于屏显的备用字体库，来维护在不同平台以及浏览器的显示下，字体始终保持良好的易读性和可读性，体现了友好、稳定和专业的特性。 | string |  |
| fontSize | 设计系统中使用最广泛的字体大小，文本梯度也将基于该字号进行派生。 | number |  |
| fontSizeLG | 大号字体大小 | number |  |
| lineHeight | 文本行高 | number |  |
| lineType | 用于控制组件边框、分割线等的样式，默认是实线 | string |  |
| lineWidth | 用于控制组件边框、分割线等的宽度 | number |  |
| lineWidthFocus | 控制线条的宽度，当组件处于聚焦态时。 | number |  |
| marginXS | 控制元素外边距，小尺寸。 | number |  |
| motionDurationMid | 动效播放速度，中速。用于中型元素动画交互 | string |  |
| motionDurationSlow | 动效播放速度，慢速。用于大型元素如面板动画交互 | string |  |
| motionEaseInOutCirc | 预设动效曲率 | string |  |
| paddingXS | 控制元素的特小内间距。 | number |  |


