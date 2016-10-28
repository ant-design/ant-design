---
order: 5
title:
  zh-CN: 时间类控件
  en-US: Time-related Controls
---

## zh-CN

`antd@2.0` 之后，时间类组件的 `value` 改为 `moment` 类型，所以在提交前需要预处理。

## en-US

After `antd@2.0`, the `value` of time-related components had been changed to `moment`. So, we need to pre-process those values.

````jsx
import { Form, DatePicker, TimePicker, Row, Col, Button } from 'antd';
const FormItem = Form.Item;
const MonthPicker = DatePicker.MonthPicker;
const RangePicker = DatePicker.RangePicker;

const TimeRelatedForm = Form.create()(React.createClass({
  handleSubmit(e) {
    e.preventDefault();

    const fieldsValue = this.props.form.getFieldsValue();

    // Should format date value before submit.
    const rangeValue = fieldsValue['range-picker'];
    const values = {
      ...fieldsValue,
      'date-picker': fieldsValue['date-picker'].format('YYYY-MM-DD'),
      'month-picker': fieldsValue['month-picker'].format('YYYY-MM'),
      'range-picker': [rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')],
      'time-picker': fieldsValue['time-picker'].format('HH:mm:ss'),
    };
    console.log('Received values of form: ', values);
  },
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (
      <Form horizontal onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="DatePicker"
        >
          {getFieldDecorator('date-picker')(
            <DatePicker />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="MonthPicker"
        >
          {getFieldDecorator('month-picker')(
            <MonthPicker />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="RangePicker"
        >
          {getFieldDecorator('range-picker')(
            <RangePicker />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="TimePicker"
        >
          {getFieldDecorator('time-picker')(
            <TimePicker />
          )}
        </FormItem>
        <FormItem>
          <Row>
            <Col span={14} offset={6}>
              <Button type="primary" htmlType="submit" size="large">Submit</Button>
            </Col>
          </Row>
        </FormItem>
      </Form>
    );
  },
}));

ReactDOM.render(<TimeRelatedForm />, mountNode);
````
