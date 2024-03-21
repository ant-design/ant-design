---
category: Components
title: Util
subtitle: 工具类
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*rRDlT7ST8DUAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*rRDlT7ST8DUAAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
group:
  title: 其他
  order: 99
---

工具类用于辅助开发，提供一些常用的工具方法。

## GetRef

获取组件的 `ref` 属性定义，这对于未直接暴露或者子组件的 `ref` 属性定义非常有用。

```tsx
import type { GetRef, Select } from 'antd';

type SelectRefType = GetRef<typeof Select>; // BaseSelectRef
```

## GetProps

获取组件的 `props` 属性定义：

```tsx
import type { Checkbox, GetProps } from 'antd';

type CheckboxGroupType = GetProps<typeof Checkbox.Group>;
```

## GetProp

获取组件的单个 `props` 属性定义。它已经将 `NonNullable` 进行了封装，所以不用在考虑为空的情况：

```tsx
import type { GetProp, Select, SelectProps } from 'antd';

// 以下两种都可以生效
type SelectOptionType1 = GetProp<SelectProps, 'options'>[number];
type SelectOptionType2 = GetProp<typeof Select, 'options'>[number];
```
