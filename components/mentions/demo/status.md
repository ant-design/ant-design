---
order: 8
title:
  zh-CN: 自定义状态
  en-US: Status
---

## zh-CN

使用 `status` 为 Mentions 添加状态。可选 `error` 或者 `warning`。

## en-US

Add status to Mentions with `status`, which could be `error` or `warning`。

```jsx
import { Mentions, Space } from 'antd';

const { Option } = Mentions;

function onChange(value) {
  console.log('Change:', value);
}

function onSelect(option) {
  console.log('select', option);
}

const MentionsStatuses = () => {
  const options = (
    <>
      <Option value="afc163">afc163</Option>
      <Option value="zombieJ">zombieJ</Option>
      <Option value="yesmeck">yesmeck</Option>
    </>
  );

  return (
    <Space direction="vertical">
      <Mentions onChange={onChange} onSelect={onSelect} defaultValue="@afc163" status="error">
        {options}
      </Mentions>
      <Mentions onChange={onChange} onSelect={onSelect} defaultValue="@afc163" status="warning">
        {options}
      </Mentions>
    </Space>
  );
};

export default () => <MentionsStatuses />;
```
