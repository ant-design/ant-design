---
order: 3
title:
  zh-CN: 回复框
  en-US: Reply Editor
---

## zh-CN

评论编辑器组件提供了相同样式的封装以支持自定义评论编辑器。

## en-US

Comment can be used as an editor, so the user can customize the contents of the component.

```jsx
import { Comment, Avatar, Form, Button, List, Input } from 'antd';
import moment from 'moment';

const { TextArea } = Input;

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
    itemLayout="horizontal"
    renderItem={props => <Comment {...props} />}
  />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        Add Comment
      </Button>
    </Form.Item>
  </>
);

export default () => {
  const [state, setState] = React.useState({
    comments: [],
    submitting: false,
    value: '',
  });

  const handleSubmit = () => {
    if (!state.value) {
      return;
    }

    setState({
      ...state,
      submitting: true,
    });

    setTimeout(() => {
      setState({
        submitting: false,
        value: '',
        comments: [
          ...state.comments,
          {
            author: 'Han Solo',
            avatar: 'https://joeschmoe.io/api/v1/random',
            content: <p>{state.value}</p>,
            datetime: moment().fromNow(),
          },
        ],
      });
    }, 1000);
  };

  const handleChange = e => {
    setState({
      ...state,
      value: e.target.value,
    });
  };

  return (
    <>
      {state.comments.length > 0 && <CommentList comments={state.comments} />}
      <Comment
        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
        content={
          <Editor
            onChange={handleChange}
            onSubmit={handleSubmit}
            submitting={state.submitting}
            value={state.value}
          />
        }
      />
    </>
  );
};
```
