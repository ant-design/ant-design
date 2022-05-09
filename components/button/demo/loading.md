---
order: 4
title:
  zh-CN: 加载中状态
  en-US: Loading
---

## zh-CN

添加 `loading` 属性即可让按钮处于加载状态，最后两个按钮演示点击后进入加载状态。

## en-US

A loading indicator can be added to a button by setting the `loading` property on the `Button`.

```jsx
import React, { useEffect, useState, useRef } from 'react';
import { Button, Space } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';

export default () => {
  const [loadings, setLoadings] = useState([]);
  const [index, setIndex] = useState();
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      setTimeout(() => {
        const newLoadings = [...ref.current];
        newLoadings[index] = false;
        setLoadings(newLoadings);
        ref.current = newLoadings;
      }, 6000);
    }
  }, [index, JSON.stringify(loadings)]);

  const enterLoading = i => {
    const newLoadings = [...loadings];
    newLoadings[i] = true;
    ref.current = newLoadings;
    setIndex(i);
    setLoadings(newLoadings);
  };

  return (
    <>
      <Space style={{ width: '100%' }}>
        <Button type="primary" loading>
          Loading
        </Button>
        <Button type="primary" size="small" loading>
          Loading
        </Button>
        <Button type="primary" icon={<PoweroffOutlined />} loading />
      </Space>

      <Space style={{ width: '100%' }}>
        <Button type="primary" loading={loadings[0]} onClick={() => enterLoading(0)}>
          Click me!
        </Button>
        <Button
          type="primary"
          icon={<PoweroffOutlined />}
          loading={loadings[1]}
          onClick={() => enterLoading(1)}
        >
          Click me!
        </Button>
        <Button
          type="primary"
          icon={<PoweroffOutlined />}
          loading={loadings[2]}
          onClick={() => enterLoading(2)}
        />
      </Space>
    </>
  );
};
```
