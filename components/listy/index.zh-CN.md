---
category: Components
group: 数据展示
title: Listy
subtitle: 虚拟列表
description: 高性能列表，对长列表进行虚拟滚动，并支持分组。
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*EYuhSpw1iSwAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*tBzwQ7raKX8AAAAAAAAAAAAADrJ8AQ/original
---

## 何时使用 {#when-to-use}

- 需要渲染长列表，又不想为每一行都付出挂载成本时 —— Listy 会进行虚拟滚动，只渲染视口内的行。
- 列表需要分组，并让分组标题吸顶时。
- 需要以命令式方式控制滚动位置（跳到某一项、某个分组或某个像素位置）时。

## 代码演示 {#examples}

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">基础用法</code>
<code src="./demo/group.tsx">分组与吸顶</code>
<code src="./demo/scroll-to.tsx">滚动控制</code>
<code src="./demo/rich.tsx">复杂内容</code>
<code src="./demo/infinite.tsx">无限加载</code>
<code src="./demo/style-class.tsx">自定义语义结构的样式和类</code>

## API

通用属性参考：[通用属性](/docs/react/common-props)

| 参数 | 说明 | 类型 | 默认值 | 版本 | [全局配置](/components/config-provider-cn#component-config) |
| --- | --- | --- | --- | --- | --- |
| items | 列表数据源 | `T[]` | `[]` | - | × |
| rowKey | 每一项的唯一键，字段名或取值函数 | `keyof T \| (item: T) => Key` | - | - | × |
| itemRender | 渲染单行 | `(item: T, index: number) => ReactNode` | - | - | × |
| height | 滚动容器高度，内容超出后滚动 | number | - | - | × |
| virtual | 是否开启虚拟滚动，仅渲染视口内的行 | boolean | true | - | × |
| sticky | 分组标题是否吸顶 | boolean | false | - | × |
| group | 分组配置，见下方 [Group](#group) | `Group<T, K>` | - | - | × |
| onScroll | 原生滚动事件回调 | `React.UIEventHandler<HTMLElement>` | - | - | × |
| classNames | 语义化结构 class | `{ root?, item?, groupHeader? }` | - | - | 6.6.0 |
| styles | 语义化结构 style | `{ root?, item?, groupHeader? }` | - | - | 6.6.0 |

### Group

| 参数  | 说明                                 | 类型                                     |
| ----- | ------------------------------------ | ---------------------------------------- |
| key   | 从数据项中取出分组键                 | `(item: T) => K`                         |
| title | 渲染分组标题，入参为分组键与该组数据 | `(groupKey: K, items: T[]) => ReactNode` |

### Ref

| 名称     | 说明                             | 类型                                |
| -------- | -------------------------------- | ----------------------------------- |
| scrollTo | 滚动到某个位置、某一项或某个分组 | `(config?: ScrollToConfig) => void` |

`ScrollToConfig` 为以下之一：

| 形态                            | 说明                                |
| ------------------------------- | ----------------------------------- |
| number                          | 滚动到某个像素位置（scrollTop）     |
| `{ top?, left? }`               | 滚动到绝对像素坐标                  |
| `{ key, align?, offset? }`      | 滚动到 `rowKey` 等于 `key` 的数据项 |
| `{ groupKey, align?, offset? }` | 滚动到某个分组标题                  |

`align` 可选 `'top' | 'bottom' | 'auto'`；`offset` 为对齐后额外的像素偏移。

## Semantic DOM

<code src="./demo/_semantic.tsx" simplify="true"></code>

## 主题变量（Design Token）

<ComponentTokenTable component="Listy"></ComponentTokenTable>
