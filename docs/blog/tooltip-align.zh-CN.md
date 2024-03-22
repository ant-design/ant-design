---
title: 新的 Tooltip 对齐方式
date: 2023-02-15
author: zombieJ
---

在 `5.3.0` 版本中，我们将会更新 Tooltip 组件的底层依赖 `@rc-component/trigger` 使其更好的实现自适应对齐逻辑。在此之前，我们先聊聊此前版本遇到的一些问题。

### 滚动问题

Tooltip 默认添加至 `body` 上，在全屏滚动时它会随着一起滚动。但是当 Tooltip 的目标元素放置在滚动容器中，则因为滚动容器不同而出现不会跟随滚动的情况：

[<img height="300" src="https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*IkOIQK69T5gAAAAAAAAAAAAADrJ8AQ/original" />](https://codesandbox.io/s/ji-ben-antd-5-2-0-forked-mo31wr?file=/demo.tsx)

我们集中在 FAQ 提供了 `getPopupContainer` 的方式，让开发者将弹出元素通过该方法插入到目标元素的父级容器中，从而解决这个问题。但是这个方案并不完美，因为它需要开发者自己去判断目标元素的父级容器中哪个是滚动容器。在多层封装的组件中，可能使用 Tooltip 的组件与其滚动的组件并不是同一个，这使得设置目标滚动容器并不容易。

### 贴边问题

Tooltip 支持在滚动范围内贴边展示。但是由于弹出层是整体，使得居中的箭头在偏移后无法指向目标位置：

[<img height="160" src="https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*E3RmTZG3vhQAAAAAAAAAAAAADrJ8AQ/original" />](https://codesandbox.io/s/ji-ben-antd-5-2-0-forked-z6frnr?file=/demo.tsx)

我们会推荐使用 `placement` 属性，配置 `topLeft` 让弹出层靠左对齐来解决这个问题：

<img height="160" src="https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*cm4VT5xwBbAAAAAAAAAAAAAADrJ8AQ/original" />

同样的，如果是复用组件。可能它并不是总是需要贴边展示，当一个元素在中间展示时弹出层确实左/右对齐就会显得非常奇怪。

### 缩放问题

Tooltip 对齐底层使用 `dom-align` 库，它会直接为 DOM 节点添加 `left` | `top` | `transform` 样式来实现对齐，因而为了使其支持 React 生命周期，我们在此之上封装了 `rc-align` 组件。此外，它只关注对齐实现，本身不关注触发时机。所以 `rc-align` 组件还会额外添加 ResizeObserver 监听尺寸变化，继而调用 `dom-align` 进行对齐。

`dom-align` 通过遍历父层节点累加计算出目标元素和弹出层各自的坐标位置，接着根据对齐规则计算差值。当父层节点有 `transform` 样式时，会导致计算出的坐标位置不准确，从而导致对齐不正确：

[<img height="200" src="https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*CVysTIq-y6UAAAAAAAAAAAAADrJ8AQ/original" />](https://codesandbox.io/s/ji-ben-antd-5-2-0-forked-znqgc6?file=/demo.tsx)

## 新的对齐方式

以上问题如滚动、贴边可以使用一些方式规避，而缩放问题则无法解决。我们希望这些问题可以由 antd 底层来解，而不是由开发者自己去处理。为此，我们重写了 `@rc-component/trigger` 组件，将对齐逻辑和箭头逻辑整合在一起。不再依赖 `rc-align` 以及 `dom-align`。同时使用新的计算方式避免 `transform` 样式导致的计算问题。

### 位置计算

考虑到弹出元素父层节点存在各种 `position` 的情况，递归查找父元素节点计算相对位置并不划算。我们只需要根据两者最终位置做偏移计算，再应用弹出层最终的缩放比例即可：

1. 生成 Popup 元素
2. 添加 Popup 样式 `left: 0` & `top: 0`，将其强制对齐到左上角
   - Popup 元素父容器中 `position` 可能存在 `fixed`、`relative`、`absolute`节点，这都不影响我们计算偏移量。只要保证在 `0/0` 位置做偏移即可
3. 通过 `getBoundingClientRect` 获取目标元素和 Popup 元素的位置信息
4. 计算偏移差值

<img alt="Popup Align" height="300" src="https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*mF3RQZF1w7sAAAAAAAAAAAAADrJ8AQ/original" />

### 缩放比

缩放比例无法直接获取，但是我们可以通过 `getBoundingClientRect` 与 `offsetWidth`/`offsetHeight` 计算出缩放比例：

```tsx
const popupRect = popupEle.getBoundingClientRect();
const { offsetWidth, offsetHeight } = popupEle;

const scaleX = popupRect.width / offsetWidth;
const scaleY = popupRect.height / offsetHeight;
```

接着将缩放比例应用到计算出来的偏移值即可：

```tsx
// Some logic for align offset calculation
// const baseOffsetX = ...
// const baseOffsetY = ...

const scaledOffsetX = baseOffsetX / scaleX;
const scaledOffsetY = baseOffsetY / scaleY;
```

### 箭头优化

在过去版本中，箭头由 `rc-tooltip` 添加而非 `rc-trigger` 管理。这使得 `rc-tooltip` 封装时已经丢失了对齐信息，以至于无法在 Popup 偏移时正确的调整箭头位置。为此，我们将箭头逻辑也整合到 `rc-trigger` 中，使得箭头的位置可以随着 Popup 的偏移而偏移。合并之后，箭头位置计算变得十分简单。我们只要取目标元素和 Popup 边界值最小值，再取中间值即可：

#### 居中定位

<img alt="center" height="200" src="https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*D3bFRJFAYWwAAAAAAAAAAAAADrJ8AQ/original" />

#### 贴边定位

<img alt="center" height="200" src="https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*oe8SQ6d8GVgAAAAAAAAAAAAADrJ8AQ/original" />

### 显示区域计算

新的监听模式会在启动 Tooltip 时检测 Popup 父节点 `overflow` 样式，当存在 `scroll`、`hidden`、`auto` 时，叠加除滚动条外的可见区域，从而计算出最终的显示区域：

<img alt="VisibleRegion" height="300" src="https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*a4rnSY0KJGEAAAAAAAAAAAAADrJ8AQ/original" />

同样的，我们需要监听其滚动事件。任意父层节点滚动时，都需要重新计算显示区域：

```tsx
function collectScroll(ele: HTMLElement) {
  const scrollList: HTMLElement[] = [];
  let current = ele?.parentElement;

  while (current) {
    if (isScrollContainer(current)) {
      scrollList.push(ele);
    }

    current = current.parentElement;
  }

  return scrollList;
}

const targetScrollList = collectScroll(targetEle);
const popupScrollList = collectScroll(popupEle);

// We merge the list in real world. Here just for sample
[window, ...targetScrollList, ...popupScrollList].forEach((ele) => {
  ele.addEventListener(...);
});
```

最终，就得到了可以自适应滚动的效果：

<img alt="scroll" height="300" src="https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*sxaTTJjLtIMAAAAAAAAAAAAADrJ8AQ/original" />

## 总结

在完成 Tooltip 改造后，我们还会继续改造其他使用到弹出层的组件。希望在此之后，开发者可以尽可能不需要再关注 `getPopupContainer` 的配置，而是可以直接使用组件。祝你开发愉快！
