---
category: Components
group: 数据展示
title: Tooltip
subtitle: 文字提示
description: 简单的文字提示气泡框。
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*9LKlRbWytugAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*bCbPTJ7LQngAAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
---

## 何时使用 {#when-to-use}

鼠标移入则显示提示，移出消失，气泡浮层不承载复杂文本和操作。

可用来代替系统默认的 `title` 提示，提供一个 `按钮/文字/操作` 的文案解释。

## 代码演示 {#examples}

### 基本

最简单的用法。

```tsx
import React from 'react';
import { Tooltip } from 'antd';

const App: React.FC = () => (
  <Tooltip title="prompt text">
    <span>Tooltip will show on mouse enter.</span>
  </Tooltip>
);

export default App;
```

### 平滑过渡

通过 [ConfigProvider 全局配置](#config-provider-tooltip-unique) 实现同一时间只显示一个 Tooltip 的平滑过渡效果。

```tsx
import React from 'react';
import { Button, ConfigProvider, Flex, Tooltip } from 'antd';

const SharedButton = ({ placement = 'top' }: { placement?: 'top' | 'bottom' }) => (
  <Tooltip title="Hello, Ant Design!" placement={placement}>
    <Button type="primary">Button</Button>
  </Tooltip>
);

const App: React.FC = () => {
  return (
    <ConfigProvider
      tooltip={{
        unique: true,
      }}
    >
      <Flex vertical gap="small">
        <Flex gap="small" justify="center">
          <SharedButton />
          <SharedButton />
        </Flex>
        <Flex gap="small" justify="center">
          <SharedButton placement="bottom" />
          <SharedButton placement="bottom" />
        </Flex>
      </Flex>
    </ConfigProvider>
  );
};

export default App;
```

### 位置

位置有 12 个方向。

```tsx
import React from 'react';
import { Button, ConfigProvider, Flex, Tooltip } from 'antd';

const text = <span>prompt text</span>;

const buttonWidth = 80;

const App: React.FC = () => (
  <ConfigProvider button={{ style: { width: buttonWidth, margin: 4 } }}>
    <Flex vertical justify="center" align="center" className="demo">
      <Flex justify="center" align="center" style={{ whiteSpace: 'nowrap' }}>
        <Tooltip placement="topLeft" title={text}>
          <Button>TL</Button>
        </Tooltip>
        <Tooltip placement="top" title={text}>
          <Button>Top</Button>
        </Tooltip>
        <Tooltip placement="topRight" title={text}>
          <Button>TR</Button>
        </Tooltip>
      </Flex>
      <Flex style={{ width: buttonWidth * 5 + 32 }} justify="space-between" align="center">
        <Flex align="center" vertical>
          <Tooltip placement="leftTop" title={text}>
            <Button>LT</Button>
          </Tooltip>
          <Tooltip placement="left" title={text}>
            <Button>Left</Button>
          </Tooltip>
          <Tooltip placement="leftBottom" title={text}>
            <Button>LB</Button>
          </Tooltip>
        </Flex>
        <Flex align="center" vertical>
          <Tooltip placement="rightTop" title={text}>
            <Button>RT</Button>
          </Tooltip>
          <Tooltip placement="right" title={text}>
            <Button>Right</Button>
          </Tooltip>
          <Tooltip placement="rightBottom" title={text}>
            <Button>RB</Button>
          </Tooltip>
        </Flex>
      </Flex>
      <Flex justify="center" align="center" style={{ whiteSpace: 'nowrap' }}>
        <Tooltip placement="bottomLeft" title={text}>
          <Button>BL</Button>
        </Tooltip>
        <Tooltip placement="bottom" title={text}>
          <Button>Bottom</Button>
        </Tooltip>
        <Tooltip placement="bottomRight" title={text}>
          <Button>BR</Button>
        </Tooltip>
      </Flex>
    </Flex>
  </ConfigProvider>
);

export default App;
```

### 箭头展示

支持显示、隐藏以及将箭头保持居中定位。

```tsx
import React, { useMemo, useState } from 'react';
import { Button, ConfigProvider, Flex, Segmented, Tooltip } from 'antd';
import type { TooltipProps } from 'antd';

const text = <span>prompt text</span>;

const buttonWidth = 80;

const App: React.FC = () => {
  const [arrow, setArrow] = useState<'Show' | 'Hide' | 'Center'>('Show');

  const mergedArrow = useMemo<TooltipProps['arrow']>(() => {
    if (arrow === 'Hide') {
      return false;
    }

    if (arrow === 'Show') {
      return true;
    }

    return {
      pointAtCenter: true,
    };
  }, [arrow]);

  return (
    <ConfigProvider button={{ style: { width: buttonWidth, margin: 4 } }}>
      <Segmented
        value={arrow}
        options={['Show', 'Hide', 'Center']}
        onChange={setArrow}
        style={{ marginBottom: 24 }}
      />
      <Flex vertical justify="center" align="center" className="demo">
        <Flex justify="center" align="center" style={{ whiteSpace: 'nowrap' }}>
          <Tooltip placement="topLeft" title={text} arrow={mergedArrow}>
            <Button>TL</Button>
          </Tooltip>
          <Tooltip placement="top" title={text} arrow={mergedArrow}>
            <Button>Top</Button>
          </Tooltip>
          <Tooltip placement="topRight" title={text} arrow={mergedArrow}>
            <Button>TR</Button>
          </Tooltip>
        </Flex>
        <Flex style={{ width: buttonWidth * 5 + 32 }} justify="space-between" align="center">
          <Flex align="center" vertical>
            <Tooltip placement="leftTop" title={text} arrow={mergedArrow}>
              <Button>LT</Button>
            </Tooltip>
            <Tooltip placement="left" title={text} arrow={mergedArrow}>
              <Button>Left</Button>
            </Tooltip>
            <Tooltip placement="leftBottom" title={text} arrow={mergedArrow}>
              <Button>LB</Button>
            </Tooltip>
          </Flex>
          <Flex align="center" vertical>
            <Tooltip placement="rightTop" title={text} arrow={mergedArrow}>
              <Button>RT</Button>
            </Tooltip>
            <Tooltip placement="right" title={text} arrow={mergedArrow}>
              <Button>Right</Button>
            </Tooltip>
            <Tooltip placement="rightBottom" title={text} arrow={mergedArrow}>
              <Button>RB</Button>
            </Tooltip>
          </Flex>
        </Flex>
        <Flex justify="center" align="center" style={{ whiteSpace: 'nowrap' }}>
          <Tooltip placement="bottomLeft" title={text} arrow={mergedArrow}>
            <Button>BL</Button>
          </Tooltip>
          <Tooltip placement="bottom" title={text} arrow={mergedArrow}>
            <Button>Bottom</Button>
          </Tooltip>
          <Tooltip placement="bottomRight" title={text} arrow={mergedArrow}>
            <Button>BR</Button>
          </Tooltip>
        </Flex>
      </Flex>
    </ConfigProvider>
  );
};

export default App;
```

### 贴边偏移

当 Tooltip 贴边时，自动偏移并且调整箭头位置。当超出过多时，则一同滚出屏幕。

```tsx
import React from 'react';
import { Button, Tooltip } from 'antd';

const style: React.CSSProperties = {
  width: '300vw',
  height: '300vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const App: React.FC = () => {
  React.useEffect(() => {
    document.documentElement.scrollTop = document.documentElement.clientHeight;
    document.documentElement.scrollLeft = document.documentElement.clientWidth;
  }, []);
  return (
    <div style={style}>
      <Tooltip title="Thanks for using antd. Have a nice day !" open>
        <Button type="primary">Scroll The Window</Button>
      </Tooltip>
    </div>
  );
};

export default App;
```



### 多彩文字提示

我们添加了多种预设色彩的文字提示样式，用作不同场景使用。

```tsx
import React from 'react';
import { Button, Divider, Space, Tooltip } from 'antd';

const colors = [
  'pink',
  'red',
  'yellow',
  'orange',
  'cyan',
  'green',
  'blue',
  'purple',
  'geekblue',
  'magenta',
  'volcano',
  'gold',
  'lime',
];

const customColors = ['#f50', '#2db7f5', '#87d068', '#108ee9'];

const App: React.FC = () => (
  <>
    <Divider titlePlacement="start">Presets</Divider>
    <Space wrap>
      {colors.map((color) => (
        <Tooltip title="prompt text" color={color} key={color}>
          <Button>{color}</Button>
        </Tooltip>
      ))}
    </Space>
    <Divider titlePlacement="start">Custom</Divider>
    <Space wrap>
      {customColors.map((color) => (
        <Tooltip title="prompt text" color={color} key={color}>
          <Button>{color}</Button>
        </Tooltip>
      ))}
    </Space>
  </>
);

export default App;
```



### 禁用

通过设置 `title={null}` 或者 `title=""` 可以禁用 Tooltip。

```tsx
import React, { useState } from 'react';
import { Button, Tooltip } from 'antd';

const App: React.FC = () => {
  const [disabled, setDisabled] = useState(true);

  return (
    <Tooltip title={disabled ? null : 'prompt text'}>
      <Button onClick={() => setDisabled(!disabled)}>{disabled ? 'Enable' : 'Disable'}</Button>
    </Tooltip>
  );
};

export default App;
```


### 自定义子组件

与自定义组件一起使用.

```tsx
import React from 'react';
import { Tooltip } from 'antd';

const ComponentWithEvents = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLElement>>(
  (props, ref) => (
    <span ref={ref} {...props}>
      This text is inside a component with the necessary events exposed.
    </span>
  ),
);

const App: React.FC = () => (
  <Tooltip title="prompt text">
    <ComponentWithEvents />
  </Tooltip>
);

export default App;
```

### 自定义语义结构的样式和类

通过 `classNames` 和 `styles` 传入对象/函数可以自定义 Tooltip 的[语义化结构](#semantic-dom)样式。

```tsx
import React from 'react';
import { Button, Flex, Tooltip } from 'antd';
import type { TooltipProps } from 'antd';
import { createStaticStyles } from 'antd-style';

const classNames = createStaticStyles(({ css }) => ({
  container: css`
    padding: 10px;
  `,
}));

const styles: TooltipProps['styles'] = {
  container: {
    borderRadius: 12,
    boxShadow: 'inset 0 0 8px #ccc',
  },
};

const stylesFn: TooltipProps['styles'] = (info) => {
  if (!info.props.arrow) {
    return {
      container: {
        backgroundColor: 'rgba(53, 71, 125, 0.8)',
        padding: 12,
        color: '#fff',
        borderRadius: 4,
      },
    } satisfies TooltipProps['styles'];
  }
  return {};
};

const App: React.FC = () => {
  return (
    <Flex gap="middle">
      <Tooltip classNames={classNames} styles={styles} arrow={false} title="Object text">
        <Button>Object Style</Button>
      </Tooltip>
      <Tooltip classNames={classNames} styles={stylesFn} arrow={false} title="Function text">
        <Button type="primary">Function Style</Button>
      </Tooltip>
    </Flex>
  );
};

export default App;
```


## API

通用属性参考：[通用属性](/docs/react/common-props)

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| title | 提示文字 | ReactNode \| () => ReactNode | - | - |
| color | 设置背景颜色，使用该属性后内部文字颜色将自适应 | string | - | 5.27.0 |
| classNames | 语义化结构 class | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props }) => Record<[SemanticDOM](#semantic-dom), string> | - |  |
| styles | 语义化结构 style | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props }) => Record<[SemanticDOM](#semantic-dom), CSSProperties> | - |  |

### 共同的 API

<embed src="./shared/sharedProps.zh-CN.md"></embed>

### ConfigProvider - tooltip.unique {#config-provider-tooltip-unique}

可以通过 ConfigProvider 全局配置 Tooltip 的唯一性显示。当 `unique` 设置为 `true` 时，同一时间 ConfigProvider 下的 Tooltip 只会显示一个，提供更好的用户体验和平滑的过渡效果。

注意：配置后 `getContainer`、`arrow` 等属性将会失效。

```tsx
import { Button, ConfigProvider, Space, Tooltip } from 'antd';

export default () => (
  <ConfigProvider
    tooltip={{
      unique: true,
    }}
  >
    <Space>
      <Tooltip title="第一个提示">
        <Button>按钮 1</Button>
      </Tooltip>
      <Tooltip title="第二个提示">
        <Button>按钮 2</Button>
      </Tooltip>
    </Space>
  </ConfigProvider>
);
```

## Semantic DOM

https://ant.design/components/tooltip-cn/semantic.md

## 主题变量（Design Token）{#design-token}



## 组件 Token (Tooltip)
| Token 名称 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| maxWidth | 文字提示最大宽度 | number | 250 |
| zIndexPopup | 文字提示 z-index | number | 1070 |

## 全局 Token
| Token 名称 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| borderRadius | 基础组件的圆角大小，例如按钮、输入框、卡片等 | number |  |
| borderRadiusXS | XS号圆角，用于组件中的一些小圆角，如 Segmented 、Arrow 等一些内部圆角的组件样式中。 | number |  |
| boxShadowSecondary | 控制元素二级阴影样式。 | string |  |
| colorBgSpotlight | 该色用于引起用户强烈关注注意的背景色，目前只用在 Tooltip 的背景色上。 | string |  |
| colorText | 最深的文本色。为了符合W3C标准，默认的文本颜色使用了该色，同时这个颜色也是最深的中性色。 | string |  |
| colorTextLightSolid | 控制带背景色的文本，例如 Primary Button 组件中的文本高亮颜色。 | string |  |
| controlHeight | Ant Design 中按钮和输入框等基础控件的高度 | number |  |
| fontFamily | Ant Design 的字体家族中优先使用系统默认的界面字体，同时提供了一套利于屏显的备用字体库，来维护在不同平台以及浏览器的显示下，字体始终保持良好的易读性和可读性，体现了友好、稳定和专业的特性。 | string |  |
| fontSize | 设计系统中使用最广泛的字体大小，文本梯度也将基于该字号进行派生。 | number |  |
| lineHeight | 文本行高 | number |  |
| motionDurationFast | 动效播放速度，快速。用于小型元素动画交互 | string |  |
| motionDurationMid | 动效播放速度，中速。用于中型元素动画交互 | string |  |
| motionDurationSlow | 动效播放速度，慢速。用于大型元素如面板动画交互 | string |  |
| motionEaseInOutCirc | 预设动效曲率 | string |  |
| motionEaseOutCirc | 预设动效曲率 | string |  |
| paddingSM | 控制元素的小内间距。 | number |  |
| paddingXS | 控制元素的特小内间距。 | number |  |
| sizePopupArrow | 组件箭头的尺寸 | number |  |



## FAQ

### 为何有时候 HOC 组件无法生效？ {#faq-hoc-component}

请确保 `Tooltip` 的子元素能接受 `onMouseEnter`、`onMouseLeave`、`onPointerEnter`、`onPointerLeave`、`onFocus`、`onClick` 事件。

请查看 https://github.com/ant-design/ant-design/issues/15909

### 为何 Tooltip 的内容在关闭时不会更新？ {#faq-content-not-update}

Tooltip 默认在关闭时会缓存内容，以防止内容更新时出现闪烁：

```jsx
// `title` 不会因为 `user` 置空而闪烁置空
<Tooltip open={user} title={user?.name} />
```

<div>
<img alt="no blink" height="50" src="https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*KVx7QLOYwVsAAAAAAAAAAAAADrJ8AQ/original" />
</div>

如果需要在关闭时也更新内容，可以设置 `fresh` 属性（例如 [#44830](https://github.com/ant-design/ant-design/issues/44830) 中的场景）：

```jsx
<Tooltip open={user} title={user?.name} fresh />
```

<div>
<img alt="no blink" height="50" src="https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*rUbsR4xWpMsAAAAAAAAAAAAADrJ8AQ/original" />
</div>

---

<!-- 请确保在 FAQ 最后 -->

<embed src="./shared/sharedFAQ.zh-CN.md"></embed>
