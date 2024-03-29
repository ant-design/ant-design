---
title: Type Util
date: 2024-01-11
author: zombieJ
---

The definition of TypeScript is very powerful, it can solve many problems, help developers find type errors in advance to avoid painful debugging at runtime. In antd, we also export the basic definitions of components:

```tsx
import React from 'react';
import { Table, type TableColumnsType } from 'antd';

const columns: TableColumnsType = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
];

export default () => <Table columns={columns} />;
```

These definitions meet most scenarios, but sometimes developers want to get more refined type definitions, which antd may not export. In the past, we recommended developers to extend them by themselves through TypeScript's type gymnastics to meet their needs:

```tsx
import type { SelectProps } from 'antd';

type SelectOption<T> = NonNullable<SelectProps<T>['options']>[number];
```

It's not a difficult task for developer who are familiar with TypeScript. But for TypeScript beginners, this may be a difficult problem. Therefore, we have launched a type tool library to help developers simplify the process of extracting types.

### Type Util

We now provide 3 additional utility types in antd:

- `GetProps<ComponentType>`
- `GetProp<ComponentTypeOrComponentPropsType, PropName>`
- `GetRef<ComponentType>`

Previous two are used to help developers extract the props type of the component, and the last one is used to extract the ref type of the component. We can understand the usage of these types through the following examples:

#### Get props definition by GetProps

Some sub-component definition may not be exported in antd. You can get it directly through `GetProps`:

```tsx
import type { Checkbox, GetProps } from 'antd';

type CheckboxGroupType = GetProps<typeof Checkbox.Group>;
```

#### Get property type by GetProp

For the property type of the component, we can get it through `GetProp`. It has been encapsulated with `NonNullable`. So there is no need to consider the null case:

```tsx
import type { GetProp, Select, SelectProps } from 'antd';

// Both of this can work
type SelectOptionType1 = GetProp<SelectProps, 'options'>[number];
type SelectOptionType2 = GetProp<typeof Select, 'options'>[number];
```

#### Get ref definition by GetRef

Through `GetRef`, you don't need to remember what the ref type of the component is, HTMLElement or some special definition. Just use it:

```tsx
import React, { forwardRef } from 'react';
import type { GetRef, Select } from 'antd';

type SelectRefType = GetRef<typeof Select>; // BaseSelectRef

const Div = forwardRef<HTMLDivElement>((_, ref) => <div ref={ref} />);
type DomRefType = GetRef<typeof Div>; // HTMLDivElement
```

### The End

Here is the type util we provided, hope it can help you. If you have better ideas, please feel free to raise an issue or PR on GitHub.
