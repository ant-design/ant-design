# Affix — 固钉

## 功能概述

将页面元素钉在可视范围。

## 应用场景

- 当内容区域比较长，需要滚动页面时，这部分内容对应的操作或者导航需要在滚动范围内始终展现。常用于侧边菜单和按钮组合。
- 页面可视范围过小时，慎用此功能以免出现遮挡页面内容的情况。

## 输入字段

### Affix 属性

#### 必填

- 无必填属性。

#### 可选

- `offsetBottom`: number，距离窗口底部达到指定偏移量后触发。
- `offsetTop`: number，距离窗口顶部达到指定偏移量后触发，默认 0。
- `target`: () => HTMLElement，设置 `Affix` 需要监听其滚动事件的元素，值为一个返回对应 DOM 元素的函数，默认 () => window。
- `onChange`: (affixed?: boolean) => void，固定状态改变时触发的回调函数。

## 方法

无公开方法。

## 使用建议

工具栏固定使用 Affix；配合 target 指定滚动容器；使用 offsetTop 避免被固定头部遮挡。

## 示例代码

```tsx
import { useState } from 'react';
import { Affix, Button } from 'antd';

const App: React.FC = () => {
  const [container, setContainer] = useState<HTMLDivElement | null>(null);

  return (
    <>
      <Affix offsetTop={10}>
        <Button type="primary">Affix top</Button>
      </Affix>

      <Affix offsetBottom={10}>
        <Button type="primary">Affix bottom</Button>
      </Affix>

      <Affix offsetTop={120} onChange={(affixed) => console.log(affixed)}>
        <Button>120px to affix top</Button>
      </Affix>

      <div ref={setContainer} style={{ height: 100, overflow: 'auto' }}>
        <div style={{ height: 1000 }}>
          <Affix target={() => container!} offsetTop={10}>
            <Button type="primary">Fixed in container</Button>
          </Affix>
        </div>
      </div>
    </>
  );
};
```

## 返回结果

渲染一个固钉容器，元素会在滚动时固定在指定位置。
