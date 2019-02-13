---
category: Visual
order: 2
title: Layout
---

Spatial layout is the starting point of systematic visual design. The difference from traditional graphic design is that the layout space of UI interface should be based on the dynamic and systematic perspective. We were inspired by the architectural ethic of the architect Le Corbusier and explored the dynamic spatial order in UI design and formed the interface layout of Ant Design based on the principle of 'beauty of order', making it possible for designers to create spatial layout that comes with rational beauty.

While defining the layout system in a visual system, we propose to start from the following 5 aspects:：

1. Unified Canvas Dimension
2. Adaptation
3. Grid Unit
4. Raster
5. Common Scales

## Unified Design Board Dimension

In order to minimize communication cost, it is necessary to unify the size of the design board within the organization. E.g., the unified design board width of the ant design team is 1440.

## Adaptation

In the design process, the designer also needs to establish the concept of adaptation. Decision needs to made for things like whether a system needs to be adapted depends on the specific situation, and/or what are the blocks that needs dynamic layout. According to statistics, mainstream screen resolution includes  1920, 1440, and 1366. Some devices still have resolution of 1280.

Ant Design's two typical adaptation type:

### 1. Left-Right Layout

Commonly used in design schemes for left and right layouts, the common practice is to fix the left navigation bar and dynamically scale the right work area.

![Left-Right Layout](https://gw.alipayobjects.com/zos/rmsportal/vSqMhPolCtINKLvVVdLt.png)

### 2. Top-Bottom Layout

Common used in design schemes for top and bottom layouts. The practice is to define the minimum value for the marginal areas on both sides. After the blanking area reaches the limit value, the intermediate main content area is dynamically scaled.

![Top-Bottom Layout](https://gw.alipayobjects.com/zos/rmsportal/VQEiJqtZfvvdyZSKcEsE.png)

The above are just two simple adaptation ideas, the actual design of a perfect adaptation program requires the designer to have front end perspective, plane composition perspective and interactive perspective.

## Grid Unit

Ant Design uses the grid system to achieve the order of the visual system. The base unit of the grid is 8, which not only matches the even number of ideas but also matches most mainstream display devices. Grid system thinking can help designers quickly achieve design decisions in the layout space while simplifying communication between designers developers.

## Raster

Ant Design uses a 24-grid architecture. Taking the structure of the 1440 top-bottom layout as an example, the content area with a width of 1168 is divided into 24 grids, as shown in the following picture. We set the value of the Gutter of the grid in the page, such that when the browser expands or shrinks in a certain range, the column width of the grid will expand or shrink accordingly, but the width of Gutter is always fixed.

![Raster layout](https://gw.alipayobjects.com/zos/rmsportal/YPUZpPCzFgQHVxXCIAzq.png)

For developers, the grid is a way to achieve dynamic layout, however the designer's understanding of the grid is derived from the grid in the graphic design. Differences of the perspectives are likely to cause deviations that ultimately affect the degree of visual restoration, which in turn increases communication costs.

Ant Design's designers keep the following 4 things in mind in the communication with engineers:

1. Clear definition of dynamic layout area
2. Try to always use even numbers
3. Delivery of critical numbers (Gutter, Column)
4. Always use beginning column and ending column to define blocks.

## Common Scales

AntFin's projects cover a large number of products of different types and even different orders of magnitude. In order to help designers of various levels to have consistency and similar rhythm in designing page layout, to unify designing language and reduce the restoration losses, Ant Design proposed the concept of UI common scales. From a large amount of practices, we have extracted a set of arrays that can be used as dimensions for UI layout decision. All the numbers are multiples of 8 and have a dynamic sense of rhythm. After verification, it can help us to achieve a faster and better design decision making of layout design.

![The two arrays](https://gw.alipayobjects.com/zos/rmsportal/ZBeDQMLMHLRfmUlUaaII.png)

![Common Usages](https://gw.alipayobjects.com/zos/rmsportal/QWsZUeuqYGQJqJxIPHOx.png)

## Inspiration, But Not Limitation

The result of Ant Design in layout space is not to limit design output, but to guide designers to do it better. The two 8-fold array can be made into a myriad of possibilities by permutations and combinations, but there is a difference between "simply applying a permutation" and "really well designed". We need to consider availability in the pursuit of beauty, and we're still on our way to achieve a design system that is both reasonable and elegant. There are still plenty of things to explore for enterprise-level application interface layout.
translate-layout