---
category: Components
title: Anchor
subtitle: 锚点
description: 用于跳转到页面指定位置。
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*ufP1TLS5VvIAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*_9_eTrgvHNQAAAAAAAAAAAAADrJ8AQ/original
demo:
group:
  title: 导航
  order: 3
---

## 何时使用 {#when-to-use}

需要展现当前页面上可供跳转的锚点链接，以及快速在锚点之间跳转。

> 开发者注意事项：
>
> 自 `4.24.0` 起，由于组件从 class 重构成 FC，之前一些获取 `ref` 并调用内部实例方法的写法都会失效

## 代码演示 {#examples}

### 基本

最简单的用法。

```tsx
import React from 'react';
import { Anchor, Col, Row } from 'antd';

const App: React.FC = () => (
  <Row>
    <Col span={16}>
      <div id="part-1" style={{ height: '100vh', background: 'rgba(255,0,0,0.02)' }} />
      <div id="part-2" style={{ height: '100vh', background: 'rgba(0,255,0,0.02)' }} />
      <div id="part-3" style={{ height: '100vh', background: 'rgba(0,0,255,0.02)' }} />
    </Col>
    <Col span={8}>
      <Anchor
        items={[
          {
            key: 'part-1',
            href: '#part-1',
            title: 'Part 1',
          },
          {
            key: 'part-2',
            href: '#part-2',
            title: 'Part 2',
          },
          {
            key: 'part-3',
            href: '#part-3',
            title: 'Part 3',
          },
        ]}
      />
    </Col>
  </Row>
);

export default App;
```

### 横向 Anchor

横向 Anchor。

```tsx
import React from 'react';
import { Anchor } from 'antd';

const App: React.FC = () => (
  <>
    <div style={{ padding: '20px' }}>
      <Anchor
        direction="horizontal"
        items={[
          {
            key: 'part-1',
            href: '#part-1',
            title: 'Part 1',
          },
          {
            key: 'part-2',
            href: '#part-2',
            title: 'Part 2',
          },
          {
            key: 'part-3',
            href: '#part-3',
            title: 'Part 3',
          },
        ]}
      />
    </div>
    <div>
      <div
        id="part-1"
        style={{
          width: '100vw',
          height: '100vh',
          textAlign: 'center',
          background: 'rgba(0,255,0,0.02)',
        }}
      />
      <div
        id="part-2"
        style={{
          width: '100vw',
          height: '100vh',
          textAlign: 'center',
          background: 'rgba(0,0,255,0.02)',
        }}
      />
      <div
        id="part-3"
        style={{ width: '100vw', height: '100vh', textAlign: 'center', background: '#FFFBE9' }}
      />
    </div>
  </>
);

export default App;
```

### 静态位置

不浮动，状态不随页面滚动变化。

```tsx
import React from 'react';
import { Anchor } from 'antd';

const App: React.FC = () => (
  <Anchor
    affix={false}
    items={[
      {
        key: '1',
        href: '#anchor-demo-basic',
        title: 'Basic demo',
      },
      {
        key: '2',
        href: '#anchor-demo-static',
        title: 'Static demo',
      },
      {
        key: '3',
        href: '#api',
        title: 'API',
        children: [
          {
            key: '4',
            href: '#anchor-props',
            title: 'Anchor Props',
          },
          {
            key: '5',
            href: '#link-props',
            title: 'Link Props',
          },
        ],
      },
    ]}
  />
);

export default App;
```

### 自定义 onClick 事件

点击锚点不记录历史。

```tsx
import React from 'react';
import { Anchor } from 'antd';

const handleClick = (
  e: React.MouseEvent<HTMLElement>,
  link: {
    title: React.ReactNode;
    href: string;
  },
) => {
  e.preventDefault();
  console.log(link);
};

const App: React.FC = () => (
  <Anchor
    affix={false}
    onClick={handleClick}
    items={[
      {
        key: '1',
        href: '#anchor-demo-basic',
        title: 'Basic demo',
      },
      {
        key: '2',
        href: '#anchor-demo-static',
        title: 'Static demo',
      },
      {
        key: '3',
        href: '#api',
        title: 'API',
        children: [
          {
            key: '4',
            href: '#anchor-props',
            title: 'Anchor Props',
          },
          {
            key: '5',
            href: '#link-props',
            title: 'Link Props',
          },
        ],
      },
    ]}
  />
);

export default App;
```

### 自定义锚点高亮

自定义锚点高亮。

```tsx
import React from 'react';
import { Anchor } from 'antd';

const getCurrentAnchor = () => '#anchor-demo-static';

const App: React.FC = () => (
  <Anchor
    affix={false}
    getCurrentAnchor={getCurrentAnchor}
    items={[
      {
        key: '1',
        href: '#anchor-demo-basic',
        title: 'Basic demo',
      },
      {
        key: '2',
        href: '#anchor-demo-static',
        title: 'Static demo',
      },
      {
        key: '3',
        href: '#api',
        title: 'API',
        children: [
          {
            key: '4',
            href: '#anchor-props',
            title: 'Anchor Props',
          },
          {
            key: '5',
            href: '#link-props',
            title: 'Link Props',
          },
        ],
      },
    ]}
  />
);

export default App;
```

### 设置锚点滚动偏移量

锚点目标滚动到屏幕正中间。

```tsx
import React, { useEffect, useState } from 'react';
import { Anchor, Col, Row } from 'antd';

const style: React.CSSProperties = {
  height: '30vh',
  backgroundColor: 'rgba(0, 0, 0, 0.85)',
  position: 'fixed',
  top: 0,
  insetInlineStart: 0,
  width: '75%',
  color: '#fff',
};

const App: React.FC = () => {
  const topRef = React.useRef<HTMLDivElement>(null);
  const [targetOffset, setTargetOffset] = useState<number>();

  useEffect(() => {
    setTargetOffset(topRef.current?.clientHeight);
  }, []);

  return (
    <div>
      <Row>
        <Col span={18}>
          <div
            id="part-1"
            style={{ height: '100vh', background: 'rgba(255,0,0,0.02)', marginTop: '30vh' }}
          >
            Part 1
          </div>
          <div id="part-2" style={{ height: '100vh', background: 'rgba(0,255,0,0.02)' }}>
            Part 2
          </div>
          <div id="part-3" style={{ height: '100vh', background: 'rgba(0,0,255,0.02)' }}>
            Part 3
          </div>
        </Col>
        <Col span={6}>
          <Anchor
            targetOffset={targetOffset}
            items={[
              { key: 'part-1', href: '#part-1', title: 'Part 1' },
              { key: 'part-2', href: '#part-2', title: 'Part 2' },
              { key: 'part-3', href: '#part-3', title: 'Part 3' },
            ]}
          />
        </Col>
      </Row>
      <div style={style} ref={topRef}>
        <div>Fixed Top Block</div>
      </div>
    </div>
  );
};

export default App;
```

### 监听锚点链接改变

监听锚点链接改变

```tsx
import React from 'react';
import { Anchor } from 'antd';

const onChange = (link: string) => {
  console.log('Anchor:OnChange', link);
};

const App: React.FC = () => (
  <Anchor
    affix={false}
    onChange={onChange}
    items={[
      {
        key: '1',
        href: '#anchor-demo-basic',
        title: 'Basic demo',
      },
      {
        key: '2',
        href: '#anchor-demo-static',
        title: 'Static demo',
      },
      {
        key: '3',
        href: '#api',
        title: 'API',
        children: [
          {
            key: '4',
            href: '#anchor-props',
            title: 'Anchor Props',
          },
          {
            key: '5',
            href: '#link-props',
            title: 'Link Props',
          },
        ],
      },
    ]}
  />
);

export default App;
```

### 替换历史中的 href

替换浏览器历史记录中的路径，后退按钮将返回到上一页而不是上一个锚点。

```tsx
import React from 'react';
import { Anchor, Col, Row } from 'antd';

const App: React.FC = () => (
  <Row>
    <Col span={16}>
      <div id="part-1" style={{ height: '100vh', background: 'rgba(255,0,0,0.02)' }} />
      <div id="part-2" style={{ height: '100vh', background: 'rgba(0,255,0,0.02)' }} />
      <div id="part-3" style={{ height: '100vh', background: 'rgba(0,0,255,0.02)' }} />
    </Col>
    <Col span={8}>
      <Anchor
        replace
        items={[
          {
            key: 'part-1',
            href: '#part-1',
            title: 'Part 1',
          },
          {
            key: 'part-2',
            href: '#part-2',
            title: 'Part 2',
          },
          {
            key: 'part-3',
            href: '#part-3',
            title: 'Part 3',
          },
        ]}
      />
    </Col>
  </Row>
);

export default App;
```


### 自定义语义结构的样式和类

通过 `classNames` 和 `styles` 传入对象/函数可以自定义 Anchor 的[语义化结构](#semantic-dom)样式。

```tsx
import React from 'react';
import { Anchor, Col, Row } from 'antd';
import type { AnchorProps } from 'antd';

const classNamesObject: AnchorProps['classNames'] = {
  root: 'demo-anchor-root',
  item: 'demo-anchor-item',
  itemTitle: 'demo-anchor-title',
  indicator: 'demo-anchor-indicator',
};

const stylesFn: AnchorProps['styles'] = (info) => {
  if (info.props.direction === 'vertical') {
    return {
      root: {
        backgroundColor: 'rgba(255,251,230,0.5)',
        height: '100vh',
      },
    } satisfies AnchorProps['styles'];
  }
  return {};
};

const items: NonNullable<AnchorProps['items']> = [
  {
    key: 'part-1',
    href: '#part-1',
    title: 'Part 1',
  },
  {
    key: 'part-2',
    href: '#part-2',
    title: 'Part 2',
  },
  {
    key: 'part-3',
    href: '#part-3',
    title: 'Part 3',
  },
];

const App: React.FC = () => {
  return (
    <Row>
      <Col span={16}>
        <div id="part-1" style={{ height: '100vh', background: 'rgba(255,0,0,0.08)' }} />
        <div id="part-2" style={{ height: '100vh', background: 'rgba(0,255,0,0.08)' }} />
        <div id="part-3" style={{ height: '100vh', background: 'rgba(0,0,255,0.08)' }} />
      </Col>
      <Col span={8}>
        <Anchor replace items={items} styles={stylesFn} classNames={classNamesObject} />
      </Col>
    </Row>
  );
};

export default App;
```



## API

通用属性参考：[通用属性](/docs/react/common-props)

### Anchor Props

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| affix | 固定模式 | boolean \| Omit<AffixProps, 'offsetTop' \| 'target' \| 'children'> | true | object: 5.19.0 |
| bounds | 锚点区域边界 | number | 5 |  |
| classNames | 用于自定义组件内部各语义化结构的 class，支持对象或函数 | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), string> | - |  |
| getContainer | 指定滚动的容器 | () => HTMLElement | () => window |  |
| getCurrentAnchor | 自定义高亮的锚点 | (activeLink: string) => string | - |  |
| offsetTop | 距离窗口顶部达到指定偏移量后触发 | number |  |  |
| showInkInFixed | `affix={false}` 时是否显示小方块 | boolean | false |  |
| styles | 用于自定义组件内部各语义化结构的行内 style，支持对象或函数 | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties> | - |  |
| targetOffset | 锚点滚动偏移量，默认与 offsetTop 相同，[例子](#anchor-demo-targetoffset) | number | - |  |
| onChange | 监听锚点链接改变 | (currentActiveLink: string) => void | - |  |
| onClick | `click` 事件的 handler | (e: MouseEvent, link: object) => void | - |  |
| items | 数据化配置选项内容，支持通过 children 嵌套 | { key, href, title, target, children }\[] [具体见](#anchoritem) | - | 5.1.0 |
| direction | 设置导航方向 | `vertical` \| `horizontal` | `vertical` | 5.2.0 |
| replace | 替换浏览器历史记录中项目的 href 而不是推送它 | boolean | false | 5.7.0 |

### AnchorItem

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| key | 唯一标志 | string \| number | - |  |
| href | 锚点链接 | string | - |  |
| target | 该属性指定在何处显示链接的资源 | string | - |  |
| title | 文字内容 | ReactNode | - |  |
| children | 嵌套的 Anchor Link，`注意：水平方向该属性不支持` | [AnchorItem](#anchoritem)\[] | - |  |
| replace | 替换浏览器历史记录中的项目 href 而不是推送它 | boolean | false | 5.7.0 |

### Link Props

建议使用 items 形式。

| 参数   | 说明                           | 类型      | 默认值 | 版本 |
| ------ | ------------------------------ | --------- | ------ | ---- |
| href   | 锚点链接                       | string    | -      |      |
| target | 该属性指定在何处显示链接的资源 | string    | -      |      |
| title  | 文字内容                       | ReactNode | -      |      |

## Semantic DOM

https://ant.design/components/anchor-cn/semantic.md

## 主题变量（Design Token）{#design-token}



## 组件 Token (Anchor)
| Token 名称 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| linkPaddingBlock | 链接纵向内间距 | number | 4 |
| linkPaddingInlineStart | 链接横向内间距 | number | 16 |

## 全局 Token
| Token 名称 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| colorPrimary | 品牌色是体现产品特性和传播理念最直观的视觉元素之一。在你完成品牌主色的选取之后，我们会自动帮你生成一套完整的色板，并赋予它们有效的设计语义 | string |  |
| colorSplit | 用于作为分割线的颜色，此颜色和 colorBorderSecondary 的颜色一致，但是用的是透明色。 | string |  |
| colorText | 最深的文本色。为了符合W3C标准，默认的文本颜色使用了该色，同时这个颜色也是最深的中性色。 | string |  |
| fontFamily | Ant Design 的字体家族中优先使用系统默认的界面字体，同时提供了一套利于屏显的备用字体库，来维护在不同平台以及浏览器的显示下，字体始终保持良好的易读性和可读性，体现了友好、稳定和专业的特性。 | string |  |
| fontSize | 设计系统中使用最广泛的字体大小，文本梯度也将基于该字号进行派生。 | number |  |
| fontSizeLG | 大号字体大小 | number |  |
| lineHeight | 文本行高 | number |  |
| lineType | 用于控制组件边框、分割线等的样式，默认是实线 | string |  |
| lineWidth | 用于控制组件边框、分割线等的宽度 | number |  |
| lineWidthBold | 描边类组件的默认线宽，如 Button、Input、Select 等输入类控件。 | number |  |
| motionDurationSlow | 动效播放速度，慢速。用于大型元素如面板动画交互 | string |  |
| paddingXXS | 控制元素的极小内间距。 | number |  |



## FAQ

### 在 `5.25.0+` 版本中，锚点跳转后，目标元素的 `:target` 伪类未按预期生效 {#faq-target-pseudo-class}

出于页面性能优化考虑，锚点跳转的实现方式从 `window.location.href` 调整为 `window.history.pushState/replaceState`。由于 `pushState/replaceState` 不会触发页面重载，因此浏览器不会自动更新 `:target` 伪类的匹配状态。可以手动构造完整URL：`href = window.location.origin + window.location.pathname + '#xxx'` 来解决这问题。

相关issues：[#53143](https://github.com/ant-design/ant-design/issues/53143) [#54255](https://github.com/ant-design/ant-design/issues/54255)
