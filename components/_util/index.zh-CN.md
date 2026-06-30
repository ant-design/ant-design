---
category: Components
title: Util
subtitle: 工具类
description: 辅助开发，提供一些常用的工具方法。
showImport: false
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*rRDlT7ST8DUAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*rRDlT7ST8DUAAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
group:
  title: 其他
  order: 99
---

自 `5.13.0` 版本开始提供这些方法。

## GetRef

获取组件的 `ref` 属性定义，这对于未直接暴露或者子组件的 `ref` 属性定义非常有用。

```tsx
import { Select } from 'antd';
import type { GetRef } from 'antd';

type SelectRefType = GetRef<typeof Select>; // BaseSelectRef
```

## GetProps

获取组件的 `props` 属性定义：

```tsx
import { Checkbox } from 'antd';
import type { GetProps } from 'antd';

type CheckboxGroupType = GetProps<typeof Checkbox.Group>;
```

同时也支持获取 Context 的属性定义：

```tsx
import type { GetProps } from 'antd';

interface InternalContextProps {
  name: string;
}

const Context = React.createContext<InternalContextProps>({ name: 'Ant Design' });

type ContextType = GetProps<typeof Context>; // InternalContextProps
```

### 与 `React.ComponentProps` 的区别 {#react-componentprops-diff}

`React.ComponentProps` 是 React 官方提供的通用工具类型，用于获取原生标签或 React 组件接受的 props，例如 `React.ComponentProps<'button'>` 或 `React.ComponentProps<typeof Button>`，而 `GetProps` 则是 Ant Design 提供的补充类型：它不支持原生标签名，但除了 React 组件外，还可以直接获取 `React.Context` 的 value 类型，或者透传已经拿到的 props 类型对象。

## GetProp

获取组件的单个 `props` 或者 `context` 属性定义。它已经将 `NonNullable` 进行了封装，所以不用再考虑为空的情况：

```tsx
import { Select } from 'antd';
import type { GetProp, SelectProps } from 'antd';

// 以下两种都可以生效
type SelectOptionType1 = GetProp<SelectProps, 'options'>[number];
type SelectOptionType2 = GetProp<typeof Select, 'options'>[number];
type ContextOptionType = GetProp<typeof Context, 'name'>;
```

同时，支持通过第三个参数 `Return` 获取函数属性的返回值类型：

```tsx
import type { GetProp } from 'antd';

interface Props {
  func?: (value: number) => string;
  configOrFunc?: { configA?: string } | (() => { anotherB?: string });
}

type OnChangeReturn = GetProp<Props, 'func', 'Return'>; // string
type ClassNamesReturn = GetProp<Props, 'configOrFunc', 'Return'>; // { anotherB?: string }
```
