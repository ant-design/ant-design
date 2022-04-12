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

```jsx
import { Slider } from 'antd';

export default () => <Slider range={{ draggableTrack: true }} defaultValue={[20, 50]} />;
```
