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
    author: 'Han Solo',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    time: moment().subtract(1, 'days').fromNow(),
    tooltipTime: moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss'),
      actions: [
      <span>Reply to</span>
    ],
    children: (
      <p>Nisl nisi scelerisque eu ultrices vitae auctor eu augue. Nulla at volutpat diam ut venenatis tellus in metus vulputate.</p>
    )
  },
  {
    author: 'Stormtrooper',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    time: moment().subtract(2, 'days').fromNow(),
    tooltipTime: moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss'),
    actions: [
      <span>Reply to</span>
    ],
    children: (
      <p>Sed turpis tincidunt id aliquet risus feugiat in ante metus. Faucibus nisl tincidunt eget nullam non.</p>
    )
  },
];

ReactDOM.render(
  <List
    className="comment-list"
    header={`${data.length} replies`}
    itemLayout="horizontal"
    dataSource={data}
    renderItem={item => (
      <List.Item>
        <Comment
          actions={item.actions}
          author={item.author}
          avatar={item.avatar}
          time={item.time}
          tooltipTime={item.tooltipTime}
        >
          {item.children}
        </Comment>
      </List.Item>
    )}
  />,
  mountNode);
````

<style>
  .comment-list .ant-card-head {
    padding: 0;
    margin-bottom: 0;
  }
  .comment-list.ant-list .ant-list-item {
    padding: 0;
    border-bottom: 0;
  }
  .comment-list.ant-list .ant-list-item .ant-list-item-content {
    display: block;
  }
</style>

