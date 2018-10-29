---
order: 4
title:
  zh-CN: 基本评论
  en-US: Custom direction comment
---

## zh-CN

一个基本的评论组件，带有作者、头像、时间和操作。

## en-US

A basic comment with author, avatar, time and actions.

````jsx
import { Comment, Icon, Tooltip, Avatar } from 'antd';
import moment from 'moment';

function ExampleComment({ direction = 'left' }) {
  return (
    <Comment
      direction={direction}
      avatar={
        <Tooltip title="Han Solo">
          <Avatar
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            alt="Han Solo"
          />
        </Tooltip>
      }
      content={
        <p>Sagittis id consectetur purus ut faucibus pulvinar elementum integer enim. Pellentesque massa placerat duis ultricies lacus sed turpis. Tempus urna et pharetra pharetra massa massa.</p>
      }
    />
  )
}

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <ExampleComment />
        <ExampleComment direction="right" />
      </React.Fragment>
    );
  }
}

ReactDOM.render(<App />, mountNode);
````
