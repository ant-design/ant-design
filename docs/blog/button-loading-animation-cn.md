---
title: 一个重构引发的疑问
date: 2026-07-14
author: zombieJ
---

最近我们把 Button、Form、Slider、Upload 中重复的延迟逻辑统一到了 `useDelayState`。代码看起来清爽了一些，Button 的 Loading 动画却跳了一下。

![Button Loading 动画跳变](https://mdn.alipayobjects.com/huamei_ktaqcm/afts/file/A*BiMUQ6EGJ1IAAAAATgAAAAgAeuN6AQ)

Button 过去的代码通过 `setTimeout` 进行重置与清理，切换为 Hook 后，理论上时序并没有发生变化。但是仍然需要排查这个问题是否由 PR 引起。

## 是 Hook 吗？

Button 支持通过 `loading.delay` 延迟 Loading 状态。原先每个组件各自管理 timer，重构后则交给 `useDelayState` 统一处理：

```tsx
const [innerLoading, setInnerLoading] = useDelayState(loadingOrDelay.loading);

useLayoutEffect(() => {
  if (loadingOrDelay.delay > 0) {
    setInnerLoading(true, { ms: loadingOrDelay.delay });
  } else {
    setInnerLoading(loadingOrDelay.loading, true);
  }
}, [loadingOrDelay.delay, loadingOrDelay.loading]);
```

看起来最可疑的是状态更新时机。Loading icon 的动画依赖 Motion，如果少了一帧，起始样式就可能还没准备好。

不过把这里临时恢复成原来的调用方式后，跳动依旧存在。看来只是刚好在这个 PR 里发现了问题，和 Hook 本身没有关系。

## 多了一个 div

继续看 DOM，点击 Button 后，它的第一个子节点会多出一个空的 `div`：

```html
<button class="ant-btn">
  <div style="..." />
  <!-- Button content -->
</button>
```

Button 使用 `inline-flex` 布局，图标和文字之间则通过 `gap` 保持距离。每次点击都会创建这个额外的 `div`，可能导致强制重绘，进而使动画意外结束。

这个 `div` 来自 Wave。每次点击时，Wave 都会创建一个 holder，再将波纹渲染进去：

```tsx
const holder = document.createElement('div');
holder.style.position = 'absolute';
holder.style.left = '0px';
holder.style.top = '0px';
target.insertBefore(holder, target.firstChild);
```

但是该 `div` 是通过绝对定位，本来就脱离了正常布局，自然也不会创建新的 `gap`。临时去除 Wave 后，发现问题依旧。

## 14px 和 8px

既然不是凭空多出的 gap，那就回到 Loading icon 自己。

Loading icon 出现时会从 `width: 0` 展开。虽然此时宽度为零，但作为 Flex item，`gap` 仍然存在，所以动画开始时还需要用负 margin 抵消它：

```tsx
// start
{
  width: 0,
  marginInlineEnd: -iconGap,
}

// active
{
  width: node.scrollWidth,
  marginInlineEnd: 0,
}
```

这段的确生效了。但是从表现看，最后的宽度突变似乎来自 Motion 结束后解除 `width` 锁定。那很有可能是 `scrollWidth` 的值错误，所以我在 `onAppearActive` 中加了一些日志查看：

```diff
 const onAppearActive = (node: HTMLElement): React.CSSProperties => {
+   console.log('scrollWidth:', node.scrollWidth);
   return {
     width: node.scrollWidth,
     // ...
   };
 };
```

结果 icon 是 `14px`，`scrollWidth` 却只有 `8px`。

![scrollWidth 读取为 8px](https://mdn.alipayobjects.com/huamei_ktaqcm/afts/file/A*5lVQSLI_GZ0AAAAAQIAAAAgAeuN6AQ)

看到 console 的结果后，我又进行了断点调试。此时 `scrollWidth` 会在 `7px` 到 `8px` 之间切换，这是因为内部的 Loading 图标仍在旋转。临时去掉旋转动画后，数值稳定在 `7px`。

这就和截图对上了。Motion 使用的并不是图标稳定的自然宽度，而是旋转过程中读取到的 `7px` 到 `8px`。等 Motion 结束、内联 `width` 被移除后，容器恢复到自然宽度 `14px`。剩余约 `6px` 到 `7px` 没有动画，于是直接跳了出来。

## 破案

去掉旋转后，`7px` 这个数字很扎眼：它正好是图标自然宽度 `14px` 的一半。

```text
14 / 2 = 7
```

如果只是一次偶然的测量误差，换一个尺寸后未必还能保持这个关系。于是我把图标宽度临时改成 `22px`，此时 `scrollWidth` 也跟着变成了 `11px`。

```text
22 / 2 = 11
```

到这里，答案基本浮出来了。Loading icon 外层是一个 Flex 容器，在动画开始时宽度被锁定为 `0`，内部图标又通过 `justify-content: center` 水平居中。于是图标以这个零宽度的中心点为界，向左右各溢出一半。在这个布局下，`scrollWidth` 最终只读到了右侧的一半：`14px` 对应 `7px`，`22px` 对应 `11px`。旋转动画则让边界产生了小数和取整，也就有了之前 `7px` 到 `8px` 的变化。

回看引入这段样式的 [#58584](https://github.com/ant-design/ant-design/pull/58584)，它要解决的是 Button icon 在 Card extra 中的垂直对齐问题。换句话说，这里只需要上下居中，并不需要左右居中。

既然根因已经明确，直接去掉水平居中即可：

```diff
[`${componentCls}-icon`]: {
  display: 'inline-flex',
  alignItems: 'center',
- justifyContent: 'center',
},
```

这样 Loading icon 和普通 icon 重新使用相同的布局逻辑，`scrollWidth` 也恢复到了完整宽度，最后的跳动自然消失了。

## 最后

这次排查里，Hook 和额外的 DOM 都是很合理的怀疑对象，但是它们始终无法解释 Performance 截图中 icon 尺寸的变化。直到 `14px` 与 `7px`、`22px` 与 `11px` 两组数字出现，线索才真正落到了零宽度下的水平居中。

遇到动画跳动时，除了看状态和 DOM，也可以直接读一下动画的起点、终点以及元素最终的自然尺寸。只要这几个值对不上，再平滑的 transition 也会在结束时露出破绽。

这项修复会随下一个 minor 版本一同发布。

以上。
