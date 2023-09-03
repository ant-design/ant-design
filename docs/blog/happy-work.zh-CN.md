---
title: 快乐工作主题（一）
date: 2023-08-04
author: zombieJ
---

在 v5 发布会上，我们的设计师团队提过将会提供快乐工作的主题。这部分工作仍然在循序渐进的进行中，但是我们已经有了一些进展，想在这里和大家分享。

## 太长不看

你可以直接使用 `@ant-design/happy-work-theme` 来切换主题特效（或者继续阅读看看我们做了什么）：

```tsx
import { HappyProvider } from '@ant-design/happy-work-theme';

export default () => (
  <HappyProvider>
    <Button />
  </HappyProvider>
);
```

![Happy Work Theme](https://github.com/react-component/picker/assets/5378891/3c54ef05-5448-4619-b492-b5328c032c52)

## 定制水波纹

Ant Design 中，一个比较有特色的设计交互就是在一些组件上的点击波纹效果。你可以在各个地方看到它们：

- <img alt="Button" height="110" src="https://github.com/react-component/picker/assets/5378891/60aaad50-cfd5-4c1f-b91f-0be217877f3f" />
- <img alt="Checkbox" height="70" src="https://github.com/react-component/picker/assets/5378891/f7d64d64-29db-4c9c-a0d6-de8b36a31d48" />
- <img alt="Radio" height="70" src="https://github.com/react-component/picker/assets/5378891/9f4edaa8-26f7-468c-bcf3-1ce80163bf0e" />
- <img alt="Switch" height="84" src="https://github.com/react-component/picker/assets/5378891/16abcee6-32d0-4075-bc4c-440d8aade067" />

在过去数个大版本中，这个水波纹特效都无法修改。如果要关闭它，开发者甚至需要做一些“黑魔法”才能实现。所以当设计师提出一个快乐的主题能力时，作为开发者我们觉得这是个好时机来做一些改造了。

### Wave 组件

水波纹实际上是一个 Wave 组件，它会监听子组件的点击事件。然后添加一个 `box-shadow` 动效产生水波纹：

```tsx
// Sample code.
const Button = (
  <Wave>
    <button />
  </Wave>
);
```

在最初的设计中（[#40111](https://github.com/ant-design/ant-design/pull/40111)），我们希望水波纹定制能力属于 Design Token 的一部分。但是这样的话，Design Token 就会变得有些过于复杂，从原本的纯 `string | number` 类型变成了 `string | number | Function<T>`。从 API 设计角度看，`Function<T>` 也有坏味道，未来如果有新的定制需求，Function 的类型会变得愈发发散。所以 [#40111](https://github.com/ant-design/ant-design/pull/40111) 永远停留在 Draft 版本。

### ConfigProvider

接着，我们选择将其放在 ConfigProvider 中。ConfigProvider 是一个全局的配置组件，它可以影响到所有的子组件。其 API 也已经囊括了大量组件的配置能力，所以我们只需要添加一个 `wave` 属性即可：

```tsx
<ConfigProvider wave={{ showEffect }}>
  <Button />
</ConfigProvider>
```

![Customize Wave Effect](https://github.com/react-component/picker/assets/5378891/425094d8-8767-4a53-85fb-5b13b888f2c4)

点击 [查看 ConfigProvider 示例](/components/config-provider#config-provider-demo-wave)。

`showEffect` 方法会告知当前需要产生特效的 DOM 节点，这个节点已经经过封装总会对应到正确的元素上（例如 Button 是其本身，而 Radio 会从 `label` 中找到 Radio 圆框的节点）。并且告知你它是哪个组件以及当前节点所属的 Design Token：

```tsx
type ShowEffect = (target: HTMLElement, info: { component: string; token: GlobalToken }) => void;
```

通过 Design Token，你可以实现符合当前主题的特效。例如在文章开头的 GIF 中，当主题色变换时我们可以获取当前的主题色并添加对应的特效。

## 最后

快乐工作主题的工作仍然在进行中，我们会在后续的版本中逐步添加更多的能力。当前 `@ant-design/happy-work-theme` 提供的 HappyProvider 通过 ConfigProvider 实现了水波纹特效的替换，我们计划开发者未来无需做额外的改造，就能通过 HappyProvider 随着版本迭代而逐步添加更多的“快乐”。敬请期待。
