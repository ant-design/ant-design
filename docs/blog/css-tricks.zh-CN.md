---
title: v6 的一些 CSS 琐事
date: 2025-05-23
author: zombieJ
---

Ant Design v6 的开发过程中，由于不需要再考虑 IE 的兼容问题，我们对部分组件改造使用了 CSS 变量获得了更小的 CSS 体积以及更好的性能。今天我们来聊聊 CSS 变量的一些小事。

## 变体

在 v5 中一些组件支持 `variant` 属性来实现不同的样式，Button 组件就是一个典型例子：

![Variant Button](https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*ApyYQpXQQfgAAAAAAAAAAAAADgCCAQ/original)

(配合 `color` 实现了不同的按钮组合)

在 v5 中，Button 的变体与颜色组合会创建一套重复的排列组合样式：

```css
/* Sample code. Not used in real world. */
.ant-btn-solid.ant-btn-red {
  color: #fff;
  background: 1px solid red;
}

.ant-btn-solid.ant-btn-blue {
  color: #fff;
  background: 1px solid blue;
}

.ant-btn-outlined.ant-btn-red {
  color: #fff;
  border: 1px solid red;
}

.ant-btn-outlined.ant-btn-blue {
  color: #fff;
  border: 1px solid blue;
}

/* ... */
```

转换成 CSS 变量后，逻辑就会从样式转成对色板的控制。因而在定义完一套基础色板后，就可以通过变量简单的量产样式：

```css
/* Sample code. Not used in real world. */
/* Template Part */
.ant-btn {
  color: var(--ant-btn-color);
  background: var(--ant-btn-background);
  border-color: var(--ant-btn-border-color);
  border-width: 1px;
  border-style: solid;
}

.ant-btn-solid {
  --ant-btn-color: #fff;
  --ant-btn-background: var(--ant-color-solid);
}

.ant-btn-outlined {
  --ant-btn-color: var(--ant-color-solid);
  --ant-btn-border-color: var(--ant-color-solid);
}

/* CSS Variables. The more color you have, the more size to save. */
.ant-btn-red {
  --ant-color-solid: red;
}

.ant-btn-blue {
  --ant-color-solid: blue;
}

/* ... */
```

## 样式覆盖

在 CSS 变量下，用户侧的样式覆盖也变得更简单了。过去开发者覆盖一个样式需要对各个状态进行覆盖，同时还需要考虑优先级覆盖的情况：

```css
.ant-btn-solid.my-btn:not(:disabled) {
  background: #f00;
}

.ant-btn-solid.my-btn:not(:disabled):hover {
  background: #e00;
}

.ant-btn-solid.my-btn:not(:disabled):active {
  background: #d00;
}

.ant-btn-outlined.my-btn:not(:disabled) {
  color: #f00;
  border-color: #f00;
}

.ant-btn-outlined.my-btn:not(:disabled):hover {
  color: #e00;
  border-color: #e00;
}

.ant-btn-outlined.my-btn:not(:disabled):active {
  color: #d00;
  border-color: #d00;
}
```

而覆盖 CSS 变量则简单很多：

```css
.ant-btn-outlined.my-btn {
  --ant-color-solid: #f00;
  --ant-color-solid-hover: #e00;
  --ant-color-solid-active: #d00;
}
```

## 条件兼容

v6 为了实现语义化结构，我们对大量组件的 DOM 结构进行了调整，同时也将 v4 至 v5 迁移时的 less 变量兼容提供的对应 Component Token 进行了清理（更多的数值通过计算生成而不是让开发者手工来配置）。但是为了避免对现有用户造成影响，我们是希望尽可能的兼容。

其中一个例子就是某个 token 存在的时候，我们使用另一种样式：

```less
.sample {
  color: blue;
}

/* How to if? */
if (customVar exist) {
  .sample {
    color: red;
  }
}
```

一个想法是在组件中根据 token 的存在与否来添加一个额外的 `className`：

```jsx
const Sample = () => {
  const { token } = useToken();

  // Sad. Component token is not exist in token.
  if (token.components.sample.customVar) {
    // ...
  }
};
```

但是遗憾的是，组件的 token 在 `useToken` 中并不存在。它只有在组件的渲染 effect 中才会异步生成从而避免无用的性能浪费。因而在 CSS 中条件判断会是个更好的选择，这里就不卖关子了，使用 `@container` 便可以实现条件判断：

```css
/* Current container support css var `--custom-var` */
@container style(--custom-var) {
  /* ... */
}
```

<code src="./css-tricks/condition.tsx">条件样式</code>

需要注意的是，`@container` 的 CSS 变量查询目前 Firefox 尚未支持。所以在 v6 中，我们并不会把主要的功能放在 `@container` 上，而是作为一个兼容兜底逻辑来使用。

## @scope

如果说 CSS 中最诱人的属性是什么，那可能非 `@scope` 莫属了。v5 中，我们使用 `:where` 来实现 CSS 的命名空间，从而实现多个版本或者主题的 antd 组件的样式隔离：

```css
/* Theme 1 */
:where(.css-BamBoo) {
  .ant-btn {
    color: red;
  }
}

/* Theme 2 */
:where(.css-LIghT) {
  .ant-btn {
    color: blue;
  }
}
```

但是这对于嵌套逻辑来说，偶尔会有一些问题。比如下面的例子中，`Theme1` 对 `span` 的样式会影响 `Theme2`：

```css
/* Theme 1 */
:where(.css-BamBoo) {
  .component-a span {
    color: red;
  }
}

/* Theme 2 */
:where(.css-LIghT) {
  .component-b {
    color: blue;
  }
}
```

```tsx
<div className="component-a css-BamBoo">
  <div className="component-b css-LIghT">
    <span>Hello World</span>
  </div>
</div>
```

而 `@scope` 则可以完美的解决这个问题：

```css
@scope (.component-a) to (span) {
  /* ... */
}
```

<code src="./css-tricks/scope.tsx">影响范围</code>

但是同样的，`@scope` 目前也并不被 Firefox 支持。而如果将其应用于 v6 版本，那就会导致 Firefox 用户无法使用 antd 组件。因而我们可能会在下一个大版本中才能见到它的身影。
