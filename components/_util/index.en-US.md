---
category: Components
title: Util
description: Utilities are used to assist development and provide some common utility methods.
showImport: false
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*rRDlT7ST8DUAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*rRDlT7ST8DUAAAAAAAAAAAAADrJ8AQ/original
tag: 5.13.0
demo:
  cols: 2
group:
  title: Other
  order: 99
---

Available since `5.13.0`.

## GetRef

Get the `ref` property definition of the component, which is very useful for components that are not directly exposed or child components.

```tsx
import { Select } from 'antd';
import type { GetRef } from 'antd';

type SelectRefType = GetRef<typeof Select>; // BaseSelectRef
```

## GetProps

Get the `props` property definition of the component:

```tsx
import { Checkbox } from 'antd';
import type { GetProps } from 'antd';

type CheckboxGroupType = GetProps<typeof Checkbox.Group>;
```

## GetProp

Get the single `props` property definition of the component. It has encapsulated `NonNullable`, so you don't have to worry about it being empty:

```tsx
import { Select } from 'antd';
import type { GetProp, SelectProps } from 'antd';

// Both of these can work
type SelectOptionType1 = GetProp<SelectProps, 'options'>[number];
type SelectOptionType2 = GetProp<typeof Select, 'options'>[number];
```
