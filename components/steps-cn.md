---
category: Components
group: 导航
title: Steps
subtitle: 步骤条
description: 引导用户按照流程完成任务的导航条。
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*677sTqCpE3wAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*cFsBQLA0b7UAAAAAAAAAAAAADrJ8AQ/original
---

## 何时使用 {#when-to-use}

当任务复杂或者存在先后关系时，将其分解成一系列步骤，从而简化任务。

## 代码演示 {#examples}

### 基本用法

简单的步骤条，使用 `variant` 属性来设置不同的样式，使用 `size` 控制大小。

```tsx
import React from 'react';
import { Flex, Steps } from 'antd';

const content = 'This is a content.';
const items = [
  {
    title: 'Finished',
    content,
  },
  {
    title: 'In Progress',
    content,
    subTitle: 'Left 00:00:08',
  },
  {
    title: 'Waiting',
    content,
  },
];

const App: React.FC = () => (
  <Flex vertical gap="large">
    <Steps current={1} items={items} />
    <Steps current={1} items={items} variant="outlined" />
    <Steps current={1} items={items} size="small" />
    <Steps current={1} items={items} size="small" variant="outlined" />
  </Flex>
);

export default App;
```

### 步骤运行错误

使用 Steps 的 `status` 属性来指定当前步骤的状态。

```tsx
import React from 'react';
import { Steps } from 'antd';

const content = 'This is a content';
const items = [
  {
    title: 'Finished',
    content,
  },
  {
    title: 'In Process',
    content,
  },
  {
    title: 'Waiting',
    content,
  },
];

const App: React.FC = () => <Steps current={1} status="error" items={items} />;

export default App;
```

### 竖直方向的步骤条

简单的竖直方向的步骤条。

```tsx
import React from 'react';
import { Flex, Steps } from 'antd';

const content = 'This is a content.';

const items = [
  {
    title: 'Finished',
    content,
  },
  {
    title: 'In Progress',
    content,
  },
  {
    title: 'Waiting',
    content,
  },
];

const App: React.FC = () => (
  <Flex>
    <div style={{ flex: 1 }}>
      <Steps orientation="vertical" current={1} items={items} />
    </div>
    <div style={{ flex: 1 }}>
      <Steps orientation="vertical" current={1} items={items} size="small" />
    </div>
  </Flex>
);

export default App;
```

### 可点击

设置 `onChange` 后，Steps 变为可点击状态。

```tsx
import React, { useState } from 'react';
import { Divider, Steps } from 'antd';

const App: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const onChange = (value: number) => {
    console.log('onChange:', value);
    setCurrent(value);
  };
  const content = 'This is a content.';

  return (
    <>
      <Steps
        current={current}
        onChange={onChange}
        items={[
          {
            title: 'Step 1',
            content,
          },
          {
            title: 'Step 2',
            content,
          },
          {
            title: 'Step 3',
            content,
          },
        ]}
      />

      <Divider />

      <Steps
        current={current}
        onChange={onChange}
        orientation="vertical"
        items={[
          {
            title: 'Step 1',
            content,
          },
          {
            title: 'Step 2',
            content,
          },
          {
            title: 'Step 3',
            content,
          },
        ]}
      />
    </>
  );
};

export default App;
```

### 面板式步骤

面板类型的步骤条。

```tsx
import React, { useState } from 'react';
import { Flex, Steps } from 'antd';
import type { StepsProps } from 'antd';

const App: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const onChange = (value: number) => {
    console.log('onChange:', value);
    setCurrent(value);
  };

  const sharedProps: StepsProps = {
    type: 'panel',
    current,
    onChange,
    items: [
      {
        title: 'Step 1',
        subTitle: '00:00',
        content: 'This is a content.',
      },
      {
        title: 'Step 2',
        content: 'This is a content.',
        status: 'error',
      },
      {
        title: 'Step 3',
        content: 'This is a content.',
      },
    ],
  };

  return (
    <Flex vertical gap="middle">
      <Steps {...sharedProps} />
      <Steps {...sharedProps} size="small" variant="outlined" />
    </Flex>
  );
};

export default App;
```

### 带图标的步骤条

通过设置 `items` 的 `icon` 属性，可以启用自定义图标。

```tsx
import React from 'react';
import { LoadingOutlined, SmileOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons';
import { Steps } from 'antd';

const App: React.FC = () => (
  <Steps
    items={[
      {
        title: 'Login',
        status: 'finish',
        icon: <UserOutlined />,
      },
      {
        title: 'Verification',
        status: 'finish',
        icon: <SolutionOutlined />,
      },
      {
        title: 'Pay',
        status: 'process',
        icon: <LoadingOutlined />,
      },
      {
        title: 'Done',
        status: 'wait',
        icon: <SmileOutlined />,
      },
    ]}
  />
);

export default App;
```


### 标签放置位置与进度

使用 `titlePlacement` 设置标签位置，通过 `percent` 显示进度。

```tsx
import React from 'react';
import { Steps } from 'antd';

const content = 'This is a content.';
const items = [
  {
    title: 'Finished',
    content,
  },
  {
    title: 'In Progress',
    content,
  },
  {
    title: 'Waiting',
    content,
  },
];
const App: React.FC = () => (
  <>
    <Steps current={1} titlePlacement="vertical" items={items} ellipsis />
    <br />
    <Steps current={1} percent={60} titlePlacement="vertical" items={items} />
    <br />
    <Steps current={1} percent={80} size="small" titlePlacement="vertical" items={items} />
  </>
);

export default App;
```

### 点状步骤条

包含步骤点的进度条。

```tsx
import React from 'react';
import { Divider, Flex, Steps } from 'antd';
import type { StepsProps } from 'antd';

const items = [
  {
    title: 'Finished',
    content: 'This is a content.',
  },
  {
    title: 'In Progress',
    content: 'This is a content.',
  },
  {
    title: 'Waiting',
    content: 'This is a content.',
  },
];

const sharedProps: StepsProps = {
  type: 'dot',
  current: 1,
  items,
};

const sharedVerticalProps = {
  ...sharedProps,
  orientation: 'vertical',
  style: {
    flex: 'auto',
  },
} as const;

const App: React.FC = () => (
  <Flex vertical gap="middle">
    <Steps {...sharedProps} />
    <Steps {...sharedProps} variant="outlined" />
    <Divider />
    <Flex gap="middle">
      <Steps {...sharedVerticalProps} />
      <Steps {...sharedVerticalProps} variant="outlined" />
    </Flex>
  </Flex>
);

export default App;
```


### 导航步骤

导航类型的步骤条。

```tsx
import React, { useState } from 'react';
import { Flex, Steps } from 'antd';

const App: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const onChange = (value: number) => {
    console.log('onChange:', value);
    setCurrent(value);
  };

  return (
    <Flex vertical gap="large">
      <Steps
        type="navigation"
        size="small"
        current={current}
        onChange={onChange}
        items={[
          {
            title: 'Step 1',
            subTitle: '00:00:05',
            status: 'finish',
            content: 'This is a content.',
          },
          {
            title: 'Step 2',
            subTitle: '00:01:02',
            status: 'process',
            content: 'This is a content.',
          },
          {
            title: 'Step 3',
            subTitle: 'waiting for longlong time',
            status: 'wait',
            content: 'This is a content.',
          },
        ]}
      />

      <Steps
        type="navigation"
        current={current}
        onChange={onChange}
        items={[
          {
            status: 'finish',
            title: 'Step 1',
          },
          {
            status: 'process',
            title: 'Step 2',
          },
          {
            status: 'wait',
            title: 'Step 3',
          },
          {
            status: 'wait',
            title: 'Step 4',
          },
        ]}
      />

      <Steps
        type="navigation"
        size="small"
        current={current}
        onChange={onChange}
        items={[
          {
            status: 'finish',
            title: 'finish 1',
          },
          {
            status: 'finish',
            title: 'finish 2',
          },
          {
            status: 'process',
            title: 'current process',
          },
          {
            status: 'wait',
            title: 'wait',
            disabled: true,
          },
        ]}
      />
    </Flex>
  );
};

export default App;
```




### 内联步骤

内联类型的步骤条，适用于列表内容场景中展示对象所在流程、当前状态的情况。

```tsx
import React from 'react';
import type { StepsProps } from 'antd';
import { Avatar, List, Steps } from 'antd';

const data = [
  {
    title: 'Ant Design Title 1',
    current: 0,
  },
  {
    title: 'Ant Design Title 2',
    current: 1,
    status: 'error',
  },
  {
    title: 'Ant Design Title 3',
    current: 2,
  },
  {
    title: 'Ant Design Title 4',
    current: 1,
  },
];

const items = [
  {
    title: 'Step 1',
    content: 'This is Step 1',
  },
  {
    title: 'Step 2',
    content: 'This is Step 2',
  },
  {
    title: 'Step 3',
    content: 'This is Step 3',
  },
];

const App: React.FC = () => (
  <List
    itemLayout="horizontal"
    dataSource={data}
    renderItem={(item, index) => (
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
          title={<a href="https://ant.design">{item.title}</a>}
          description="Ant Design, a design language for background applications, is refined by Ant UED Team"
        />
        <Steps
          style={{ marginTop: 8 }}
          type="inline"
          current={item.current}
          status={item.status as StepsProps['status']}
          items={items}
        />
      </List.Item>
    )}
  />
);

export default App;
```

### 内联样式组合

内联步骤条修改样式，通过 `offset` 进行对齐。

```tsx
import React from 'react';
import type { StepsProps } from 'antd';
import { Flex, Steps, theme } from 'antd';

const items: StepsProps['items'] = Array.from({ length: 5 }, (_, index) => ({
  title: `Step ${index + 1}`,
  subTitle: 'Sub Title',
  content: `This is Step ${index + 1}`,
}));

const App: React.FC = () => {
  const { token } = theme.useToken();

  return (
    <Flex vertical>
      <Steps type="inline" current={1} items={items} />
      <Steps
        type="inline"
        current={4}
        items={items}
        status="finish"
        styles={{
          itemTitle: {
            color: token.colorPrimaryText,
          },
          itemSubtitle: {
            color: token.colorPrimaryTextActive,
          },
          itemRail: {
            background: token.colorTextDisabled,
          },
        }}
      />
      <Steps type="inline" current={1} items={items.slice(2)} offset={2} />
    </Flex>
  );
};

export default App;
```



### 自定义语义结构的样式和类

通过 `classNames` 和 `styles` 传入对象/函数可以自定义 Steps 的[语义化结构](#semantic-dom)样式。

```tsx
import React from 'react';
import { Flex, Steps } from 'antd';
import type { StepsProps } from 'antd';
import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => ({
  root: {
    border: `2px dashed ${token.colorBorder}`,
    borderRadius: token.borderRadius,
    padding: token.padding,
  },
}));

const stylesObject: StepsProps['styles'] = {
  itemIcon: { borderRadius: '30%' },
  itemContent: { fontStyle: 'italic' },
};

const stylesFn: StepsProps['styles'] = (info) => {
  if (info.props.type === 'navigation') {
    return {
      root: {
        borderColor: '#1890ff',
      },
    } satisfies StepsProps['styles'];
  }
  return {};
};

const App: React.FC = () => {
  const { styles } = useStyles();

  const sharedProps: StepsProps = {
    items: [
      { title: 'Finished', content: 'This is a content.' },
      { title: 'In Progress', content: 'This is a content.' },
      { title: 'Waiting', content: 'This is a content.' },
    ],
    current: 1,
    classNames: { root: styles.root },
  };

  return (
    <Flex vertical gap="middle">
      <Steps {...sharedProps} styles={stylesObject} />
      <Steps {...sharedProps} styles={stylesFn} type="navigation" />
    </Flex>
  );
};

export default App;
```


## API

通用属性参考：[通用属性](/docs/react/common-props)

### Steps

整体步骤条。

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| classNames | 用于自定义组件内部各语义化结构的 class，支持对象或函数 | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), string> | - |  |
| current | 指定当前步骤，从 0 开始记数。在子 Step 元素中，可以通过 `status` 属性覆盖状态 | number | 0 |  |
| ~~direction~~ | 指定步骤条方向。目前支持水平（`horizontal`）和竖直（`vertical`）两种方向 | string | `horizontal` |  |
| iconRender | 自定义渲染图标，请优先使用 `items.icon` | (oriNode, info: { index, active, item }) => ReactNode | - |  |
| initial | 起始序号，从 0 开始记数 | number | 0 |  |
| ~~labelPlacement~~ | 指定标签放置位置，默认水平放图标右侧，可选 `vertical` 放图标下方 | string | `horizontal` |  |
| orientation | 指定步骤条方向。目前支持水平（`horizontal`）和竖直（`vertical`）两种方向 | string | `horizontal` |  |
| percent | 当前 `process` 步骤显示的进度条进度（只对基本类型的 Steps 生效） | number | - | 4.5.0 |
| progressDot | 点状步骤条，可以设置为一个 function，`titlePlacement` 将强制为 `vertical` | boolean \| (iconDot, { index, status, title, content }) => ReactNode | false |  |
| responsive | 当屏幕宽度小于 `532px` 时自动变为垂直模式 | boolean | true |  |
| size | 指定大小，目前支持普通（`default`）和迷你（`small`） | string | `default` |  |
| status | 指定当前步骤的状态，可选 `wait` `process` `finish` `error` | string | `process` |  |
| styles | 用于自定义组件内部各语义化结构的行内 style，支持对象或函数 | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties> | - |  |
| titlePlacement | 指定标签放置位置，默认水平放图标右侧，可选 `vertical` 放图标下方 | string | `horizontal` |  |
| type | 步骤条类型，可选 `default` `dot` `inline` `navigation` `panel` | string | `default` |  |
| variant | 设置样式变体 | `filled` \| `outlined` | `filled` |  |
| onChange | 点击切换步骤时触发 | (current) => void | - |  |
| items | 配置选项卡内容 | [StepItem](#stepitem) | [] | 4.24.0 |

### StepItem

步骤条内的每一个步骤。

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| content | 步骤的详情描述，可选 | ReactNode | - |  |
| ~~description~~ | 步骤的详情描述，可选 | ReactNode | - |  |
| disabled | 禁用点击 | boolean | false |  |
| icon | 步骤图标的类型，可选 | ReactNode | - |  |
| status | 指定状态。当不配置该属性时，会使用 Steps 的 `current` 来自动指定状态。可选：`wait` `process` `finish` `error` | string | `wait` |  |
| subTitle | 子标题 | ReactNode | - |  |
| title | 标题 | ReactNode | - |  |

## Semantic DOM

### Steps

https://ant.design/components/steps-cn/semantic.md

### StepItem

https://ant.design/components/steps-cn/semantic_items.md

## 主题变量（Design Token）{#design-token}



## 组件 Token (Steps)
| Token 名称 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| customIconFontSize | 自定义图标大小 | number | 24 |
| customIconSize | 自定义图标容器尺寸 | number | 32 |
| customIconTop | 自定义图标 top | number | 0 |
| dotCurrentSize | 点状步骤点当前大小 | number | 10 |
| dotSize | 点状步骤点大小 | number | 8 |
| iconFontSize | 图标大小 | number | 14 |
| iconSize | 图标容器尺寸 | number | 32 |
| iconSizeSM | 小号步骤条图标大小 | number | 24 |
| iconTop | 图标 top | number | -0.5 |
| navArrowColor | 可跳转步骤条箭头颜色 | string | rgba(0,0,0,0.25) |
| navContentMaxWidth | 可跳转步骤条内容最大宽度 | MaxWidth<string \| number> \| undefined | unset |

## 全局 Token
| Token 名称 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| borderRadius | 基础组件的圆角大小，例如按钮、输入框、卡片等 | number |  |
| borderRadiusSM | SM号圆角，用于组件小尺寸下的圆角，如 Button、Input、Select 等输入类控件在 small size 下的圆角 | number |  |
| colorBgContainer | 组件的容器背景色，例如：默认按钮、输入框等。务必不要将其与 `colorBgElevated` 混淆。 | string |  |
| colorError | 用于表示操作失败的 Token 序列，如失败按钮、错误状态提示（Result）组件等。 | string |  |
| colorErrorBg | 错误色的浅色背景颜色 | string |  |
| colorErrorBgFilledHover | 错误色的浅色填充背景色悬浮态，目前只用在危险填充按钮的 hover 效果。 | string |  |
| colorErrorHover | 错误色的深色悬浮态 | string |  |
| colorFillTertiary | 三级填充色用于勾勒出元素形体的场景，如 Slider、Segmented 等。如无强调需求的情况下，建议使用三级填色作为默认填色。 | string |  |
| colorPrimary | 品牌色是体现产品特性和传播理念最直观的视觉元素之一。在你完成品牌主色的选取之后，我们会自动帮你生成一套完整的色板，并赋予它们有效的设计语义 | string |  |
| colorPrimaryBg | 主色浅色背景颜色，一般用于视觉层级较弱的选中状态。 | string |  |
| colorPrimaryBgHover | 与主色浅色背景颜色相对应的悬浮态颜色。 | string |  |
| colorPrimaryHover | 主色梯度下的悬浮态。 | string |  |
| colorSplit | 用于作为分割线的颜色，此颜色和 colorBorderSecondary 的颜色一致，但是用的是透明色。 | string |  |
| colorText | 最深的文本色。为了符合W3C标准，默认的文本颜色使用了该色，同时这个颜色也是最深的中性色。 | string |  |
| colorTextDescription | 控制文本描述字体颜色。 | string |  |
| colorTextDisabled | 控制禁用状态下的字体颜色。 | string |  |
| colorTextLabel | 控制文本标签字体颜色。 | string |  |
| colorTextLightSolid | 控制带背景色的文本，例如 Primary Button 组件中的文本高亮颜色。 | string |  |
| colorTextQuaternary | 第四级文本色是最浅的文本色，例如表单的输入提示文本、禁用色文本等。 | string |  |
| colorTextSecondary | 作为第二梯度的文本色，一般用在不那么需要强化文本颜色的场景，例如 Label 文本、Menu 的文本选中态等场景。 | string |  |
| controlHeight | Ant Design 中按钮和输入框等基础控件的高度 | number |  |
| controlItemBgHover | 控制组件项在鼠标悬浮时的背景颜色。 | string |  |
| fontFamily | Ant Design 的字体家族中优先使用系统默认的界面字体，同时提供了一套利于屏显的备用字体库，来维护在不同平台以及浏览器的显示下，字体始终保持良好的易读性和可读性，体现了友好、稳定和专业的特性。 | string |  |
| fontSize | 设计系统中使用最广泛的字体大小，文本梯度也将基于该字号进行派生。 | number |  |
| fontSizeIcon | 控制选择器、级联选择器等中的操作图标字体大小。正常情况下与 fontSizeSM 相同。 | number |  |
| fontSizeLG | 大号字体大小 | number |  |
| fontSizeSM | 小号字体大小 | number |  |
| lineHeight | 文本行高 | number |  |
| lineHeightLG | 大型文本行高 | number |  |
| lineHeightSM | 小型文本行高 | number |  |
| lineType | 用于控制组件边框、分割线等的样式，默认是实线 | string |  |
| lineWidth | 用于控制组件边框、分割线等的宽度 | number |  |
| lineWidthBold | 描边类组件的默认线宽，如 Button、Input、Select 等输入类控件。 | number |  |
| margin | 控制元素外边距，中等尺寸。 | number |  |
| marginSM | 控制元素外边距，中小尺寸。 | number |  |
| marginXS | 控制元素外边距，小尺寸。 | number |  |
| marginXXS | 控制元素外边距，最小尺寸。 | number |  |
| motionDurationMid | 动效播放速度，中速。用于中型元素动画交互 | string |  |
| motionDurationSlow | 动效播放速度，慢速。用于大型元素如面板动画交互 | string |  |
| paddingSM | 控制元素的小内间距。 | number |  |
| paddingXS | 控制元素的特小内间距。 | number |  |
| paddingXXS | 控制元素的极小内间距。 | number |  |


