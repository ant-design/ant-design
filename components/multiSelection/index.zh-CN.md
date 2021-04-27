---
category: Components
type: 多选列表
title: MultiSelection
subtitle: 列表
---

多选列表。

## 何时使用

多选列表。经常用于以下情况：

- 呈现所有选项
- 全部选中/反选所有下拉选项
- 某一个选项选中/反选
- 多个多选列表可通过数据联动

data 参数如下：

| 参数 | 说明 | 类型 | 默认值 |
| key | 多选框唯一值 | string | '' |
| checkedAll | 是否全部选中 | boolean | false |
| indeterminate | 部分选中 | boolean | false |
| items | 具体选项 | Array | [] |

items 中单个选项item的参数
| 参数 | 说明 | 类型 | 默认值 |
| key | 选项唯一值 | string | - |
| checked | 选项是否选中 | booelan | false |
| title | 选项title | string | - |

| 参数 | 说明 | 类型 | 默认值 |
| name | 多选框的说明 | string | '' |
| data | 具体的选项 | object |  |
| onSelectAll | 全部选中 | () => void | '' |
| onItemSelect | 选中某一项 | () => void | '' |


引用单个多选框
<MultiSelection
  data={deviceTypes}
  name='检查设备类型'
  onSelectAll={this.onSelectAll}
  onItemSelect={this.onItemSelect}
/>

引用多个多选框
<div style={{ display: 'inline-flex' }}>
  <MultiSelection
    data={deviceTypes}
    name='检查设备类型'
    onSelectAll={this.onSelectAll}
    onItemSelect={this.onItemSelect}
  />
  <MultiSelection
    data={deviceGroups}
    name='检查设备分组'
    onSelectAll={this.onSelectAll}
    onItemSelect={this.onItemSelect}
  />
  <MultiSelection
    data={devices}
    name='检查设备'
    onSelectAll={this.onSelectAll}
    onItemSelect={this.onItemSelect}
  />
  <MultiSelection
    data={bodyParts}
    name='检查分组'
    onSelectAll={this.onSelectAll}
    onItemSelect={this.onItemSelect}
  />
</div>

完整的data数据示例：
{
  key: 'deviceTypes',
  checkedAll: false,
  indeterminate: true,
  items: [
      {
        key: 'CT',
        checked: true,
        title: 'CT'
      },
      {
        key: 'MR',
        checked: true,
        title: 'MR'
      },
      {
        key: 'DX',
        checked: true,
        title: 'DX'
      },
      {
        key: 'CR',
        checked: false,
        title: 'CR'
      },
      {
        key: 'RF',
        checked: false,
        title: 'RF'
      },
      {
        key: 'XA',
        checked: false,
        title: 'XA'
      },
      {
        key: 'NM',
        checked: false,
        title: 'NM'
      }
  ]
}
onSelectAll = data => {
  dispatch({
    type: 'xxx/xxx',
    payload: {
      xxx: xxx,
    },
  });
};
onItemSelect = data => {
  dispatch({
    type: 'xxx/xxx',
    payload: {
      xxx: xxx,
    },
  });
};

具体效果，请看MutiSelection.png。希望ant-desgin组件库能集成进姜金凤开发的多选列表组件。