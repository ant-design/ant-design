---
order: 1
title:
  zh-CN: 异步加载
  en-US: Asynchronous loading
---

## zh-CN

匹配内容列表为异步返回时。

## en-US

async

```tsx
import { Mentions } from 'antd';
import debounce from 'lodash/debounce';
import React, { useCallback, useRef, useState } from 'react';

const { Option } = Mentions;
const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<{ login: string; avatar_url: string }[]>([]);
  const ref = useRef<string>();

  const loadGithubUsers = (key: string) => {
    if (!key) {
      setUsers([]);
      return;
    }

    fetch(`https://api.github.com/search/users?q=${key}`)
      .then(res => res.json())
      .then(({ items = [] }) => {
        if (ref.current !== key) return;

        setLoading(false);
        setUsers(items.slice(0, 10));
      });
  };

  const debounceLoadGithubUsers = useCallback(debounce(loadGithubUsers, 800), []);

  const onSearch = (search: string) => {
    console.log('Search:', search);
    ref.current = search;
    setLoading(!!search);
    setUsers([]);

    debounceLoadGithubUsers(search);
  };

  return (
    <Mentions style={{ width: '100%' }} loading={loading} onSearch={onSearch}>
      {users.map(({ login, avatar_url: avatar }) => (
        <Option key={login} value={login} className="antd-demo-dynamic-option">
          <img src={avatar} alt={login} />
          <span>{login}</span>
        </Option>
      ))}
    </Mentions>
  );
};

export default App;
```

<style>
.antd-demo-dynamic-option img {
  width: 20px;
  height: 20px;
  margin-right: 8px;
}
</style>
