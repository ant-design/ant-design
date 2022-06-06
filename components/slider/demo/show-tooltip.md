---
order: 7
title:
  zh-CN: 控制 ToolTip 的显示
  en-US: Control visible of ToolTip
---

## zh-CN

当 `tooltipVisible` 为 `true` 时，将始终显示 ToolTip；反之则始终不显示，即使在拖动、移入时也是如此。

## en-US

When `tooltipVisible` is `true`, ToolTip will show always, or ToolTip will not show anyway, even if dragging or hovering.

```tsx
import { Slider } from 'antd';
import React from 'react';

const App: React.FC = () => <Slider defaultValue={30} tooltipVisible />;

export default App;
```
