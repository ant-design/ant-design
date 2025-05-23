---
title: CSS in v6
date: 2025-05-23
author: zombieJ
---

During the development of Ant Design v6, since there is no longer any need to consider IE compatibility, we modified some components to use CSS variables. This resulted in a smaller CSS footprint and better performance. Today, let's talk about some aspects of CSS variables.

## Variants

In v5, some components supported the `variant` property to implement different styles, with the Button component being a typical example:

![Variant Button](https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*ApyYQpXQQfgAAAAAAAAAAAAADgCCAQ/original)

(Combined with `color` to achieve different button combinations)

In v5, the combination of Button variants and color would create a repetitive set of combinational styles:

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

After converting to CSS variables, the logic shifts from directly defining styles to managing the color palette. Thus, after defining a basic set of colors, you can effortlessly generate styles via variables:

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

## Style Overrides

With CSS variables, overriding styles on the user side becomes much simpler. In the past, developers had to override styles for each state and consider specificity:

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

Overriding CSS variables, however, is much simpler:

```css
.ant-btn-outlined.my-btn {
  --ant-color-solid: #f00;
  --ant-color-solid-hover: #e00;
  --ant-color-solid-active: #d00;
}
```

## Conditional Compatibility

In v6, to achieve a more semantic structure, we adjusted the DOM of many components and also cleaned up the compatible Component Tokens provided during the v4 to v5 Less migration (more values are computed rather than manually configured by developers). However, to avoid affecting existing users, we aimed for maximum compatibility.

One example is that when a certain token exists, we use an alternative style:

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

One idea was to add an extra `className` to the component based on the existence of the token:

```jsx
const Sample = () => {
  const { token } = useToken();

  // Sad. Component token is not exist in token.
  if (token.components.sample.customVar) {
    // ...
  }
};
```

Unfortunately, the component token is not available in `useToken`. It is only generated asynchronously during the component's rendering effect to avoid unnecessary performance overhead. Therefore, using conditional logic in CSS is a better option; here, we use `@container` to implement conditional logic:

```css
/* Current container support css var `--custom-var` */
@container style(--custom-var) {
  /* ... */
}
```

<code src="./css-tricks/condition.tsx">Conditional Styles</code>

It is important to note that the CSS variable query in `@container` is not yet supported by Firefox. Therefore, in v6, we do not rely on `@container` as the primary functionality, but rather as a fallback compatibility mechanism.

## @scope

If there is one of the most enticing properties in CSS, it would be `@scope`. In v5, we used `:where` to implement CSS namespaces, isolating styles for different versions or themes of antd components:

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

However, this approach can sometimes cause issues with nested logic. For example, in the following case, styles for `span` under `Theme1` affect `Theme2`:

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

Whereas `@scope` can perfectly solve this problem:

```css
@scope (.component-a) to (span) {
  /* ... */
}
```

<code src="./css-tricks/scope.tsx">Scope Impact</code>

However, similarly, `@scope` is not yet supported by Firefox. Applying it in v6 would result in Firefox users being unable to use antd components. Hence, you may only see it in the next major version.
