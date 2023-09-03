---
title: 主题拓展
date: 2023-09-03
author: zombieJ
---

Ant Design v5 提供了 Design Token 模型，支持自定义算法实现主题拓展能力。例如 紧凑主题 本身并不携带颜色样式算法，所以可以通过传入多个算法的方式实现 亮色主题下的紧凑主题 以及 暗色主题下的紧凑主题。

而今天，我们现在放下算法部分。讲讲如何通过 ConfigProvider 来拓展主题。

## 一个例子

这是我通过 ConfigProvider 来拓展主题的示例，你可以直接在[这里](https://github.com/zombieJ/antd-geek-theme-sample)查看完整的代码（[在线演示](https://zombiej.github.io/antd-geek-theme-sample/demos/theme)）：

![Geek Theme](https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*i3kvR6-tozgAAAAAAAAAAAAADrJ8AQ/original)

以下会聊聊在 Ant Design 中如何使用 ConfigProvider 拓展主题。当然这篇文章并不是 CSS 的教程，所以不会去介绍上面的样式实现。如果有兴趣可以直接看看上面的代码地址。

## Token 之痛

Design Token 提供了非常强大的拓展能力，但是同样它也有限制。例如当 Token 并没有支持某些配置时，开发者就变得无能为力了。更有甚者，某些主题实现不能单纯依赖某种 Token 就会变得十分困难。例如在上面例子中的各种渐变边框色不能简单的通过 `border-color` 来实现，它需要一些 CSS 小技巧。而如[《快乐工作主题》](/docs/blog/happy-work)我们提到，将一些具体实现落地到 Design Token 会使得代码质量迅速劣化。因而我们需要一些其他的方式来拓展主题，可以统一的修改某个组件的样式。而 ConfigProvider 就是这样的一个入口。

## ConfigProvider

在 `5.7.0` 中，ConfigProvider 支持了所有组件的 `className` 和 `style` 配置。因此我们可以很容易进行 Token 之外的拓展：

```tsx
<ConfigProvider
  button={{ className: 'my-button' }}
  checkbox={{ className: 'my-checkbox' }}
  divider={{ className: 'my-divider' }}
/>
```

接着我们就可以去添加我们的样式了：

```less
.my-button {
  background: red;
}
```

你会发现，这其实奇怪。既然我们可以通过 `className` 来修改样式，那么为什么还需要 ConfigProvider 呢？我们覆盖 `.ant-btn` 样式不就行了。

如果你的项目只由你一个人来维护，这是个不错的主意。但是如果你的项目是一个大型项目，那么你就会发现这样的做法会导致样式冲突。尤其在多人协作的情况下，随意修改样式会出现非预期的结果，而其他人为了覆盖你的样式不得不使用更加复杂的选择器。而 ConfigProvider 则可以很好的解决这个问题，它可以将样式隔离在 ConfigProvider 内部，不会影响到其他组件。

## 主题拓展

上面的示例看起来实现很容易，但是真实场景下你会发现对于层级结构而言不免也有一些不足。比如说 `ant-` 前缀可以通过 ConfigProvider 的 `prefixCls` 修改，所以语义化结构的前缀可能从 `ant-btn-icon` 变成 `abc-btn-icon`。那么仅通过 `my-button` 是不足以实现覆盖的：

```less
.my-button {
  // OPS. It's `abc-btn-icon` now.
  .ant-btn-icon {
    background: red;
  }
}
```

所以我们的拓展主题也同样需要能够消费 `prefixCls` 的能力。而在 CSS-in-JS 中，混合 `prefixCls` 是很容易的事情。我们可以通过 ConfigProvider 的 `getPrefixCls` 方法来获取 `prefixCls`，然后进行混合：

```tsx
// This is an example of using `antd-style`, you can use any CSS-in-JS library.
import React from 'react';
import { ConfigProvider } from 'antd';
import { createStyles } from 'antd-style';

const useButtonStyle = () => {
  const { getPrefixCls } = React.useContext(ConfigProvider.ConfigContext);
  const btnPrefixCls = getPrefixCls('btn');

  // Customize styles
  return createStyles(({ css }) => ({
    btn: css`
      background: red;
      .${btnPrefixCls}-icon {
        color: green;
      }
    `,
  }))();
};

function GeekProvider(props: { children?: React.ReactNode }) {
  const { styles } = useButtonStyle();

  return <ConfigProvider button={{ className: styles.btn }}>{props.children}</ConfigProvider>;
}
```

<img alt="Red Button" height="40" src="https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*PvYITqIk2_8AAAAAAAAAAAAADrJ8AQ/original" />

对需要继承 `className` 的场景，拓展也很容易：

```tsx
function GeekProvider(props: { children?: React.ReactNode }) {
  const { button } = React.useContext(ConfigProvider.ConfigContext);
  const { styles } = useButtonStyle();

  return (
    <ConfigProvider button={{ className: classNames(button?.className, styles.btn) }}>
      {props.children}
    </ConfigProvider>
  );
}
```

## 总结

通过 ConfigProvider 可以进一步拓展主题，它可以很好的隔离样式，避免样式冲突。赶快动手试试吧！
