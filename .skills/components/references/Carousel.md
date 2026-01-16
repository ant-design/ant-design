# Carousel — 走马灯

## 功能概述

一组轮播的区域。

## 应用场景

- 当有一组平级的内容。
- 当内容空间不足时，可以用走马灯的形式进行收纳，进行轮播展现。
- 常用于一组图片或卡片轮播。

## 输入字段

### Carousel 属性

#### 必填

- 无必填属性。

#### 可选

- `arrows`: boolean，是否显示箭头，默认 false，版本 5.17.0。
- `autoplay`: boolean | { dotDuration?: boolean }，是否自动切换，如果为 object 可以指定 `dotDuration` 来展示指示点进度条，默认 false，版本 dotDuration: 5.24.0。
- `autoplaySpeed`: number，自动切换的间隔（毫秒），默认 3000。
- `adaptiveHeight`: boolean，高度自适应，默认 false。
- `dotPlacement`: string，面板指示点位置，可选 `top` `bottom` `start` `end`，默认 `bottom`。
- `~~dotPosition~~`: string，面板指示点位置，可选 `top` `bottom` `left` `right` `start` `end`，请使用 `dotPlacement` 替换，默认 `bottom`。
- `dots`: boolean | { className?: string }，是否显示面板指示点，如果为 `object` 则可以指定 `dotsClass`，默认 true。
- `draggable`: boolean，是否启用拖拽切换，默认 false。
- `fade`: boolean，使用渐变切换动效，默认 false。
- `infinite`: boolean，是否无限循环切换（实现方式是复制两份 children 元素，如果子元素有副作用则可能会引发 bug），默认 true。
- `speed`: number，切换动效的时间（毫秒），默认 500。
- `easing`: string，动画效果，默认 `linear`。
- `effect`: `scrollx` | `fade`，动画效果函数，默认 `scrollx`。
- `afterChange`: (current: number) => void，切换面板的回调。
- `beforeChange`: (current: number, next: number) => void，切换面板的回调。
- `waitForAnimate`: boolean，是否等待切换动画，默认 false。

## 方法

- `goTo(slideNumber, dontAnimate)`: 切换到指定面板, dontAnimate = true 时，不使用动画
- `next()`: 切换到下一面板
- `prev()`: 切换到上一面板

## 使用建议

banner 展示使用走马灯；需要手动控制时使用 ref；配合 autoplay 实现自动轮播。

## 示例代码

```tsx
import { useRef } from 'react';
import { Button, Carousel, Space } from 'antd';
import type { CarouselRef } from 'antd/es/carousel';

const contentStyle: React.CSSProperties = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const App: React.FC = () => {
  const carouselRef = useRef<CarouselRef>(null);

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Carousel>
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
      </Carousel>

      <Carousel effect="fade">
        <div>
          <h3 style={contentStyle}>1</h3>
        </div>
        <div>
          <h3 style={contentStyle}>2</h3>
        </div>
      </Carousel>

      <Carousel arrows>
        <div>
          <h3 style={contentStyle}>1</h3>
        </div>
        <div>
          <h3 style={contentStyle}>2</h3>
        </div>
      </Carousel>

      <Carousel ref={carouselRef}>
        <div>
          <h3 style={contentStyle}>1</h3>
        </div>
        <div>
          <h3 style={contentStyle}>2</h3>
        </div>
      </Carousel>
      <Space>
        <Button onClick={() => carouselRef.current?.prev()}>Prev</Button>
        <Button onClick={() => carouselRef.current?.next()}>Next</Button>
        <Button onClick={() => carouselRef.current?.goTo(0)}>Go to 1</Button>
      </Space>
    </Space>
  );
};
```

## 返回结果

渲染一个走马灯组件，用于展示轮播内容。
