---
category: Components
group: 数据展示
title: Carousel
subtitle: 走马灯
description: 一组轮播的区域。
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*bPMSSqbaTMkAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*a-58QpYnqOsAAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
---

## 何时使用 {#when-to-use}

- 当有一组平级的内容。
- 当内容空间不足时，可以用走马灯的形式进行收纳，进行轮播展现。
- 常用于一组图片或卡片轮播。

## 代码演示 {#examples}

### 基本

最简单的用法。

```tsx
import React from 'react';
import { Carousel } from 'antd';

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const App: React.FC = () => {
  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };

  return (
    <Carousel afterChange={onChange}>
      <div>
        <h3 style={contentStyle}>1</h3>
      </div>
      <div>
        <h3 style={contentStyle}>2</h3>
      </div>
      <div>
        <h3 style={contentStyle}>3</h3>
      </div>
      <div>
        <h3 style={contentStyle}>4</h3>
      </div>
    </Carousel>
  );
};

export default App;
```

### 位置

位置有 4 个方向。

```tsx
import React, { useState } from 'react';
import type { CarouselProps, RadioChangeEvent } from 'antd';
import { Carousel, Radio } from 'antd';

type DotPlacement = CarouselProps['dotPlacement'];

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const App: React.FC = () => {
  const [dotPlacement, setDotPlacement] = useState<DotPlacement>('top');

  const handlePositionChange = ({ target: { value } }: RadioChangeEvent) => {
    setDotPlacement(value);
  };

  return (
    <>
      <Radio.Group onChange={handlePositionChange} value={dotPlacement} style={{ marginBottom: 8 }}>
        <Radio.Button value="top">Top</Radio.Button>
        <Radio.Button value="bottom">Bottom</Radio.Button>
        <Radio.Button value="start">Start</Radio.Button>
        <Radio.Button value="end">End</Radio.Button>
      </Radio.Group>
      <Carousel dotPlacement={dotPlacement}>
        <div>
          <h3 style={contentStyle}>1</h3>
        </div>
        <div>
          <h3 style={contentStyle}>2</h3>
        </div>
        <div>
          <h3 style={contentStyle}>3</h3>
        </div>
        <div>
          <h3 style={contentStyle}>4</h3>
        </div>
      </Carousel>
    </>
  );
};

export default App;
```

### 自动切换

定时切换下一张。

```tsx
import React from 'react';
import { Carousel } from 'antd';

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const App: React.FC = () => (
  <Carousel autoplay>
    <div>
      <h3 style={contentStyle}>1</h3>
    </div>
    <div>
      <h3 style={contentStyle}>2</h3>
    </div>
    <div>
      <h3 style={contentStyle}>3</h3>
    </div>
    <div>
      <h3 style={contentStyle}>4</h3>
    </div>
  </Carousel>
);

export default App;
```

### 渐显

切换效果为渐显。

```tsx
import React from 'react';
import { Carousel } from 'antd';

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const App: React.FC = () => (
  <Carousel effect="fade">
    <div>
      <h3 style={contentStyle}>1</h3>
    </div>
    <div>
      <h3 style={contentStyle}>2</h3>
    </div>
    <div>
      <h3 style={contentStyle}>3</h3>
    </div>
    <div>
      <h3 style={contentStyle}>4</h3>
    </div>
  </Carousel>
);

export default App;
```

### 切换箭头

显示切换箭头。

```tsx
import React from 'react';
import { Carousel } from 'antd';

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const App: React.FC = () => (
  <>
    <Carousel arrows infinite={false}>
      <div>
        <h3 style={contentStyle}>1</h3>
      </div>
      <div>
        <h3 style={contentStyle}>2</h3>
      </div>
      <div>
        <h3 style={contentStyle}>3</h3>
      </div>
      <div>
        <h3 style={contentStyle}>4</h3>
      </div>
    </Carousel>
    <br />
    <Carousel arrows dotPlacement="start" infinite={false}>
      <div>
        <h3 style={contentStyle}>1</h3>
      </div>
      <div>
        <h3 style={contentStyle}>2</h3>
      </div>
      <div>
        <h3 style={contentStyle}>3</h3>
      </div>
      <div>
        <h3 style={contentStyle}>4</h3>
      </div>
    </Carousel>
  </>
);

export default App;
```

### 进度条

展示指示点的进度。

```tsx
import React from 'react';
import { Carousel } from 'antd';

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const App: React.FC = () => (
  <Carousel autoplay={{ dotDuration: true }} autoplaySpeed={5000}>
    <div>
      <h3 style={contentStyle}>1</h3>
    </div>
    <div>
      <h3 style={contentStyle}>2</h3>
    </div>
    <div>
      <h3 style={contentStyle}>3</h3>
    </div>
    <div>
      <h3 style={contentStyle}>4</h3>
    </div>
  </Carousel>
);

export default App;
```



## API

通用属性参考：[通用属性](/docs/react/common-props)

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| arrows | 是否显示箭头 | boolean | false | 5.17.0 |
| autoplay | 是否自动切换，如果为 object 可以指定 `dotDuration` 来展示指示点进度条 | boolean \| { dotDuration?: boolean } | false | dotDuration: 5.24.0 |
| autoplaySpeed | 自动切换的间隔（毫秒） | number | 3000 |  |
| adaptiveHeight | 高度自适应 | boolean | false |  |
| dotPlacement | 面板指示点位置，可选 `top` `bottom` `start` `end` | string | `bottom` |  |
| ~~dotPosition~~ | 面板指示点位置，可选 `top` `bottom` `left` `right` `start` `end`，请使用 `dotPlacement` 替换 | string | `bottom` |  |
| dots | 是否显示面板指示点，如果为 `object` 则可以指定 `dotsClass` | boolean \| { className?: string } | true |  |
| draggable | 是否启用拖拽切换 | boolean | false |  |
| fade | 使用渐变切换动效 | boolean | false |  |
| infinite | 是否无限循环切换（实现方式是复制两份 children 元素，如果子元素有副作用则可能会引发 bug） | boolean | true |  |
| speed | 切换动效的时间（毫秒） | number | 500 |  |
| easing | 动画效果 | string | `linear` |  |
| effect | 动画效果函数 | `scrollx` \| `fade` | `scrollx` |  |
| afterChange | 切换面板的回调 | (current: number) => void | - |  |
| beforeChange | 切换面板的回调 | (current: number, next: number) => void | - |  |
| waitForAnimate | 是否等待切换动画 | boolean | false |  |

更多 API 可参考：<https://react-slick.neostack.com/docs/api>

## 方法 {#methods}

| 名称                           | 描述                                              |
| ------------------------------ | ------------------------------------------------- |
| goTo(slideNumber, dontAnimate) | 切换到指定面板, dontAnimate = true 时，不使用动画 |
| next()                         | 切换到下一面板                                    |
| prev()                         | 切换到上一面板                                    |

## 主题变量（Design Token）{#design-token}



## 组件 Token (Carousel)
| Token 名称 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| arrowOffset | 切换箭头边距 | number | 8 |
| arrowSize | 切换箭头大小 | number | 16 |
| dotActiveWidth | 激活态指示点宽度 | string \| number | 24 |
| dotGap | 指示点之间的间距 | number | 4 |
| dotHeight | 指示点高度 | string \| number | 3 |
| dotOffset | 指示点距离边缘的距离 | number | 12 |
| dotWidth | 指示点宽度 | string \| number | 16 |

## 全局 Token
| Token 名称 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| colorBgContainer | 组件的容器背景色，例如：默认按钮、输入框等。务必不要将其与 `colorBgElevated` 混淆。 | string |  |
| colorText | 最深的文本色。为了符合W3C标准，默认的文本颜色使用了该色，同时这个颜色也是最深的中性色。 | string |  |
| fontFamily | Ant Design 的字体家族中优先使用系统默认的界面字体，同时提供了一套利于屏显的备用字体库，来维护在不同平台以及浏览器的显示下，字体始终保持良好的易读性和可读性，体现了友好、稳定和专业的特性。 | string |  |
| fontSize | 设计系统中使用最广泛的字体大小，文本梯度也将基于该字号进行派生。 | number |  |
| lineHeight | 文本行高 | number |  |
| marginXXS | 控制元素外边距，最小尺寸。 | number |  |
| motionDurationSlow | 动效播放速度，慢速。用于大型元素如面板动画交互 | string |  |



## FAQ

### 如何自定义箭头？ {#faq-add-custom-arrows}

可参考 [#12479](https://github.com/ant-design/ant-design/issues/12479)。
