---
group: 设计模式
type: 原则
order: 1
title: 亲密性
---

如果信息之间关联性越高，它们之间的距离就应该越接近，也越像一个视觉单元；反之，则它们的距离就应该越远，也越像多个视觉单元。亲密性的根本目的是实现组织性，让用户对页面结构和信息层次一目了然。

---

## 纵向间距关系

<ImagePreview>
  <img class="preview-img" alt="纵向间距示例" description="在 Ant Design 中，这三种规格分别为：8px（小号间距）、16px（中号间距）、24px（大号间距）。" src="https://gw.alipayobjects.com/zos/rmsportal/goazWUHPXsGEDFIGsNlm.png">
</ImagePreview>

通过「小号间距」、「中号间距」、「大号间距」这三种规格来划分信息层次结构。

<br>

<ImagePreview>
  <img class="preview-img" alt="增加元素示例" description="通过增加「分割线」来拉开层次。" src="https://gw.alipayobjects.com/zos/rmsportal/XNFCsupiYDBTJFQkmOmv.png">
</ImagePreview>

在这三种规格不适用的情况下，可以通过加减「基础间距」的倍数，或者增加元素来拉开信息层次。

> 注：在 Ant Design 中，`y = 8 + 8 * n`。其中，`n >= 0`，y 是纵向间距，8 是「基础间距」。

---

## 横向间距关系

<ImagePreview>
  <img class="preview-img" alt="组合排布示例" src="https://gw.alipayobjects.com/zos/rmsportal/uYvsqAUXNaqURGIhZhxz.png">
</ImagePreview>

为了适用不同尺寸的屏幕，在横向采用栅格布局来排布组件，从而保证布局的灵活性。

<br>

<ImagePreview>
  <img class="preview-img" alt="复选框内示例" src="https://gw.alipayobjects.com/zos/rmsportal/ysXfdKqmdDRAimBiKVGS.png">
</ImagePreview>

在一个组件内部，元素的横向间距也应该有所不同。
