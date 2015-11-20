# Tree

- category: Components
- chinese: 树形控件
- type: 展示

---

## 何时使用

文件夹、组织架构、生物分类、国家地区等等，世间万物的大多数结构都是树形结构。使用`树控件`可以完整展现其中的层级关系，并具有展开收起选择等交互功能。

## API

### Tree props

| 参数       | 说明                                      | 类型       | 默认值 |
|-----------|------------------------------------------|------------|--------|
|multiple | 是否支持多选 | bool | false |
|checkable | 是否支持选中 | bool   | false    |
|defaultExpandAll | 设置展开所有树节点 | bool | false |
|defaultExpandedKeys | 展开指定的树节点 | String[] | false |
|defaultCheckedKeys | 默认选中复选框的树节点 | String[] | [] |
|defaultSelectedKeys | 默认选中的树节点 | String[] | [] |
|onCheck | 点击树节点或复选框触发 | function(e:{checked:bool,node,checkedKeys,event}) | - |
|onSelect | 点击树节点触发 | function(e:{checked:bool,node,checkedKeys,event}) | - |
|onDataLoaded | 异步加载数据 | function(node)| - |

### TreeNode props

| 参数       | 说明                                      | 类型       | 默认值 |
|-----------|------------------------------------------|------------|--------|
|disabled | 禁掉响应 | bool | false |
|title | 标题 | String | '---' |
|key | 被树的defaultCheckedKeys/defaultSelectedKeys/defaultExpandedKeys所用 | String | 内部计算出的节点位置 |
