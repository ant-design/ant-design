---
group:
  title: Advanced
order: 3
title: CSS Variables
tag: New
---

Since `5.12.0`, Ant Design 5.x enabled CSS variables again. Unlike 4.x, this time we have integrated the capabilities of CSS-in-JS, and all Design Tokens have been included in the management scope of CSS variables.

> Currently, the CSS variable mode has been globally enabled on the official website.

## When to Use

CSS variable mode brings two important improvements to Ant Design's styling capabilities:

1. The styles of the same component under different themes can be shared, reducing the total size of the styles
2. When switching themes, there is no need to re-serialize the styles, which improves the performance of theme switching

Therefore, if your application depends on Ant Design's theme capabilities, we strongly recommend that you enable the CSS variable mode.

## Quick Start

To enable CSS variable mode, use the `cssVar` configuration in the `theme` property of ConfigProvider. This configuration will be inherited, so if you want to enable CSS variable mode globally, you only need to configure it in the root of your application.

<!-- prettier-ignore -->
:::warning
CSS variable mode requires a unique key for each theme to ensure style isolation. In React 18, we use `useId` to generate unique keys by default, so you don't have to worry about this issue in React 18. But in React 17 or 16, you need to manually set a unique key for each theme, otherwise the themes will be mixed up.
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

After enabling it, you can see that some specific values in the antd component styles have been replaced with CSS variables:

![image](https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*p5NrRJmUNHgAAAAAAAAAAAAADrJ8AQ/original)

## Advanced

### Disable Hash

Hash is one of the features since Ant Design 5.0. Its function is to calculate a unique hash value for each theme, and use it in the class of the component to isolate the theme style.

However, after enabling CSS variables, the component styles of the same antd version will not change with the token —— because we use CSS variables to fill in the dynamic parts of the styles. So if there is only one version of antd in your application, you can choose to disable hash to further reduce the total size of the styles:

```tsx
<ConfigProvider theme={{ cssVar: true, hashed: false }}>
  <App />
</ConfigProvider>
```

By the way, we strongly recommend using `extractStyle` to extract static styles, which will bring a certain amount of performance improvement to the application.

### Customize Theme

With CSS variable mode, the method of modifying the theme is the same as before, refer to [Customize Theme](/docs/react/customize-theme).

## API

`cssVar` configuration:

| Properties | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| prefix | Prefix of CSS Variables, same as `prefixCls` of ConfigProvider by default | string | `ant` | 5.12.0 |
| key | The unique key of theme. Automatically set by `useId` in React 18, but need to be set manually in React 17 or 16 | string | `useId` in React 18 | 5.12.0 |
