---
title: antd 里常用的 TypeScript 工具方法
date: 2024-01-11
author: zombieJ
---

TypeScript 的类型定义是非常强大的帮手，它可以解决很多问题，帮助开发者提前发现类型错误从而避免在运行时痛苦的调试。在 antd 中，我们也将组件的基本定义都进行了导出：

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

这些类型定义满足了大多数场景，但是有时候开发者希望获得更精细的类型定义，antd 并不一定将其导出。在过去，我们推荐开发通过 TypeScript 的类型体操进行自行拓展来满足需求：

```tsx
import type { SelectProps } from 'antd';

type SelectOption<T> = NonNullable<SelectProps<T>['options']>[number];
```

这对于 TypeScript 熟悉的朋友而言，应该不是什么难事。但是对于 TypeScript 初学者而言，这可能是一道难题。因此，我们推出了一个工具类型库，帮助开发者简化抽取类型的过程。

### 工具类型

现在在 antd 中，我们额外提供了 3 个工具类型：

- `GetProps<ComponentType>`
- `GetProp<ComponentTypeOrComponentPropsType, PropName>`
- `GetRef<ComponentType>`

前两者用户帮助开发者抽取组件的 props 类型，最后一个用于抽取组件的 ref 类型。我们可以通过下面的例子来理解这些类型的用法：

#### GetProps 获取属性定义

antd 中，对于一些组件的子组件定义不一定被导出。你可以直接通过 `GetProps` 来获取：

```tsx
import type { Checkbox, GetProps } from 'antd';

type CheckboxGroupType = GetProps<typeof Checkbox.Group>;
```

#### GetProp 获取属性类型

对于组件的属性类型，我们可以通过 `GetProp` 来获取。它已经将 `NonNullable` 进行了封装。所以不用在考虑为空的情况：

```tsx
import type { GetProp, Select, SelectProps } from 'antd';

// Both of this can work
type SelectOptionType1 = GetProp<SelectProps, 'options'>[number];
type SelectOptionType2 = GetProp<typeof Select, 'options'>[number];
```

#### GetRef 获取 ref 类型

通过 `GetRef`，你不用再记忆组件的 ref 类型到底是 HTMLElement 或者什么特别的定义。直接用就完了：

```tsx
import React, { forwardRef } from 'react';
import type { GetRef, Select } from 'antd';

type SelectRefType = GetRef<typeof Select>; // BaseSelectRef

const Div = forwardRef<HTMLDivElement>((_, ref) => <div ref={ref} />);
type DomRefType = GetRef<typeof Div>; // HTMLDivElement
```

### 最后

以上就是我们推出的工具类型，希望能够帮助到大家。如果你有更好的想法，欢迎在 GitHub 上提出 issue 或者 PR。
