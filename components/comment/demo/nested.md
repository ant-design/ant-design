---
order: 2
title:
  zh-CN: 嵌套评论
  en-US: Nested comment
---

## zh-CN

评论可以嵌套

## en-US

Comment can be nested

````jsx
import { Comment, Avatar } from 'antd';

function ExampleComment({ children }) {
  return (
    <Comment
      actions={[<span>Reply to</span>]}
      author={<a>Han Solo</a>}
      avatar={(
        <Avatar
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          alt="Han Solo"
        />
      )}
      content={<p>We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure).</p>}
    >
      {children}
    </Comment>
  );
}

ReactDOM.render(
  <ExampleComment>
    <ExampleComment>
      <ExampleComment />
      <ExampleComment />
    </ExampleComment>
  </ExampleComment>,
  mountNode
);
````
