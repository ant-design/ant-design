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

```jsx
import React, { useState, useRef, useMemo } from 'react';
import { Mentions } from 'antd';
import debounce from 'lodash/debounce';

const { Option } = Mentions;

export default () => {
  const [state, setState] = useState({
    loading: false,
    users: [],
  });
  const searchRef = useRef();

  const loadGithubUsers = useMemo(
    () =>
      debounce(key => {
        if (!key) {
          setState({
            ...state,
            users: [],
          });
          return;
        }

        fetch(`https://api.github.com/search/users?q=${key}`)
          .then(res => res.json())
          .then(({ items = [] }) => {
            if (searchRef.current !== key) return;
            setState({
              users: items.slice(0, 10),
              loading: false,
            });
          });
      }, 800),
    [JSON.stringify(state)],
  );

  const onSearch = search => {
    setState({ loading: !!search, users: [] });
    searchRef.current = search;
    console.log('Search:', search);
    loadGithubUsers(search);
  };

  return (
    <Mentions style={{ width: '100%' }} loading={state.loading} onSearch={onSearch}>
      {state.users.map(({ login, avatar_url: avatar }) => (
        <Option key={login} value={login} className="antd-demo-dynamic-option">
          <img src={avatar} alt={login} />
          <span>{login}</span>
        </Option>
      ))}
    </Mentions>
  );
};
```

<style>
.antd-demo-dynamic-option img {
  width: 20px;
  height: 20px;
  margin-right: 8px;
}
</style>
