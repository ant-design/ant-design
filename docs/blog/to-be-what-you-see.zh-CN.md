---
title: 所见即所得
date: 2023-05-10
author: zombieJ
---

在日常开发过程中，你是否思考过一个问题。那就是范围限定和实际值不同的时候，应该如何去处理？假设我们有一个数字展示组件，它很简单的将你的数字进行展示：

```tsx
// Let's ignore types check for this
function Number({ value }) {
  return <div>{value}</div>;
}

<Number value={99} />;
```
