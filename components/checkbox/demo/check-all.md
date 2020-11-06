---
order: 4
title:
  zh-CN: 全选
  en-US: Check all
---

## zh-CN

在实现全选效果时，你可能会用到 `indeterminate` 属性。

## en-US

The `indeterminate` property can help you to achieve a 'check all' effect.

```jsx
import { Checkbox } from 'antd';

const CheckboxGroup = Checkbox.Group;

const plainOptions = ['Apple', 'Pear', 'Orange'];
const defaultCheckedList = ['Apple', 'Orange'];

const App = () => {
  const [checkedList, setCheckedList] = React.useState(defaultCheckedList);
  const [indeterminate, setIndeterminate] = React.useState(true);
  const [checkAll, setCheckAll] = React.useState(false);

  const onChange = list => {
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < plainOptions.length);
    setCheckAll(list.length === plainOptions.length);
  };

  const onCheckAllChange = e => {
    setCheckedList(e.target.checked ? plainOptions : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  return (
    <>
      <div className="site-checkbox-all-wrapper">
        <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
          Check all
        </Checkbox>
      </div>
      <br />
      <CheckboxGroup options={plainOptions} value={checkedList} onChange={onChange} />
    </>
  );
};

ReactDOM.render(<App />, mountNode);
```

```css
.site-checkbox-all-wrapper {
  border-bottom: 1px solid #e9e9e9;
}
```

<style>
[data-theme="dark"] .site-checkbox-all-wrapper {
  border-bottom: 1px solid #303030;
}
</style>
