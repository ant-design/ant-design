---
order: 1
title:
  zh-CN: 用法用名单
  en-US: Usage With List
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
    time: moment().subtract(1, 'days').fromNow(),
    tooltipTime: moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss'),
  },
  {
    actions: [<span>Reply to</span>],
    author: 'Stormtrooper',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    content: (
      <p>Sed turpis tincidunt id aliquet risus feugiat in ante metus. Faucibus nisl tincidunt eget nullam non.</p>
    ),
    time: moment().subtract(2, 'days').fromNow(),
    tooltipTime: moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss'),
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
        time={item.time}
        tooltipTime={item.tooltipTime}
      />
    )}
  />,
  mountNode);
````
