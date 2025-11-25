---
category: Components
group: 数据展示
title: Empty
subtitle: 空状态
description: 空状态时的展示占位图。
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*ZdiZSLzEV0wAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*obM7S5lIxeMAAAAAAAAAAAAADrJ8AQ/original
---

## 何时使用 {#when-to-use}

- 当目前没有数据时，用于显式的用户提示。
- 初始化场景时的引导创建流程。

## 代码演示 {#examples}

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">基本</code>
<code src="./demo/simple.tsx">选择图片</code>
<code src="./demo/customize.tsx">自定义</code>
<code src="./demo/config-provider.tsx">全局化配置</code>
<code src="./demo/style-class.tsx" version="6.0.0">自定义语义结构的样式和类</code>
<code src="./demo/description.tsx">无描述</code>

## API

通用属性参考：[通用属性](/docs/react/common-props)

```jsx
<Empty>
  <Button>创建</Button>
</Empty>
```

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| classNames | 用于自定义组件内部各语义化结构的 class，支持对象或函数 | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), string> | - |  |
| description | 自定义描述内容 | ReactNode | - |  |
| image | 设置显示图片，为 string 时表示自定义图片地址。 | ReactNode | `Empty.PRESENTED_IMAGE_DEFAULT` |  |
| imageStyle | 图片样式 | CSSProperties | - |  |
| styles | 用于自定义组件内部各语义化结构的行内 style，支持对象或函数 | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties> | - |  |

## 内置图片

- Empty.PRESENTED_IMAGE_SIMPLE

  <div class="site-empty-buildIn-img site-empty-buildIn-simple"><div>

- Empty.PRESENTED_IMAGE_DEFAULT

  <div class="site-empty-buildIn-img site-empty-buildIn-default"></div>

<style>
  .site-empty-buildIn-img {
    background-repeat: no-repeat;
    background-size: contain;
  }
  .site-empty-buildIn-simple {
    width: 55px;
    height: 35px;
    background-image: url("https://user-images.githubusercontent.com/507615/54591679-b0ceb580-4a65-11e9-925c-ad15b4eae93d.png");
  }
  .site-empty-buildIn-default {
    width: 121px;
    height: 116px;
    background-image: url("https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png");
  }
</style>

## Semantic DOM

<code src="./demo/_semantic.tsx" simplify="true"></code>

## 主题变量（Design Token）{#design-token}

<ComponentTokenTable component="Empty"></ComponentTokenTable>
