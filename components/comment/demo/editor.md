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
import { Comment, Icon, Tooltip, Avatar, Form, Button, List, Input } from 'antd';
import moment from 'moment';

const CommentEditor = Comment.Editor;
const FormItem = Form.Item;
const TextArea = Input.TextArea;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

function CommentList({ comments }) {
  return (
    <List
      header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
      itemLayout="horizontal"
      dataSource={comments}
      renderItem={({ children, ...commentProps }) => (
        <Comment {...commentProps}>
          {children}
        </Comment>
      )}
    />
  )
}

class Editor extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSubmit(
          values,
          () => this.props.form.resetFields()
        );
      }
    });
  }

  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem>
          {getFieldDecorator('message', {
            rules: [{ required: true, message: 'Please input your message!' }],
          })(
            <TextArea rows={4} />
          )}
        </FormItem>
        <FormItem>
          <Button
            disabled={hasErrors(getFieldsError())}
            htmlType="submit"
            icon="message"
            loading={this.props.submitting}
            type="primary"
          >
            Add Comment
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const EditorForm = Form.create()(Editor);

class App extends React.Component {
  state = {
    comments: [],
    submitting: false,
  }

  handleSubmit = (values, cb) => {
    this.setState({
      submitting: true,
    });

    setTimeout(() => {
      this.setState({
        submitting: false,
        comments: [
          {
            author: 'Han Solo',
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            time: moment().fromNow(),
            children: values.message,
          },
          ...this.state.comments,
        ]
      })
      if (cb) cb();
    }, 1000);
  }

  render() {
    return (
      <React.Fragment>
        {this.state.comments.length > 0 && (
          <CommentList
            comments={this.state.comments}
          />
        )}
        <CommentEditor
          avatar={
            <Avatar
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              alt="Han Solo"
            />
          }
        >
          <EditorForm
            submitting={this.state.submitting}
            onSubmit={this.handleSubmit}
          />
        </CommentEditor>
      </React.Fragment>
    );
  }
}

ReactDOM.render(<App />, mountNode);
````
