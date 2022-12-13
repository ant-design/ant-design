---
title: 组件级别的 CSS-in-JS
date: 2022-11-25
author: MadCcc
---

在 2022 年 11 月 18 日，我们发布了 Ant Design 5.0 的正式版本，同时带入大家视野中的还有 Ant Design 独特的 CSS-in-JS 方案。通过这个方案，Ant Design 获得了相较于其他 CSS-in-JS 库更高的性能，但代价则是牺牲了其在应用中自由使用的灵活性。所以我们把它称为“组件级”的 CSS-in-JS 方案。

## CSS-in-JS 的困境

在 CSS-in-JS 中，hash 会用于确认一段 style 是否已经插入。而计算 hash 的方法通常是将一段完整的 css 转换为 hash 值。比如在 emotion 中，我们检查页面中的元素就可以看到这样的 style 标签，这样的 style 标签对应的 hash 值每一段都是不一样的：

![image.png](https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*X5tDQ5VIpcoAAAAAAAAAAAAADrJ8AQ/original)

如此便可以引入一个 CSS-in-JS 被诟病已久的问题：我们在编写代码时写的并不是最终的 css，所以每次都需要重新序列化得到 css 后再次计算 hash，这就在每次渲染组件时带来了额外的开销。如果你的页面或者组件带有非常复杂或者大量的 CSS-in-JS 代码，甚至样式会跟随组件的 props 变化，那么这个性能消耗便变得不可忽视。<br />针对这个问题，各个 CSS-in-JS 库会有自己的应对方式，这里就先不做赘述，让我们来看一看 Ant Design 的方案。

## 计算 hash

其实我们不难发现，问题其实在于序列化 css 的过程。如果通过缓存的方法去减少序列化 css 的次数呢？对于应用级的 CSS-in-JS 来说，我们很难去找到一个很合适的 key 去确认缓存。但是如果是组件库的话，最终得到的样式则是比较稳定的。根据我们从 v4 及之前版本确定下来的样式结构，每一个组件的样式在相同的主题变量和相同的版本下是不会改变的。反过来说，只有修改了主题变量，或者改变了 antd 的版本，样式才可能会变化。由此我们得到了一个非常简单的计算 hash 的方法：

![image.png](https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*XuVYRJ_27Q0AAAAAAAAAAAAADrJ8AQ/original)

我们会对所有的 antd 组件应用**相同的** **hash**。如此一来，使用 antd 组件时，我们只会对当前的版本和主题变量进行 hash 计算，而前者可以直接由 `package.json`中得到，后者可以直接从 context 中得到，所以我们并不需要进行繁重的序列化 css 的操作，就可以得到稳定的 hash，从而大幅地减少性能消耗。

## 组件缓存

通过上述的方式，我们迈出了『组件级』CSS-in-JS 的第一步，但是这还不够。既然是『组件级』，那我们也可以针对组件再次进行优化。

在 Ant Design 中，一个组件的样式通常来说是“完整”的，也就是说不管这个组件有什么样的变体，他的样式会一并存在于组件样式中。如此我们可以再次得到一个结论：antd 组件的 props **不会**影响组件样式。这是非常重要的一点，在应用级的 CSS-in-JS 方案中，由于存在 props 影响组件样式的可能，所以不可避免地会在渲染阶段重新生成组件样式，不管如何去优化这一点仍无法忽视。既然我们采用了“组件级”的方案，那么这个问题就可以很轻松地解决：对组件做样式缓存。

![image.png](https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*yZMNSYVtxnAAAAAAAAAAAAAADrJ8AQ/original)

在 hash 相同的情况下，同一个组件无论使用了多少次、渲染了多少次，样式永远只会在第一次 mount 时生成一次，剩下的时间里都会命中缓存，这便是『组件级』CSS-in-JS 方案的第二重保险。

## Benchmark

在 Ant Design 5.0 的发布会上，我们简单地做了一次 benchmark，在这里可以做一些补充说明：

![image.png](https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*upmYSqZ5FwsAAAAAAAAAAAAADrJ8AQ/original)

这个 benchmark 的成立条件是产生一段非常长的不会变更的样式，以此来测试这三个库的基本用法的性能。可以看出在 Ant Design 的“组件级”使用场景下，无论是初次渲染还是二次渲染，antd 都拥有性能上的优势。由于 styled 在处理稳定的样式时有一定优化，所以这个 benchmark 中二次渲染的性能较好，但在有 props 参与样式计算时仍会和 emotion 一样受到重新计算的影响。

## 『组件级』的局限

在上述的对比中，其实并不能说 antd 一定优于 styled 和 emotion，而是在 antd 的组件级使用场景下，我们做了相应的优化以取得了性能上的优势。反过来说，由于『组件级』的局限性，antd 的 CSS-in-JS 方案并不能适用于日常构建应用。

由于特殊的 hash 计算方法和组件缓存，在套用 antd 的 CSS-in-JS 方案时，开发者必须自己提供稳定的 hash 和独特的组件名。对于应用来说，像 css module 这样的自动 hash 的能力反而是更为需要的，同时对应用中海量的组件进行缓存也需要额外的管理成本，一旦出错问题是很难排查的。因此我们更加推荐在组件库中使用“组件级”的 CSS-in-JS 方案。
