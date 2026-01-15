# Affix — 固钉

## 功能概述

将页面元素固定在特定可视区域。

## 输入字段

### 必填

- `children`: ReactNode，需要固定的内容。

### 可选

- `offsetTop`: number，距离窗口顶部达到指定偏移量后触发。
- `offsetBottom`: number，距离窗口底部达到指定偏移量后触发。
- `target`: () => HTMLElement，设置需要监听其滚动事件的元素，默认 `() => window`。
- `onChange`: (affixed) => void，固定状态改变时回调。

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
      {/* 固定在顶部 */}
      <Affix offsetTop={10}>
        <Button type="primary">Affix top</Button>
      </Affix>

      {/* 固定在底部 */}
      <Affix offsetBottom={10}>
        <Button type="primary">Affix bottom</Button>
      </Affix>

      {/* 状态变化回调 */}
      <Affix offsetTop={120} onChange={(affixed) => console.log(affixed)}>
        <Button>120px to affix top</Button>
      </Affix>

      {/* 指定容器 */}
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
