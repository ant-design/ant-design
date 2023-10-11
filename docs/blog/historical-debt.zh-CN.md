---
title: API 的历史债务
date: 2023-10-11
author: zombieJ
---

在升级 Ant Design 的过程中，你或许收到过这种警告：

```text
Warning: [antd: XXX] `old prop` is deprecated. Please use `new prop` instead.
```

这是因为 antd 在开发过程中，有一些 API 设计的不合理导致的历史债务。举个例子，在 antd v3 及以前，TreeSelect 的代码是从 Select 中直接复制出来并在此基础上做的拓展。他们的搜索样式存在差异：

<img alt="Select" height="162" src="https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*uDbxSKTLU8YAAAAAAAAAAAAADrJ8AQ/original" />

<img alt="TreeSelect" height="316" src="https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*ggTeQqbnFVkAAAAAAAAAAAAADrJ8AQ/original" />

而后的维护过程中，开发者希望可以受控控制搜索框的内容。而不巧的是，这个需求是不同的机缘巧合被提出并由不同的开发者贡献了代码。于是两者添加了不同的属性，一个叫做 `inputValue` 而另一个叫做 `searchValue`：

```tsx
// Select 在 combobox 模式下，搜索框就是输入框，`inputValue` 看起来很合理
<Select inputValue="search" />

// TreeSelect 的搜索框在弹出层，`searchValue` 也很合理
<TreeSelect searchValue="search" />
```

在多选模式下，类 Select 组件在选择内容后会清除搜索框内容。但是有些场景下，开发者希望能够保留。因而 TreeSelect 和 Select 又添加了 `autoClearSearchValue` 属性。

等等，Select 明明叫 `inputValue`，为什么要叫 `autoClearSearchValue`？明显应该叫做 `autoClearInputValue` 呐。如果我们在现有的 API 上继续生长其他的同类 API 风格。你会发现组件的 prop 变得越来越分裂。这也会导致代码维护出现坏味道。例如上面这个例子，在之后我们对类 Select 组件抽成了统一的 UI 层并将其合并到 `rc-select` 组件中。`rc-tree-select` 只需要实现弹出层的内容，而输入框的结构和样式可以和 Select 完全复用。但是由于两者的 API 不一致，导致我们需要额外的处理，所以我们在迭代过程中需要对这些 API 债务进行重构并将其统一起来。（在 v4 中，我们将其合并为了 `searchValue` 并且对设计也进行了统一）

然而世上没有银弹，我们无法在一开始就设计出完美的 API。有一些 API 在设计之初显得非常合理，而随着迭代又会发现或多或少不合时宜。比如说弹出层早期起名为 dropdown，这对应了 Dropdown 以及类 Select 组件的弹出内容。但是对于 Tooltip 而言，dropdown 显然是不适合的。从统一的角度看，popup 会更适合。

### 废弃警告

在维护过程中，我们逐渐统一了 API 命名规范（[API Naming rules](https://github.com/ant-design/ant-design/wiki/API-Naming-rules)）。在添加新的 feature 时，优先从现存的 API 中寻找接近。对于现存的 API，逐步添加废弃警告。为了保持兼容，我们的策略是每个版本提供的废弃警告会继续兼容一个大版本，而在下下个大版本中移除它。例如在 v4 中添加了废弃警告，那么在 v5 中仍然可以使用，但是在 v6 中将会被移除。以此确保开发者有足够的时间进行迁移。

但是从开发者角度看，这也并不合理。开发者本身只是对 antd 进行了升级，却要因为组件库 API 设计的失误而遭受 console 的侵扰。如果在废弃警告中混入几个使用警告，开发者往往很难发现它们。这种情况在大版本升级中尤为显著，业务可能并没有给你足够的时间去做升级迁移，因而不得不使用兼容包以及其他的一些技术手段让它先跑起来。而对于冗长的废弃警告，开发者不得不选择暂时（或者永远）无视它们。针对这种情况，使用警告会更为重要，因而我们提出了 [Warning Filter RFC](https://github.com/ant-design/ant-design/discussions/44551)。

#### 警告过滤

通过 ConfigProvider 的 `warning` 属性，可以将废弃信息进行聚合：

```tsx
<ConfigProvider warning={{ strict: false }} />
```

聚合后，原本打平的废弃信息会合并为一个数组在 console 中展示。而对于使用警告则不会影响：

![Merged Message](https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*MG-rQ4NSbbcAAAAAAAAAAAAADrJ8AQ/original)

### 拓展问题

如上所述，API 设计不存在银弹。为了防止 breaking change，我们一般不会改动现有的 API 实现。但是对于一些约定的内容，这就会造成麻烦。比如说 `ref` 组件是很典型的约定，只要是 React 的开发者就能明白，通过 `ref` 可以获取 DOM 节点以及做一些诸如 `focus` 的基本操作。但是对于复合组件而言，调用方法和 DOM 不一定能够统一。比如说 Table 组件的 `ref` 显然应该是最外层的 div，但是对于 `scrollTo` 方法则应该对应到滚动容器上（如果是 VirtualTable 则应该交由内部的 `rc-virtual-list` 进行处理）。在 antd mobile 中 `ref` 被设计为复合结构，DOM 节点总是通过 `nativeElement` 返回：

```tsx
export interface SampleRef {
  nativeElement: HTMLElement;
  focus(): void;
  blur(): void;
}
```

而在 antd 中，由于我们早期没有对 `ref` 进行约定，导致在实现方法是就遇到了难题。不过好在有 Proxy 支持，我们可以通过 Proxy 对 `ref` 进行拦截并返回我们想要的结果：

```tsx
useImperativeHandle(
  ref,
  () =>
    new Proxy(divRef.current, {
      get(target, key) {
        // ...
      },
    }),
);
```

通过这种方式，我们可以继续兼容之前的使用。它仍然是一个 DOM 节点，但是同样也支持了 SampleRef 的定义调用。

## 总结

API 设计是个难题，随着技术栈以及组件本身的迭代。一些设计会逐渐腐朽，而 API 升级本身对于开发者也是痛苦的。我们希望通过这篇文章，让开发者能够理解我们的设计思路以及在升级过程中的一些问题。如果你有任何的建议或者想法，欢迎在 Github 中讨论。
