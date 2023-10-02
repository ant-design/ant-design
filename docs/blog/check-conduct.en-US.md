---
title: Tree's check conduction
date: 2022-12-14
author: zombieJ
---

In the Tree or similar components (such as TreeSelect, Cascader), needs check function. It's unambiguous most of the time, but when a `disabled` node appears somewhere in the middle, it's worth talking about. This article will introduce the logic of check conduction in antd. It should be noted that in different scenarios, there will be various requirements, and antd has chosen the most commonly used check conduction logic. If you need a different custom style, you can implement it yourself through `checkStrictly`.

## Some conduction strategies

Before we start, let's establish a consensus. That is, when a node is `disabled`, it cannot be clicked `checked`. Then we take the following Tree structure as an example:

<img alt="Tree" height="300" src="https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*eMq8S7Pq0lQAAAAAAAAAAAAADrJ8AQ/original" />

Next, we check the root node `parent 1`, and analyze the similarities and differences of different check transmission strategies.

### All nodes will be checked

This is the most intuitive strategy, all nodes will be checked:

<img alt="Tree" height="300" src="https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*QQp-R4EMteAAAAAAAAAAAAAADrJ8AQ/original" />

You can immediately see the problem with this strategy, we mentioned earlier that `disabled` nodes are not allowed to be `checked`. But when the parent node is not `disabled`, its child nodes will be forcibly checked. This will cause the `disabled` node to "can" be checked, which is obviously unreasonable.

### All checkable nodes are checked

<img alt="Tree" height="300" src="https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*BzrZRbT1gCEAAAAAAAAAAAAADrJ8AQ/original" />

From the checkbox interaction, it looks good, but it's not intuitive. After `parent 1` is checked, `leaf 2` is checked by conduction. But the middle node `parent 1-0` is not checked. At some deep enough level, this strategy can cause the user to be unaware that a check has been propagated:

<img alt="Tree" height="300" src="https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*3mHLQZvTgWsAAAAAAAAAAAAADrJ8AQ/original" />

When there is no scrolling, the user can't realize that the upper `disabled` is not checked, but the top is checked:

<img alt="Tree" height="300" src="https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*xTqPQbdX6B0AAAAAAAAAAAAADrJ8AQ/original" />

### Check only reachable checkable nodes

This is also the current strategy of antd, when a node is checked, it will propagate upwards and downwards from the node until `disabled` stops. When there are multiple `disabled` in the node, they will each check the status management:

<img alt="Tree" height="300" src="https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*EIK0Rbq92CMAAAAAAAAAAAAADrJ8AQ/original" />

Conversely check `leaf 2`, it will not conduct:

<img alt="Tree" height="300" src="https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*Ytr9SrJUvD4AAAAAAAAAAAAADrJ8AQ/original" />

The advantage of this strategy is that users can clearly see the selection process. Compared with the previous strategy, users only need a small area to understand the check logic in the scrolling scene.

## Some implementation details

Note: We only introduce simple conduction logic here. Please refer to [actual code](https://github.com/react-component/tree/blob/62e0bf0b91d86b6e42fee69870ada9a4640b6c6f/src/utils/conductUtil.ts) for real world apply. Some performance optimizations will also be done, such as skipping nodes that have been traversed through the cache mechanism.

### Check conduction

When a node is checked, we will add `key` to `checkedKeys`. We iterate over each `key` in the new `checkedKeys` for conduction checks. The first step will be conduction from top to bottom (in the example below we check `0-0`):

<img alt="Tree" height="300" src="https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*30UnR60SSD8AAAAAAAAAAAAADrJ8AQ/original" />

We record the current node `0-0` and the transmitted `0-0-0` and `0-0-1`:

<img alt="Tree" height="300" src="https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*jo7wQZVX9S0AAAAAAAAAAAAADrJ8AQ/original" />

In the second step, we will conduct upwards from this node:

<img alt="Tree" height="300" src="https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*k5hoSKM1OMYAAAAAAAAAAAAADrJ8AQ/original" />

Similarly, record the node `0` that was passed on:

<img alt="Tree" height="300" src="https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*yqBETbq8ugQAAAAAAAAAAAAADrJ8AQ/original" />

When the parent node is checked, the parent node of the parent node may also be checked, so we need to continue to conduct upward until the root node or `disabled` node.

### Uncheck conduction

Same as above, we will perform conduction traversal up and down, and then remove the conduction node from `checkedKeys`. Therefore no further repetition.

## Finally

Before the early days of v3, we encountered that the `disabled` check of Tree has different appeals in different scenarios (and each of them is "reasonable" when viewing fragmented appeals), and when it is extracted for inspection, We found that these fragmented demands can conflict with each other. Therefore, we sorted out its transmission logic and chose the most intuitive strategy. Of course, if the current implementation does not meet the requirements, you can implement it yourself through `checkStrictly`.
