# TreeSelect

- category: Components
- chinese: 树选择控件
- type: 表单

---

## 何时使用

当需要从树控件中灵活地筛选数据时

## API

### Tree props

| 参数       | 说明                                      | 类型       | 默认值 |
|-----------|------------------------------------------|------------|--------|
|multiple | 是否支持多选 | bool | false |
|[select-props](http://ant.design/components/select/#select-props) | the same as select props | ||
|treeProps | 和tree props相同（除了onSelect、onCheck） | | [tree-props](http://ant.design/components/tree/#tree-props) |

### TreeNode props

| 参数       | 说明                                      | 类型       | 默认值 |
|-----------|------------------------------------------|------------|--------|
|value | default as optionFilterProp | String | 'value' |
|[treenode-props](http://ant.design/components/tree/#treenode-props) |和 treeNode props 相同|||
