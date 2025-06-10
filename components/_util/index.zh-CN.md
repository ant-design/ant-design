---
category: Components
title: Util
subtitle: 工具类
description: 辅助开发，提供一些常用的工具方法。
showImport: false
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*rRDlT7ST8DUAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*rRDlT7ST8DUAAAAAAAAAAAAADrJ8AQ/original
tag: 5.13.0
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

## GetProp

获取组件的单个 `props` 属性定义。它已经将 `NonNullable` 进行了封装，所以不用再考虑为空的情况：

```tsx
import { Select } from 'antd';
import type { GetProp, SelectProps } from 'antd';

// 以下两种都可以生效
type SelectOptionType1 = GetProp<SelectProps, 'options'>[number];
type SelectOptionType2 = GetProp<typeof Select, 'options'>[number];
```
