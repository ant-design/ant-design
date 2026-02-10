---
category: Components
group: 数据录入
title: Switch
subtitle: 开关
description: 使用开关切换两种状态之间。
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*rtArRpBNDZcAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*al07RK8SGf4AAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
---

## 何时使用 {#when-to-use}

- 需要表示开关状态/两种状态之间的切换时；
- 和 `checkbox` 的区别是，切换 `switch` 会直接触发状态改变，而 `checkbox` 一般用于状态标记，需要和提交操作配合。

## 代码演示 {#examples}

### 基本

最简单的用法。

```tsx
import React from 'react';
import { Switch } from 'antd';

const onChange = (checked: boolean) => {
  console.log(`switch to ${checked}`);
};

const App: React.FC = () => <Switch defaultChecked onChange={onChange} />;

export default App;
```

### 不可用

Switch 失效状态。

```tsx
import React, { useState } from 'react';
import { Button, Space, Switch } from 'antd';

const App: React.FC = () => {
  const [disabled, setDisabled] = useState(true);

  const toggle = () => {
    setDisabled(!disabled);
  };

  return (
    <Space vertical>
      <Switch disabled={disabled} defaultChecked />
      <Button type="primary" onClick={toggle}>
        Toggle disabled
      </Button>
    </Space>
  );
};

export default App;
```

### 文字和图标

带有文字和图标。

```tsx
import React from 'react';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Space, Switch } from 'antd';

const App: React.FC = () => (
  <Space vertical>
    <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked />
    <Switch checkedChildren="1" unCheckedChildren="0" />
    <Switch
      checkedChildren={<CheckOutlined />}
      unCheckedChildren={<CloseOutlined />}
      defaultChecked
    />
  </Space>
);

export default App;
```

### 两种大小

`size="small"` 表示小号开关。

```tsx
import React from 'react';
import { Switch } from 'antd';

const App: React.FC = () => (
  <>
    <Switch defaultChecked />
    <br />
    <Switch size="small" defaultChecked />
  </>
);

export default App;
```

### 加载中

标识开关操作仍在执行中。

```tsx
import React from 'react';
import { Switch } from 'antd';

const App: React.FC = () => (
  <>
    <Switch loading defaultChecked />
    <br />
    <Switch size="small" loading />
  </>
);

export default App;
```


### 自定义语义结构的样式和类

通过 `classNames` 和 `styles` 传入对象/函数可以自定义 Switch 的[语义化结构](#semantic-dom)样式。

```tsx
import React from 'react';
import { Flex, Switch } from 'antd';
import type { SwitchProps } from 'antd';
import { createStyles } from 'antd-style';

const useStyle = createStyles(({ token }) => ({
  root: {
    width: 40,
    backgroundColor: token.colorPrimary,
  },
}));

const stylesObject: SwitchProps['styles'] = {
  root: {
    backgroundColor: '#F5D2D2',
  },
};

const stylesFn: SwitchProps['styles'] = (info) => {
  if (info.props.size === 'default') {
    return {
      root: {
        backgroundColor: '#BDE3C3',
      },
    } satisfies SwitchProps['styles'];
  }
  return {};
};

const App: React.FC = () => {
  const { styles: classNames } = useStyle();
  return (
    <Flex vertical gap="middle">
      <Switch
        size="small"
        checkedChildren="on"
        unCheckedChildren="off"
        classNames={classNames}
        styles={stylesObject}
      />
      <Switch classNames={classNames} size="default" styles={stylesFn} />
    </Flex>
  );
};

export default App;
```


## API

通用属性参考：[通用属性](/docs/react/common-props)

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| checked | 指定当前是否选中 | boolean | false |  |
| checkedChildren | 选中时的内容 | ReactNode | - |  |
| className | Switch 器类名 | string | - |  |
| classNames | 用于自定义组件内部各语义化结构的 class，支持对象或函数 | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), string> | - |
| defaultChecked | 初始是否选中 | boolean | false |  |
| defaultValue | `defaultChecked` 的别名 | boolean | - | 5.12.0 |
| disabled | 是否禁用 | boolean | false |  |
| loading | 加载中的开关 | boolean | false |  |
| size | 开关大小，可选值：`default` `small` | string | `default` |  |
| styles | 用于自定义组件内部各语义化结构的行内 style，支持对象或函数 | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties> | - |
| unCheckedChildren | 非选中时的内容 | ReactNode | - |  |
| value | `checked` 的别名 | boolean | - | 5.12.0 |
| onChange | 变化时的回调函数 | function(checked: boolean, event: Event) | - |  |
| onClick | 点击时的回调函数 | function(checked: boolean, event: Event) | - |  |

## 方法

| 名称    | 描述     |
| ------- | -------- |
| blur()  | 移除焦点 |
| focus() | 获取焦点 |

## Semantic DOM

https://ant.design/components/switch-cn/semantic.md

## 主题变量（Design Token）{#design-token}



## 组件 Token (Switch)
| Token 名称 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| handleBg | 开关把手背景色 | string | #fff |
| handleShadow | 开关把手阴影 | string | 0 2px 4px 0 rgba(0,35,11,0.2) |
| handleSize | 开关把手大小 | number | 18 |
| handleSizeSM | 小号开关把手大小 | number | 12 |
| innerMaxMargin | 内容区域最大边距 | number | 24 |
| innerMaxMarginSM | 小号开关内容区域最大边距 | number | 18 |
| innerMinMargin | 内容区域最小边距 | number | 9 |
| innerMinMarginSM | 小号开关内容区域最小边距 | number | 6 |
| trackHeight | 开关高度 | string \| number | 22 |
| trackHeightSM | 小号开关高度 | string \| number | 16 |
| trackMinWidth | 开关最小宽度 | string \| number | 44 |
| trackMinWidthSM | 小号开关最小宽度 | string \| number | 28 |
| trackPadding | 开关内边距 | number | 2 |

## 全局 Token
| Token 名称 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| colorPrimary | 品牌色是体现产品特性和传播理念最直观的视觉元素之一。在你完成品牌主色的选取之后，我们会自动帮你生成一套完整的色板，并赋予它们有效的设计语义 | string |  |
| colorPrimaryBorder | 主色梯度下的描边用色，用在 Slider 等组件的描边上。 | string |  |
| colorPrimaryHover | 主色梯度下的悬浮态。 | string |  |
| colorText | 最深的文本色。为了符合W3C标准，默认的文本颜色使用了该色，同时这个颜色也是最深的中性色。 | string |  |
| colorTextLightSolid | 控制带背景色的文本，例如 Primary Button 组件中的文本高亮颜色。 | string |  |
| colorTextQuaternary | 第四级文本色是最浅的文本色，例如表单的输入提示文本、禁用色文本等。 | string |  |
| colorTextTertiary | 第三级文本色一般用于描述性文本，例如表单的中的补充说明文本、列表的描述性文本等场景。 | string |  |
| fontFamily | Ant Design 的字体家族中优先使用系统默认的界面字体，同时提供了一套利于屏显的备用字体库，来维护在不同平台以及浏览器的显示下，字体始终保持良好的易读性和可读性，体现了友好、稳定和专业的特性。 | string |  |
| fontSize | 设计系统中使用最广泛的字体大小，文本梯度也将基于该字号进行派生。 | number |  |
| fontSizeIcon | 控制选择器、级联选择器等中的操作图标字体大小。正常情况下与 fontSizeSM 相同。 | number |  |
| fontSizeSM | 小号字体大小 | number |  |
| lineHeight | 文本行高 | number |  |
| lineWidthFocus | 控制线条的宽度，当组件处于聚焦态时。 | number |  |
| marginXXS | 控制元素外边距，最小尺寸。 | number |  |
| motionDurationMid | 动效播放速度，中速。用于中型元素动画交互 | string |  |
| opacityLoading | 控制加载状态的透明度。 | number |  |



## FAQ

### 为什么在 Form.Item 下不能绑定数据？ {#faq-binding-data}

Form.Item 默认绑定值属性到 `value` 上，而 Switch 的值属性为 `checked`。你可以通过 `valuePropName` 来修改绑定的值属性。

```tsx | pure
<Form.Item name="fieldA" valuePropName="checked">
  <Switch />
</Form.Item>
```
