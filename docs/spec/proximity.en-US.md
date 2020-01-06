---
category: Design Patterns
type: Principles
order: 1
title: Proximity
---

When several items are in close proximity to each other, they become one visual unit rather than several separate units. Otherwise, their distance should be larger and look more like several visual units. The basic purpose of proximity is to organize. To give an apparent view of the page structure and the hierarchy of information to users.

---

## The relation of vertical spacing

<img class="preview-img" align="right" alt="Example of the different vertical distance" description="In Ant Design, the three different formats are 8px (small spacing), 16px (middle spacing) and 24px (large spacing)." src="https://gw.alipayobjects.com/zos/rmsportal/goazWUHPXsGEDFIGsNlm.png">

Divide the hierarchy of information through three formats:「small spacing」, 「middle spacing」and「large spacing」

<br>

<img class="preview-img" align="right" alt="Example of added element" description="To make the hierarchy more apparent through adding 「guides」." src="https://gw.alipayobjects.com/zos/rmsportal/XNFCsupiYDBTJFQkmOmv.png">

In the case that the three formats are applicable, the hierarchy of information can be separated clearly through adding or cutting down the multiple of 「basic spacing」, or adding elements.

> Note: in Ant Design, y = 8 + 8 \* n, among which, n >= 0, y stands for the vertical spacing and 8 represents 「basic spacing」.

---

## Relationship of horizontal spacing

<img class="preview-img" align="right" alt="Example of combination and configuration" src="https://gw.alipayobjects.com/zos/rmsportal/uYvsqAUXNaqURGIhZhxz.png">

To adapt to screens of different sizes, in the horizontal direction, use grid layout to arrange the components to ensure the flexibility of the layout.

<br>

<img class="preview-img" align="right" alt="Example of checkbox" src="https://gw.alipayobjects.com/zos/rmsportal/ysXfdKqmdDRAimBiKVGS.png">

In the inner of a component, the horizontal spacing of elements should differ too.
