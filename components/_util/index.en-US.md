---
category: Components
title: Util
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*rRDlT7ST8DUAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*rRDlT7ST8DUAAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
group:
  title: Other
  order: 99
---

Utilities are used to assist development and provide some common utility methods.

## GetRef

Get the `ref` property definition of the component, which is very useful for components that are not directly exposed or child components.

```tsx
import type { GetRef, Select } from 'antd';

type SelectRefType = GetRef<typeof Select>; // BaseSelectRef
```

## GetProps

Get the `props` property definition of the component:

```tsx
import type { Checkbox, GetProps } from 'antd';

type CheckboxGroupType = GetProps<typeof Checkbox.Group>;
```

## GetProp

Get the single `props` property definition of the component. It has encapsulated `NonNullable`, so you don't have to worry about being empty:

```tsx
import type { GetProp, Select, SelectProps } from 'antd';

// Both of this can work
type SelectOptionType1 = GetProp<SelectProps, 'options'>[number];
type SelectOptionType2 = GetProp<typeof Select, 'options'>[number];
```
