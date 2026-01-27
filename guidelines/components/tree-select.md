# TreeSelect Component

**Purpose**: Tree selector combining Tree and Select functionality.

## When to Use

- Select from tree structure
- Hierarchical data selection
- File/folder selection

## Basic Usage

```typescript
import { TreeSelect } from 'antd';

<TreeSelect
  treeData={treeData}
  treeDefaultExpandAll
  onChange={onChange}
/>
```

## Common Props

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `treeData` | Tree data | TreeNode[] | - |
| `value` | Selected value | string \| string[] | - |
| `onChange` | Change handler | (value, label, extra) => void | - |
| `multiple` | Multiple selection | boolean | false |
| `showSearch` | Enable search | boolean | false |

## Best Practices

1. **Form integration** - Always use within Form.Item
2. **Tree structure** - Use for hierarchical data
3. **Search** - Enable search for large trees
