---
order: 3
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

const NestedComment = Comment.Nested;

const ExampleComment = () => (
  <Comment
    author={<a>Han Solo</a>}
    avatar={
      <Avatar
        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        alt="Han Solo"
      />
    }
    time={moment().fromNow()}
  >
    <p>Sagittis id consectetur purus ut faucibus pulvinar elementum integer enim. Pellentesque massa placerat duis ultricies lacus sed turpis. Tempus urna et pharetra pharetra massa massa.</p>
  </Comment>
);

ReactDOM.render(
  <React.Fragment>
    <ExampleComment />
    <NestedComment>
      <ExampleComment />
      <ExampleComment />
    </NestedComment>
  </React.Fragment>,
  mountNode
);
````
