---
order: 3
title:
  zh-CN: 编辑模式
  en-US: Editor mode
---

## zh-CN

评论编辑器组件提供了相同样式的封装以支持自定义评论编辑器。

## en-US

Comment can be used as editor, user can customize the editor component.

````jsx
import { Comment, Avatar, Form, Button, List, Input } from 'antd';
import moment from 'moment';

const FormItem = Form.Item;
const TextArea = Input.TextArea;

const CommentList = ({ comments }) => {
  return (
    <List
      dataSource={comments}
      header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
      itemLayout="horizontal"
      renderItem={props => <Comment {...props} />}
    />
  );
};

const Editor = ({ onChange, onSubmit, submitting, value }) => {
  return (
    <div>
      <FormItem>
        <TextArea rows={4} onChange={onChange} value={value} />
      </FormItem>
      <FormItem>
        <Button
          disabled={submitting}
          htmlType="submit"
          loading={submitting}
          onClick={onSubmit}
          type="primary"
        >
          Add Comment
        </Button>
      </FormItem>
    </div>
  );
};

class App extends React.Component {
  state = {
    comments: [],
    submitting: false,
    value: '',
  }

  handleSubmit = () => {
    this.setState({
      submitting: true,
    });

    setTimeout(() => {
      this.setState({
        submitting: false,
        value: '',
        comments: [
          {
            author: 'Han Solo',
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            content: this.state.value,
            datetime: moment().fromNow(),
          },
          ...this.state.comments,
        ],
      });
    }, 1000);
  }

  handleChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  }

  render() {
    const { comments, submitting, value } = this.state;

    return (
      <div>
        {comments.length > 0 && <CommentList comments={comments} />}
        <Comment
          avatar={(
            <Avatar
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              alt="Han Solo"
            />
          )}
          content={(
            <Editor
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
              submitting={submitting}
              value={value}
            />
          )}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, mountNode);
````
