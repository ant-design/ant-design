# Tree Component

**Purpose**: Tree structure display for hierarchical data.

## When to Use

- Display hierarchical data
- File/folder structures
- Category trees

## Basic Usage

```typescript
import { Tree } from 'antd';

<Tree
  treeData={treeData}
  onSelect={onSelect}
  onCheck={onCheck}
/>
```

## Common Props

| Property           | Description           | Type                         | Default |
| ------------------ | --------------------- | ---------------------------- | ------- |
| `treeData`         | Tree data             | TreeNode[]                   | -       |
| `checkable`        | Show checkbox         | boolean                      | false   |
| `defaultExpandAll` | Expand all by default | boolean                      | false   |
| `onSelect`         | Select handler        | (selectedKeys, info) => void | -       |
| `onCheck`          | Check handler         | (checkedKeys, info) => void  | -       |

## Best Practices

1. **Hierarchical data** - Use for hierarchical data structures
2. **Expand control** - Control expansion for large trees
3. **Selection** - Use checkable for multiple selection
