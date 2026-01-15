# Carousel — 走马灯

## 功能概述

旋转木马，一组轮播的区域。

## 输入字段

### 必填

- `children`: ReactNode，轮播内容。

### 可选

- `autoplay`: boolean，自动切换，默认 `false`。
- `autoplaySpeed`: number，自动切换间隔（ms），默认 `3000`。
- `speed`: number，动画时间（ms），默认 `500`。
- `effect`: string，动画效果，可选 `scrollx` | `fade`，默认 `scrollx`。
- `dotPosition`: string，面板位置，可选 `top` | `bottom` | `left` | `right`，默认 `bottom`。
- `dots`: boolean | { className }，指示点配置，默认 `true`。
- `arrows`: boolean，显示箭头，默认 `false`。
- `draggable`: boolean，支持拖拽切换，默认 `false`（5.11.0+）。
- `fade`: boolean，使用渐变效果，默认 `false`。
- `infinite`: boolean，无限循环，默认 `true`。
- `initialSlide`: number，初始索引，默认 `0`。
- `slidesToShow`: number，同时展示数量，默认 `1`（5.17.0+）。
- `slidesToScroll`: number，每次滚动数量，默认 `1`（5.17.0+）。
- `waitForAnimate`: boolean，等待动画完成才能切换，默认 `false`。
- `adaptiveHeight`: boolean，自适应高度，默认 `false`。
- `beforeChange`: (from, to) => void，切换前回调。
- `afterChange`: (current) => void，切换后回调。

### 方法（通过 ref 调用）

- `goTo(slide, dontAnimate)`: 跳转到指定面板
- `next()`: 下一页
- `prev()`: 上一页

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
      {/* 基础用法 */}
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

      {/* 自动播放 */}
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

      {/* 渐变效果 */}
      <Carousel effect="fade">
        <div>
          <h3 style={contentStyle}>1</h3>
        </div>
        <div>
          <h3 style={contentStyle}>2</h3>
        </div>
      </Carousel>

      {/* 显示箭头 */}
      <Carousel arrows>
        <div>
          <h3 style={contentStyle}>1</h3>
        </div>
        <div>
          <h3 style={contentStyle}>2</h3>
        </div>
      </Carousel>

      {/* 手动控制 */}
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
