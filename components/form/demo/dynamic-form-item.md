---
order: 5
title:
  zh-CN: 动态增减表单项
  en-US: Dynamic Form Item
---

## zh-CN

动态增加、减少表单项。

## en-US

Add or remove form items dynamically.

````jsx
import { Form, Input, Icon, Button } from 'antd';
const FormItem = Form.Item;

let uuid = 0;
class DynamicFieldSet extends React.Component {
  componentWillMount() {
    this.props.form.setFieldsValue({
      keys: [0],
    });
  }

  remove = (k) => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  }

  add = () => {
    uuid++;
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(uuid);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
  }

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: { span: 20, offset: 4 },
    };

    const keys = getFieldValue('keys');
    const formItems = keys.map((k, index) => {
      return (
        <FormItem
          {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
          label={index === 0 ? 'Passengers' : ''}
          required={false}
          key={k}
        >
          {getFieldDecorator(`names-${k}`, {
            validateTrigger: ['onChange', 'onBlur'],
            rules: [{
              required: true,
              whitespace: true,
              message: "Please input passenger's name or delete this field.",
            }],
          })(
            <Input style={{ width: '60%', marginRight: 8 }} />
          )}
          <Icon
            className="delete-button"
            type="minus-circle-o"
            disabled={keys.length === 1}
            onClick={() => this.remove(k)}
          />
        </FormItem>
      );
    });
    return (
      <Form horizontal>
        {formItems}
        <FormItem {...formItemLayoutWithOutLabel}>
          <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
            <Icon type="plus" /> Add
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedDynamicFieldSet = Form.create()(DynamicFieldSet);
ReactDOM.render(<WrappedDynamicFieldSet />, mountNode);
````

````css
#components-form-demo-dynamic-form-item .delete-button {
  cursor: pointer;
  position: relative;
  top: 4px;
  font-size: 24px;
  color: #999;
}
#components-form-demo-dynamic-form-item .delete-button[disabled] {
  cursor: not-allowed;
}
````
