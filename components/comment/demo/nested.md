---
order: 2
title:
  zh-CN: 嵌套评论
  en-US: Nested comments
---

## zh-CN

评论可以嵌套。

## en-US

Comments can be nested.

```tsx
import { Avatar, Comment } from 'antd';
import React from 'react';

const ExampleComment: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <Comment
    actions={[<span key="comment-nested-reply-to">Reply to</span>]}
    author={<a>Han Solo</a>}
    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
    content={
      <p>
        We supply a series of design principles, practical patterns and high quality design
        resources (Sketch and Axure).
      </p>
    }
  >
    {children}
  </Comment>
);

const App: React.FC = () => (
  <ExampleComment>
    <ExampleComment>
      <ExampleComment />
      <ExampleComment />
    </ExampleComment>
  </ExampleComment>
);

export default App;
```
