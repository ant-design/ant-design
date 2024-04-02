---
group:
  title: 进阶使用
order: 3
title: 使用 CSS 变量
tag: New
---

从 `5.12.0` 起，Ant Design 5.x 重新支持了 CSS 变量。与 4.x 版本不同的是，这次我们融合了 CSS-in-JS 的能力，并且将所有 Design Token 纳入了 CSS 变量的管理范畴。

> 目前 CSS 变量模式已在 Ant Design 官网上全局开启。

## 何时使用

CSS 变量模式为 Ant Design 的样式能力带来了两个重要的提升：

1. 同一组件在不同主题下的样式可以共享，减少了样式体积
2. 切换主题时不再需要重新序列化样式，提升了主题切换的性能

因此如果你的应用依赖了 Ant Design 的主题能力，那么我们强烈建议你开启 CSS 变量模式。

## 快速上手

在 ConfigProvider 的 `theme` 属性中，通过 `cssVar` 配置来开启 CSS 变量模式。这个配置会被继承，所以希望全局开启 CSS 变量模式的话，只需要在根节点的 ConfigProvider 中配置即可。

<!-- prettier-ignore -->
:::warning
CSS 变量模式需要为每一个主题设置独特的 key 来保证样式隔离，在 React 18 中我们使用了 `useId` 来生成唯一的 key，所以在 React 18 中，你可以不用关心这个问题。但是在 React 17 或者 16 中，你需要手动为每一个主题设置一个唯一的 key，否则会导致主题混乱。
:::

```tsx
// React 18
<ConfigProvider theme={{ cssVar: true }}>
  <App />
</ConfigProvider>

// React 17 or 16
<ConfigProvider theme={{ cssVar: { key: 'app' } }}>
  <App />
</ConfigProvider>
```

开启后审查元素，就可以看到 antd 组件样式中一些原本具体的数值被替换为了 CSS 变量：

![image](https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*p5NrRJmUNHgAAAAAAAAAAAAADrJ8AQ/original)

## 进阶使用

### 关闭 hash

hash 是 Ant Design 5.0 以来的特性之一，其功能是为每一份主题计算一个独特的 hash 值，并将其用在组件的 class 上，用于隔离主题样式。

但是启用了 CSS 变量之后，相同 antd 版本下的组件样式将不会随着 token 变化而改变 —— 因为我们用 CSS 变量填充了样式中的动态部分。所以如果你的应用中只存在一个版本的 antd，你可以选择关闭 hash 来进一步减小样式体积：

```tsx
<ConfigProvider theme={{ cssVar: true, hashed: false }}>
  <App />
</ConfigProvider>
```

同时我们非常推荐使用 `extractStyle` 来抽取静态样式，这样会为应用性能带来一定量的提升。

### 修改主题

在 CSS 变量模式下，修改主题的方法与之前无异，参考 [定制主题](/docs/react/customize-theme-cn)。

## API

`cssVar` 目前支持的参数：

| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| prefix | CSS 变量的前缀，默认与 ConfigProvider 上配置的 `prefixCls` 相同。 | string | `ant` | 5.12.0 |
| key | 当前主题的唯一识别 key. 在 React 18 中会默认用 `useId` 填充，小于 React 18 的版本需要手动填充。 | string | `useId` in React 18 | 5.12.0 |
