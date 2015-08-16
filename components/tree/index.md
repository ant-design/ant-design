# Tree

- category: Components
- chinese: 树形控件

---

## 何时使用

简单的树形菜单应用，暂不支持键盘操作。

## API

### Tree props

| 参数       | 说明                                      | 类型       | 默认值 |
|-----------|------------------------------------------|------------|--------|
|checkable | 是否支持选中 | bool/React Node     | false    |
|defaultExpandAll | 设置展开所有树节点 | bool | false |
|defaultExpandedKeys | 展开指定的树节点 | String[] | false |
|defaultCheckedKeys | 默认选中的树节点 | String[] | [] |
|onCheck | 点击树节点触发 | function(e:{checked:bool,node,checkedKeys}) | - |

### TreeNode props

| 参数       | 说明                                      | 类型       | 默认值 |
|-----------|------------------------------------------|------------|--------|
|disabled | 禁掉响应 | bool | false |
|title | 标题 | String | '---' |
|key | 被树的selectedKeys或defaultSelectedKeys所用 | String | 内部计算出的节点位置 |
