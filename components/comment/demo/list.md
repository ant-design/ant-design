---
order: 1
title:
  zh-CN: 用法用名单
  en-US: Usage with list
---

## zh-CN

基本评论使用`antd` List组件来呈现一系列注释。

## en-US

A basic comment used with `antd` List component to render a series of comments.

````jsx
import { Comment, Icon, Tooltip, List } from 'antd';
import moment from 'moment';

const data = [
  {
    actions: [<span>Reply to</span>],
    author: 'Han Solo',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    content: (
      <p>Nisl nisi scelerisque eu ultrices vitae auctor eu augue. Nulla at volutpat diam ut venenatis tellus in metus vulputate.</p>
    ),
    datetime: (
      <Tooltip title={moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss')}>
        <span>{moment().subtract(1, 'days').fromNow()}</span>
      </Tooltip>
    ),
  },
  {
    actions: [<span>Reply to</span>],
    author: 'Han Solo',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    content: (
      <p>Sed turpis tincidunt id aliquet risus feugiat in ante metus. Faucibus nisl tincidunt eget nullam non.</p>
    ),
    datetime: (
      <Tooltip title={moment().subtract(2, 'days').format('YYYY-MM-DD HH:mm:ss')}>
        <span>{moment().subtract(2, 'days').fromNow()}</span>
      </Tooltip>
    ),
  },
];

ReactDOM.render(
  <List
    className="comment-list"
    header={`${data.length} replies`}
    itemLayout="horizontal"
    dataSource={data}
    renderItem={item => (
      <Comment
        actions={item.actions}
        author={item.author}
        avatar={item.avatar}
        content={item.content}
        datetime={item.datetime}
      />
    )}
  />,
  mountNode);
````
