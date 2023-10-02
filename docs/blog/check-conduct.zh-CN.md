---
title: Tree 的勾选传导
date: 2022-12-14
author: zombieJ
---

在 Tree 组件以及类似的组件（如 TreeSelect、Cascader），都会需要勾选功能。在大部分情况下它都没有歧义，但是当中间的某个节点出现 `disabled` 节点时，这就值得讨论了。这篇文章会介绍 antd 中，勾选传导的逻辑。需要注意的是，在不同的场景下，会有各种不同的需求，antd 选择了其中最常用的一种勾选传导逻辑。如果你需要不同的定制款，可以通过 `checkStrictly` 来自行实现。

## 一些传导策略

在开始之前，我们先确定一个共识。那就是当一个节点被 `disabled` 后，它是不能被点击 `checked` 的。接着我们以如下 Tree 结构做示例：

<img alt="Tree" height="300" src="https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*eMq8S7Pq0lQAAAAAAAAAAAAADrJ8AQ/original" />

接下来我们勾选根节点 `parent 1`，并分析一下不同的勾选传导策略的异同。

### 所有的节点都会被勾选

这是最直观的一种策略，所有的节点都会被勾选：

<img alt="Tree" height="300" src="https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*QQp-R4EMteAAAAAAAAAAAAAADrJ8AQ/original" />

你立刻就会发现这种策略的问题所在，我们前面提到过 `disabled` 节点不允许被 `checked`。但是当父节点不是 `disabled` 时，它的子节点会被强制勾选。这样就会导致 `disabled` 节点“可以”被勾选，显然不合理。

### 所有的可勾选节点都被勾选

<img alt="Tree" height="300" src="https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*BzrZRbT1gCEAAAAAAAAAAAAADrJ8AQ/original" />

从勾选交互看，它看起来不错，但是并不符合直觉。`parent 1` 勾选后，`leaf 2` 被传导勾选。但是其中间节点 `parent 1-0` 却没有勾选。在一些足够深的层级下，这种策略会导致用户并不知道勾选被传导出去了：

<img alt="Tree" height="300" src="https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*3mHLQZvTgWsAAAAAAAAAAAAADrJ8AQ/original" />

没有滚动时，用户并不能意识到上层 `disabled` 都没有被勾选时，而最上面被勾选了：

<img alt="Tree" height="300" src="https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*xTqPQbdX6B0AAAAAAAAAAAAADrJ8AQ/original" />

### 只勾选可触达的可勾选节点

这也是 antd 现在的策略，当节点被勾选时，它会从节点起向上向下传导，直到 `disabled` 停止。节点中存在多个 `disabled` 时会各自进行勾选状态管理：

<img alt="Tree" height="300" src="https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*EIK0Rbq92CMAAAAAAAAAAAAADrJ8AQ/original" />

反过来勾选 `leaf 2`，也不会传导：

<img alt="Tree" height="300" src="https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*Ytr9SrJUvD4AAAAAAAAAAAAADrJ8AQ/original" />

这种策略的好处是，用户可以清晰的看到勾选的传导过程。相对于上一个策略，在滚动场景用户只需要很小的区域就能理解勾选逻辑。

## 一些实现细节

注：我们此处只做简单的传导逻辑介绍，具体应用请参考 [实际代码](https://github.com/react-component/tree/blob/62e0bf0b91d86b6e42fee69870ada9a4640b6c6f/src/utils/conductUtil.ts)。其中还会做一些性能优化，比如通过缓存机制跳过已经被遍历过的节点。

### 勾选传导

当勾选节点后，我们会将 `key` 加入到 `checkedKeys` 中。我们会遍历新的 `checkedKeys` 中的每个 `key` 进行传导检查。第一步会自上而下进行传导（下图示例我们勾选 `0-0`）：

<img alt="Tree" height="300" src="https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*30UnR60SSD8AAAAAAAAAAAAADrJ8AQ/original" />

我们将当前节点 `0-0` 和被传导的 `0-0-0`与 `0-0-1` 记录下来：

<img alt="Tree" height="300" src="https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*jo7wQZVX9S0AAAAAAAAAAAAADrJ8AQ/original" />

第二步，我们会从该节点向上传导：

<img alt="Tree" height="300" src="https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*k5hoSKM1OMYAAAAAAAAAAAAADrJ8AQ/original" />

同样的，将被传导的节点 `0` 记录下来：

<img alt="Tree" height="300" src="https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*yqBETbq8ugQAAAAAAAAAAAAADrJ8AQ/original" />

当父节点被传导勾选时，该父节点的父节点勾选也可能会被传导，所以我们需要继续向上传导，直到 根节点 或者 `disabled` 节点为止。

### 取消勾选传导

同上，我们一样会向上、向下进行传导遍历，然后将传导的节点从 `checkedKeys` 中移除。因此不再复述。

## 最后

在 v3 早期以前，我们遇到关于 Tree 的 `disabled` 勾选在不同的场景会有不同的诉求（而在零散的查看诉求时每个都“很合理”），而当抽离出来检视时，我们发现这些零散的诉求又会相互冲突。因而我们对其传导逻辑进行了一次整理，选择了最直观的一种策略。当然，如果当前的实现不满足需求时，你可以通过 `checkStrictly` 自行实现。
