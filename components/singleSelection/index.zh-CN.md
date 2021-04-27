---
category: Components
type: 单选列表
title: SingleSelection
subtitle: 列表
---

单选列表。

## 何时使用

单选列表。经常用于以下情况：

- 呈现所有选项
- 某一个选项选中
- 单选列表的选择操作和其他组件数据联动

参数：

| 参数 | 说明 | 类型 | 默认值 |
| name | 单选框的说明 | string | '' |
| data | 具体的选项 | Array<string> |  |
| selectedItem | 选中条目 | string | - |
| onItemSelect | 选中某一项 | () => void | '' |

完整的data数据示例：
['CT', '门诊', '急诊']

引用单个多选框
<SingleSelection
  data={ruleNameList}
  name="规则列表"
  selectedItem={selectedRule}
  onItemSelect={onRuleSelect}
/>

const ruleNameList = ['CT', '门诊', '急诊'];
const selectedRule = 'CT';
const onRuleSelect = (item: string) => {
  dispatch({
    type: 'xxx/xxx',
    payload: {
      selectedRule: item,
    },
  });
};

具体效果，请看SingleSelection.png。希望ant-desgin组件库能集成进姜金凤开发的单选列表组件。