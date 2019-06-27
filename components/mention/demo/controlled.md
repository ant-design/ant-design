---
order: 4
title:
  zh-CN: 配合 Form 使用
  en-US: With Form
---

## zh-CN

受控模式，例如配合 Form 使用。

## en-US

Controlled mode, for example, to work with `Form`.

```tsx
import { Mention, Form, Button } from 'antd';

const { toContentState, getMentions } = Mention;
const FormItem = Form.Item;

const App = () => {
  const [form] = Form.useForm();

  const checkMention = (rule, value, callback) => {
    const mentions = getMentions(form.getFieldValue('mention'));
    if (mentions.length < 2) {
      callback(new Error('More than one must be selected!'));
    } else {
      callback();
    }
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFinish = values => {
    console.log('Submit:', values);
  };

  return (
    <Form
      form={form}
      layout="horizontal"
      initialValues={{ mention: toContentState('@afc163') }}
      onFinish={onFinish}
    >
      <FormItem
        name="mention"
        id="control-mention"
        label="Top coders"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        rules={[{ validator: checkMention }]}
      >
        <Mention
          defaultSuggestions={['afc163', 'benjycui', 'yiminghe', 'RaoHai', '中文', 'にほんご']}
        />
      </FormItem>
      <FormItem wrapperCol={{ span: 14, offset: 6 }}>
        <Button htmlType="submit" type="primary">
          Submit
        </Button>
        &nbsp;&nbsp;&nbsp;
        <Button htmlType="button" onClick={onReset}>
          Reset
        </Button>
      </FormItem>
    </Form>
  );
};

ReactDOM.render(<App />, mountNode);
```
