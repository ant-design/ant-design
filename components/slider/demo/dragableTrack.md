---
order: 9
title:
  zh-CN: 范围可拖拽
  en-US: Draggable track
---

## zh-CN

可以设置 `range.draggableTrack`，使得范围刻度整体可拖拽。

## en-US

Make range track draggable when set `range.draggableTrack`.

```tsx
import { Slider } from 'antd';
import React from 'react';

const App: React.FC = () => <Slider range={{ draggableTrack: true }} defaultValue={[20, 50]} />;

export default App;
```
