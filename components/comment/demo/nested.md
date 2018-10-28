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
import { Comment, Icon, Tooltip, Avatar } from 'antd';
import moment from 'moment';

const ExampleComment = ({ children }) => (
  <Comment
    actions={[<span>Reply to</span>]}
    author={<a>Han Solo</a>}
    avatar={
      <Avatar
        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        alt="Han Solo"
      />
    }
    content={<p>Sagittis id consectetur purus ut faucibus pulvinar elementum integer enim.</p>}
    time={moment().fromNow()}
  >
    {children}
  </Comment>
);

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
